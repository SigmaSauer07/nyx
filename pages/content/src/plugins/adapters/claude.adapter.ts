import { BaseAdapterPlugin
} from './base.adapter';
import type { AdapterCapability, PluginContext
} from '../plugin-types';
import { createLogger
} from '@extension/shared/lib/logger';

/**
 * Claude Adapter for Claude.ai (claude.ai)
 * * This adapter provides specialized functionality for interacting with Claude's
 * chat interface, including text insertion, form submission, and file attachment capabilities.
 *
 * Built following the Nyx plugin architecture.
 * Integrates with Zustand stores and event system.
 */

const logger = createLogger('ClaudeAdapter');

export class ClaudeAdapter extends BaseAdapterPlugin { readonly name = 'ClaudeAdapter'; readonly version = '1.0.0'; readonly hostnames = ['claude.ai'
  ];
  readonly capabilities: AdapterCapability[] = [ 'text-insertion', 'form-submission', 'file-attachment', 'dom-manipulation'
  ];
 // CSS selectors for Claude's UI elements
  private readonly selectors = {
    // Primary chat input selector - Claude uses contenteditable div
    CHAT_INPUT: 'div[contenteditable="true"
    ][data-testid="composer-input"
    ], div[contenteditable="true"
    ], textarea[placeholder*="Reply"
    ], textarea[placeholder*="Talk" ]',
    // Submit button selectors
    SUBMIT_BUTTON: 'button[aria-label*="Send"
    ], button[type="submit"
    ], button:has(svg[viewBox="0 0 16 16" ])',
    // File upload related selectors
    FILE_UPLOAD_BUTTON: 'button[aria-label*="Attach"
    ], button[aria-label*="Upload"
    ], input[type="file" ]',
    FILE_INPUT: 'input[type="file" ]',
    // Main panel and container selectors
    MAIN_PANEL: 'main, .claude-chat-container,
    [data-testid="conversation" ]',
    // Drop zones for file attachment
    DROP_ZONE: '[data-testid="composer-input" ], .composer-container, .input-container',
    // File preview elements
    FILE_PREVIEW: '.file-attachment, .attachment-preview,
    [data-testid="file-preview" ]',
    // Button insertion points (for MCP popover)
    BUTTON_INSERTION_CONTAINER: 'fieldset, .composer-controls,
    [data-testid="composer-footer" ]',
    // Alternative insertion points
    FALLBACK_INSERTION: '.composer-parent, .input-area,
    [data-testid="composer" ]'
  };

  // URL patterns for navigation tracking
  private lastUrl: string = '';
  private urlCheckInterval: NodeJS.Timeout | null = null;

  // State management integration
  private mcpPopoverContainer: HTMLElement | null = null;
  private mcpPopoverRoot: any = null;
  private mutationObserver: MutationObserver | null = null;
  private popoverCheckInterval: NodeJS.Timeout | null = null;

  // Setup state tracking
  private storeEventListenersSetup: boolean = false;
  private domObserversSetup: boolean = false;
  private uiIntegrationSetup: boolean = false;

  // Instance tracking for debugging
  private static instanceCount = 0;
  private instanceId: number;

  // Styling state tracking
  private claudeStylesInjected: boolean = false;

  constructor() {
    super();
    ClaudeAdapter.instanceCount++;
    this.instanceId = ClaudeAdapter.instanceCount;
    logger.debug(`Instance #${this.instanceId
    } created. Total instances: ${ClaudeAdapter.instanceCount
    }`);
  }

  async initialize(context: PluginContext): Promise<void> { if (this.currentStatus === 'initializing' || this.currentStatus === 'active') {
      this.context?.logger.warn(`Claude adapter instance #${this.instanceId
      } already initialized or active, skipping re-initialization`);
      return;
    }

    await super.initialize(context);
    this.context.logger.debug(`Initializing Claude adapter instance #${this.instanceId
    }...`);

    this.lastUrl = window.location.href;
    this.setupUrlTracking();
    this.setupStoreEventListeners();
  }

  async activate(): Promise<void> { if (this.currentStatus === 'active') {
      this.context?.logger.warn(`Claude adapter instance #${this.instanceId
      } already active, skipping re-activation`);
      return;
    }

    await super.activate();
    this.context.logger.debug(`Activating Claude adapter instance #${this.instanceId
    }...`);

    this.injectClaudeButtonStyles();
    this.setupDOMObservers();
    this.setupUIIntegration();
 this.context.eventBus.emit('adapter:activated',
    {
      pluginName: this.name,
      timestamp: Date.now()
    });
  }

  async deactivate(): Promise<void> { if (this.currentStatus === 'inactive' || this.currentStatus === 'disabled') { this.context?.logger.warn('Claude adapter already inactive, skipping deactivation');
      return;
    }

    await super.deactivate(); this.context.logger.debug('Deactivating Claude adapter...');

    this.cleanupUIIntegration();
    this.cleanupDOMObservers();

    this.storeEventListenersSetup = false;
    this.domObserversSetup = false;
    this.uiIntegrationSetup = false;
 this.context.eventBus.emit('adapter:deactivated',
    {
      pluginName: this.name,
      timestamp: Date.now()
    });
  }

  async cleanup(): Promise<void> {
    await super.cleanup(); this.context.logger.debug('Cleaning up Claude adapter...');

    if (this.urlCheckInterval) {
      clearInterval(this.urlCheckInterval);
      this.urlCheckInterval = null;
    }

    if (this.popoverCheckInterval) {
      clearInterval(this.popoverCheckInterval);
      this.popoverCheckInterval = null;
    }

    this.cleanupUIIntegration();
    this.cleanupDOMObservers();
 const styleElement = document.getElementById('mcp-claude-button-styles');
    if (styleElement) {
      styleElement.remove();
      this.claudeStylesInjected = false;
    }

    this.storeEventListenersSetup = false;
    this.domObserversSetup = false;
    this.uiIntegrationSetup = false;
    this.claudeStylesInjected = false;
  }
  /** * Insert text into Claude's chat input
   */
  async insertText(text: string, options?: { targetElement?: HTMLElement
  }): Promise<boolean> {
    this.context.logger.debug(`Attempting to insert text into Claude chat input: ${text.substring(0,
      50)
    }${text.length > 50 ? '...' : ''
    }`);

    let targetElement: HTMLElement | null = null;

    if (options?.targetElement) {
      targetElement = options.targetElement;
    } else { const selectors = this.selectors.CHAT_INPUT.split(', ');
      for (const selector of selectors) {
        targetElement = document.querySelector(selector.trim()) as HTMLElement;
        if (targetElement) {
          this.context.logger.debug(`Found chat input using selector: ${selector.trim()
          }`);
          break;
        }
      }
    }

    if (!targetElement) { this.context.logger.error('Could not find Claude chat input element'); this.emitExecutionFailed('insertText', 'Chat input element not found');
      return false;
    }

    try {
      targetElement.focus();
 if (targetElement.tagName === 'TEXTAREA') {
        const textarea = targetElement as HTMLTextAreaElement;
        const currentText = textarea.value; const newContent = currentText ? currentText + '\n\n' + text : text;
        textarea.value = newContent;
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length; textarea.dispatchEvent(new InputEvent('input',
        { bubbles: true
        })); textarea.dispatchEvent(new Event('change',
        { bubbles: true
        }));
        this.context.logger.debug(`Text inserted into textarea successfully`); } else if (targetElement.getAttribute('contenteditable') === 'true') { const currentText = targetElement.textContent || '';
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(targetElement);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
 if (currentText && currentText.trim() !== '') { document.execCommand('insertText', false, '\n\n');
        } document.execCommand('insertText',
        false, text);
 targetElement.dispatchEvent(new InputEvent('input',
        { bubbles: true
        })); targetElement.dispatchEvent(new Event('change',
        { bubbles: true
        }));
        this.context.logger.debug(`Text inserted into contenteditable successfully`);
      }
 this.emitExecutionCompleted('insertText',
      { text
      },
      {
        success: true,
        targetElementType: targetElement.tagName,
        insertedLength: text.length
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.context.logger.error(`Error inserting text into Claude chat input: ${errorMessage
      }`); this.emitExecutionFailed('insertText', errorMessage);
      return false;
    }
  }
  /** * Submit Claude's chat input
   */
  async submitForm(options?: { formElement?: HTMLFormElement
  }): Promise<boolean> {
    this.context.logger.debug('Attempting to submit Claude chat input');

    let submitButton: HTMLButtonElement | null = null;
 const selectors = this.selectors.SUBMIT_BUTTON.split(', ');
    for (const selector of selectors) {
      submitButton = document.querySelector(selector.trim()) as HTMLButtonElement;
      if (submitButton) {
        this.context.logger.debug(`Found submit button using selector: ${selector.trim()
        }`);
        break;
      }
    }

    if (!submitButton) { this.context.logger.error('Could not find Claude submit button'); this.emitExecutionFailed('submitForm', 'Submit button not found');
      return false;
    }

    try {
      if (submitButton.disabled) { this.context.logger.warn('Claude submit button is disabled'); this.emitExecutionFailed('submitForm', 'Submit button is disabled');
        return false;
      }

      const rect = submitButton.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) { this.context.logger.warn('Claude submit button is not visible'); this.emitExecutionFailed('submitForm', 'Submit button is not visible');
        return false;
      }

      submitButton.click();
 this.emitExecutionCompleted('submitForm',
      { formElement: options?.formElement?.tagName || 'unknown'
      },
      {
        success: true, method: 'submitButton.click',
        buttonSelector: selectors.find(s => document.querySelector(s.trim()) === submitButton)
      });
 this.context.logger.debug('Claude chat input submitted successfully');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.context.logger.error(`Error submitting Claude chat input: ${errorMessage
      }`); this.emitExecutionFailed('submitForm', errorMessage);
      return false;
    }
  }
  /** * Attach file to Claude's chat input
   */
  async attachFile(file: File, options?: { inputElement?: HTMLInputElement
  }): Promise<boolean> {
    this.context.logger.debug(`Attempting to attach file: ${file.name
    } (${file.size
    } bytes, ${file.type
    })`);

    try {
      if (!file || file.size === 0) {
        this.emitExecutionFailed('attachFile', 'Invalid file: file is empty or null');
        return false;
      }

      if (!this.supportsFileUpload()) { this.emitExecutionFailed('attachFile', 'File upload not supported on current page');
        return false;
      }

      let fileInput: HTMLInputElement | null = options?.inputElement || null;

      if (!fileInput) {
        fileInput = document.querySelector(this.selectors.FILE_INPUT) as HTMLInputElement;
      }

      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files; fileInput.dispatchEvent(new Event('change',
        { bubbles: true
        }));
 this.emitExecutionCompleted('attachFile',
        {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size, method: 'fileInput'
        },
        {
          success: true, attachmentMethod: 'direct-input'
        });

        this.context.logger.debug(`File attached successfully: ${file.name
        }`);
        return true;
      }

      const dropSuccess = await this.simulateFileDrop(file);
      if (dropSuccess) { this.emitExecutionCompleted('attachFile',
        {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size, method: 'dragDrop'
        },
        {
          success: true, attachmentMethod: 'drag-drop-simulation'
        });
        return true;
      }
 this.emitExecutionFailed('attachFile', 'All file attachment methods failed');
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.context.logger.error(`Error attaching file to Claude: ${errorMessage
      }`); this.emitExecutionFailed('attachFile', errorMessage);
      return false;
    }
  }

  isSupported(): boolean | Promise<boolean> {
    const currentHost = window.location.hostname;
    const currentUrl = window.location.href;

    this.context.logger.debug(`Checking if Claude adapter supports: ${currentUrl
    }`);

    const isClaudeHost = this.hostnames.some(hostname => { if (typeof hostname === 'string') {
        return currentHost.includes(hostname);
      }
      return (hostname as RegExp).test(currentHost);
    });

    if (!isClaudeHost) {
      this.context.logger.debug(`Host ${currentHost
      } not supported by Claude adapter`);
      return false;
    }

    const supportedPatterns = [
      /^https:\/\/claude\.ai\/chat\/.*/,
      /^https:\/\/claude\.ai\/new.*/,
      /^https:\/\/claude\.ai\/project\/.*/,
      /^https:\/\/claude\.ai$/
    ];

    const isSupported = supportedPatterns.some(pattern => pattern.test(currentUrl));

    if (isSupported) {
      this.context.logger.debug(`Claude adapter supports current page: ${currentUrl
      }`);
    } else {
      this.context.logger.debug(`URL pattern not supported: ${currentUrl
      }`);
    }

    return isSupported;
  }

  supportsFileUpload(): boolean { this.context.logger.debug('Checking file upload support for Claude');
 const dropZoneSelectors = this.selectors.DROP_ZONE.split(', ');
    for (const selector of dropZoneSelectors) {
      const dropZone = document.querySelector(selector.trim());
      if (dropZone) {
        this.context.logger.debug(`Found drop zone with selector: ${selector.trim()
        }`);
        return true;
      }
    }

    const fileInput = document.querySelector(this.selectors.FILE_INPUT);
    if (fileInput) { this.context.logger.debug('Found file input element');
      return true;
    }
 this.context.logger.debug('No file upload support detected');
    return false;
  }
  // Private helper methods
  /**
   * Get Claude-specific button styles matching the interface design
   */
  private getClaudeButtonStyles(): string {
    return `
      /* Claude MCP Button Styles - Matching native design */
      .mcp-claude-button-base {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        min-width: 40px;
        height: 40px;
        padding: 8px 12px;
        margin: 0 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background: transparent;
        color: #6e6e80;
        font-family: -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.15s ease;
        overflow: hidden;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        text-align: center;
        white-space: nowrap;
    }
    /* Hover state */
      .mcp-claude-button-base:hover {
        background-color: rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.15);
        color: #2f2f38;
    }
    /* Active/pressed state */
      .mcp-claude-button-base:active {
        background-color: rgba(0, 0, 0, 0.08);
        transform: scale(0.98);
    }
    /* Focus state for accessibility */
      .mcp-claude-button-base:focus-visible {
        outline: 2px solid #2f6feb;
        outline-offset: 2px;
    }
    /* Active toggle state */
      .mcp-claude-button-base.mcp-button-active {
        background-color: rgba(47, 111, 235, 0.1);
        border-color: rgba(47, 111, 235, 0.3);
        color: #2f6feb;
    }

      .mcp-claude-button-base.mcp-button-active:hover {
        background-color: rgba(47, 111, 235, 0.15);
        border-color: rgba(47, 111, 235, 0.4);
    }
    /* Button content container */
      .mcp-claude-button-content {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        position: relative;
        z-index: 1;
    }
    /* Text styling */
      .mcp-claude-button-text {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        white-space: nowrap;
    }
    /* Icon styling */
      .mcp-claude-button-base .mcp-button-icon {
        width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 1;
        flex-shrink: 0;
    }
    /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .mcp-claude-button-base {
          border-color: rgba(255, 255, 255, 0.1);
          color: #acacbe;
      }

        .mcp-claude-button-base:hover {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ececf1;
      }

        .mcp-claude-button-base:active {
          background-color: rgba(255, 255, 255, 0.12);
      }

        .mcp-claude-button-base.mcp-button-active {
          background-color: rgba(99, 152, 255, 0.15);
          border-color: rgba(99, 152, 255, 0.3);
          color: #6398ff;
      }

        .mcp-claude-button-base.mcp-button-active:hover {
          background-color: rgba(99, 152, 255, 0.2);
          border-color: rgba(99, 152, 255, 0.4);
      }
    }
    /* High contrast mode support */
      @media (prefers-contrast: high) {
        .mcp-claude-button-base {
          border-width: 2px;
      }

        .mcp-claude-button-base:focus-visible {
          outline-width: 3px;
      }
    }
    /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .mcp-claude-button-base {
          transition: none;
      }

        .mcp-claude-button-base:active {
          transform: none;
      }
    } /* Integration with Claude's composer layout */
      fieldset .mcp-claude-button-base,
      .composer-controls .mcp-claude-button-base {
        margin: 0 4px;
    }
    /* Ensure proper stacking with Claude's UI elements */
      .mcp-claude-button-base {
        position: relative;
        z-index: 1;
    }
    /* Responsive design for mobile */
      @media (max-width: 768px) {
        .mcp-claude-button-base {
          min-width: 36px;
          height: 36px;
          padding: 6px 10px;
      }

        .mcp-claude-button-base .mcp-button-icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
      }

        .mcp-claude-button-text {
          font-size: 13px;
      }
    }
    /* Tooltip styling */
      .mcp-claude-button-base[title
    ]:hover: :after {
        content: attr(title);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        margin-bottom: 6px;
    }

      @media (prefers-color-scheme: dark) {
        .mcp-claude-button-base[title
      ]:hover: :after {
          background: rgba(255, 255, 255, 0.9);
          color: black;
      }
    }
    `;
  }
  /**
   * Inject Claude-specific button styles into the page
   */
  private injectClaudeButtonStyles(): void {
    if (this.claudeStylesInjected) { this.context.logger.debug('Claude button styles already injected, skipping');
      return;
    }

    try { const styleId = 'mcp-claude-button-styles';
      const existingStyles = document.getElementById(styleId);
      if (existingStyles) {
        existingStyles.remove();
      }
 const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = this.getClaudeButtonStyles();
      document.head.appendChild(styleElement);

      this.claudeStylesInjected = true; this.context.logger.debug('Claude button styles injected successfully');
    } catch (error) {
       this.context.logger.error('Failed to inject Claude button styles:', error);
    }
  }

  private setupUrlTracking(): void {
    if (!this.urlCheckInterval) {
      this.urlCheckInterval = setInterval(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== this.lastUrl) {
          this.context.logger.debug(`URL changed from ${this.lastUrl
          } to ${currentUrl
          }`);

          if (this.onPageChanged) {
            this.onPageChanged(currentUrl, this.lastUrl);
          }

          this.lastUrl = currentUrl;
        }
      },
      1000);
    }
  }

  private setupStoreEventListeners(): void {
    if (this.storeEventListenersSetup) {
      this.context.logger.warn(`Store event listeners already set up for instance #${this.instanceId
      }, skipping`);
      return;
    }

    this.context.logger.debug(`Setting up store event listeners for Claude adapter instance #${this.instanceId
    }`);
 this.context.eventBus.on('tool:execution-completed', (data) => { this.context.logger.debug('Tool execution completed:', data);
      this.handleToolExecutionCompleted(data);
    });
 this.context.eventBus.on('ui:sidebar-toggle', (data) => { this.context.logger.debug('Sidebar toggled:', data);
    });

    this.storeEventListenersSetup = true;
  }

  private setupDOMObservers(): void {
    if (this.domObserversSetup) {
      this.context.logger.warn(`DOM observers already set up for instance #${this.instanceId
      }, skipping`);
      return;
    }

    this.context.logger.debug(`Setting up DOM observers for Claude adapter instance #${this.instanceId
    }`);

    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldReinject = false;

      mutations.forEach((mutation) => { if (mutation.type === 'childList') { if (!document.getElementById('mcp-popover-container')) {
            shouldReinject = true;
          }
        }
      });

      if (shouldReinject) {
        const insertionPoint = this.findButtonInsertionPoint();
        if (insertionPoint) { this.context.logger.debug('MCP popover removed, attempting to re-inject');
          this.setupUIIntegration();
        }
      }
    });

    this.mutationObserver.observe(document.body,
    {
      childList: true,
      subtree: true
    });

    this.domObserversSetup = true;
  }

  private setupUIIntegration(): void {
    if (this.uiIntegrationSetup) {
      this.context.logger.debug(`UI integration already set up for instance #${this.instanceId
      }, re-injecting for page changes`);
    } else {
      this.context.logger.debug(`Setting up UI integration for Claude adapter instance #${this.instanceId
      }`);
      this.uiIntegrationSetup = true;
    }

    this.waitForPageReady().then(() => {
      this.injectMCPPopoverWithRetry();
    }).catch((error) => { this.context.logger.warn('Failed to wait for page ready:', error);
    });
  }

  private async waitForPageReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 10;

      const checkReady = () => {
        attempts++;
        const insertionPoint = this.findButtonInsertionPoint();
        if (insertionPoint) { this.context.logger.debug('Page ready for MCP popover injection');
          resolve();
        } else if (attempts >= maxAttempts) { this.context.logger.warn('Page ready check timed out - no insertion point found'); reject(new Error('No insertion point found after maximum attempts'));
        } else {
          setTimeout(checkReady,
          500);
        }
      };
      setTimeout(checkReady,
      100);
    });
  }

  private injectMCPPopoverWithRetry(maxRetries: number = 5): void {
    const attemptInjection = (attempt: number) => {
      this.context.logger.debug(`Attempting MCP popover injection (attempt ${attempt
      }/${maxRetries
      })`);
 if (document.getElementById('mcp-popover-container')) { this.context.logger.debug('MCP popover already exists');
        return;
      }

      const insertionPoint = this.findButtonInsertionPoint();
      if (insertionPoint) {
        this.injectMCPPopover(insertionPoint);
      } else if (attempt < maxRetries) {
        this.context.logger.debug(`Insertion point not found, retrying in 1 second (attempt ${attempt
        }/${maxRetries
        })`);
        setTimeout(() => attemptInjection(attempt + 1),
        1000);
      } else { this.context.logger.warn('Failed to inject MCP popover after maximum retries');
      }
    };

    attemptInjection(1);
  }

  private cleanupDOMObservers(): void { this.context.logger.debug('Cleaning up DOM observers for Claude adapter');

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  private cleanupUIIntegration(): void { this.context.logger.debug('Cleaning up UI integration for Claude adapter');

    try {
      if (this.mcpPopoverRoot) {
        try {
          this.mcpPopoverRoot.unmount(); this.context.logger.debug('React root unmounted successfully');
        } catch (unmountError) {
       this.context.logger.warn('Error unmounting React root during cleanup:', unmountError);
        }
        this.mcpPopoverRoot = null;
      }
 const popoverContainer = document.getElementById('mcp-popover-container');
      if (popoverContainer) {
        if (popoverContainer.isConnected && popoverContainer.parentNode) {
          try {
            popoverContainer.parentNode.removeChild(popoverContainer); this.context.logger.debug('MCP popover container removed successfully');
          } catch (removeError) {
       this.context.logger.warn('Error removing popover container, trying alternative method:', removeError);
            try {
              popoverContainer.remove(); this.context.logger.debug('MCP popover container removed using alternative method');
            } catch (altRemoveError) {
       this.context.logger.error('Failed to remove popover container with both methods:', altRemoveError);
            }
          }
        } else { this.context.logger.debug('MCP popover container already disconnected from DOM');
        }
      }
    } catch (error) {
       this.context.logger.error('Error during UI integration cleanup:', error);
    }

    this.mcpPopoverContainer = null;
  }

  private handleToolExecutionCompleted(data: any): void { this.context.logger.debug('Handling tool execution completion in Claude adapter:', data);

    if (!this.shouldHandleEvents()) { this.context.logger.debug('Claude adapter should not handle events, ignoring tool execution event');
      return;
    }

    const uiState = this.context.stores.ui;
    if (uiState && data.execution) { this.context.logger.debug('Tool execution handled with new architecture integration');
    }
  }

  private findButtonInsertionPoint(): { container: Element; insertAfter: Element | null
  } | null { this.context.logger.debug('Finding button insertion point for MCP popover in Claude');
 // Try to find fieldset (Claude's main composer container)
    const fieldset = document.querySelector('fieldset');
    if (fieldset) { this.context.logger.debug('Found fieldset container'); const buttons = fieldset.querySelectorAll('button');
      if (buttons.length > 0) {
        // Insert after the first button (usually attach button) this.context.logger.debug('Will insert after first button in fieldset');
        return { container: fieldset, insertAfter: buttons[
            0
          ]
        };
      }
      return { container: fieldset, insertAfter: null
      };
    }
    // Try composer controls const composerControls = document.querySelector('.composer-controls,
    [data-testid="composer-footer" ]');
    if (composerControls) { this.context.logger.debug('Found composer controls'); const buttons = composerControls.querySelectorAll('button');
      if (buttons.length > 0) {
        return { container: composerControls, insertAfter: buttons[
            0
          ]
        };
      }
      return { container: composerControls, insertAfter: null
      };
    }
    // Fallback selectors
    const fallbackSelectors = [ '[data-testid="composer"
      ]', '.composer-parent', '.input-area'
    ];

    for (const selector of fallbackSelectors) {
      const container = document.querySelector(selector);
      if (container) {
        this.context.logger.debug(`Found fallback insertion point: ${selector
        }`); const buttons = container.querySelectorAll('button');
        const lastButton = buttons.length > 0 ? buttons[buttons.length - 1
        ] : null;
        return { container, insertAfter: lastButton
        };
      }
    }
 this.context.logger.debug('Could not find suitable insertion point for MCP popover');
    return null;
  }

  private injectMCPPopover(insertionPoint: { container: Element; insertAfter: Element | null
  }): void { this.context.logger.debug('Injecting MCP popover into Claude interface');

    try { if (document.getElementById('mcp-popover-container')) { this.context.logger.debug('MCP popover already exists, skipping injection');
        return;
      }
 const reactContainer = document.createElement('div'); reactContainer.id = 'mcp-popover-container'; reactContainer.style.display = 'inline-block'; reactContainer.style.margin = '0 4px';

      const { container, insertAfter
      } = insertionPoint;
      if (insertAfter && insertAfter.parentNode === container) {
        container.insertBefore(reactContainer, insertAfter.nextSibling); this.context.logger.debug('Inserted popover container after specified element');
      } else {
        container.appendChild(reactContainer); this.context.logger.debug('Appended popover container to container element');
      }

      this.mcpPopoverContainer = reactContainer;
      this.renderMCPPopover(reactContainer);
 this.context.logger.debug('MCP popover injected and rendered successfully');
    } catch (error) {
       this.context.logger.error('Failed to inject MCP popover:', error);
    }
  }

  private renderMCPPopover(container: HTMLElement): void { this.context.logger.debug('Rendering MCP popover with new architecture integration');

    try {
      if (!container || !container.isConnected) { this.context.logger.warn('Container is not connected to DOM, skipping render');
        return;
      }
 import('react').then(React => { import('react-dom/client').then(ReactDOM => { import('../../components/mcpPopover/mcpPopover').then(({ MCPPopover
          }) => {
            if (!container || !container.isConnected) { this.context.logger.warn('Container became invalid during async import, aborting render');
              return;
            }

            const toggleStateManager = this.createToggleStateManager();

            const adapterButtonConfig = { className: 'mcp-claude-button-base', contentClassName: 'mcp-claude-button-content', textClassName: 'mcp-claude-button-text', activeClassName: 'mcp-button-active'
            };

            try {
              if (this.mcpPopoverRoot) { this.context.logger.debug('Unmounting existing React root before creating new one');
                try {
                  this.mcpPopoverRoot.unmount();
                } catch (unmountError) {
       this.context.logger.warn('Error unmounting existing React root:', unmountError);
                }
                this.mcpPopoverRoot = null;
              }

              this.mcpPopoverRoot = ReactDOM.createRoot(container);
              this.mcpPopoverRoot.render(
                React.createElement(MCPPopover,
              {
                  toggleStateManager: toggleStateManager,
                  adapterButtonConfig: adapterButtonConfig,
                  adapterName: this.name
              })
              );
 this.context.logger.debug('MCP popover rendered successfully with new architecture');
            } catch (renderError) {
       this.context.logger.error('Error during React render:', renderError);
              if (this.mcpPopoverRoot) {
                try {
                  this.mcpPopoverRoot.unmount();
                } catch (cleanupError) {
       this.context.logger.warn('Error cleaning up failed React root:', cleanupError);
                }
                this.mcpPopoverRoot = null;
              }
            }
          }).catch(error => { this.context.logger.error('Failed to import MCPPopover component:', error);
          });
        }).catch(error => { this.context.logger.error('Failed to import ReactDOM:', error);
        });
      }).catch(error => { this.context.logger.error('Failed to import React:', error);
      });
    } catch (error) {
       this.context.logger.error('Failed to render MCP popover:', error);
    }
  }

  private createToggleStateManager() {
    const context = this.context;

    const stateManager = {
      getState: () => {
        try {
          const uiState = context.stores.ui;
          const mcpEnabled = uiState?.mcpEnabled ?? false;
          const autoSubmitEnabled = uiState?.preferences?.autoSubmit ?? false;

          context.logger.debug(`Getting MCP toggle state: mcpEnabled=${mcpEnabled
          }, autoSubmit=${autoSubmitEnabled
          }`);

          return {
            mcpEnabled: mcpEnabled,
            autoInsert: autoSubmitEnabled,
            autoSubmit: autoSubmitEnabled,
            autoExecute: false
          };
        } catch (error) {
       context.logger.error('Error getting toggle state:', error);
          return {
            mcpEnabled: false,
            autoInsert: false,
            autoSubmit: false,
            autoExecute: false
          };
        }
      },

      setMCPEnabled: (enabled: boolean) => { context.logger.debug(`Setting MCP ${enabled ? 'enabled' : 'disabled'
        } - controlling sidebar visibility via MCP state`);

        try {
          if (context.stores.ui?.setMCPEnabled) { context.stores.ui.setMCPEnabled(enabled, 'mcp-popover-toggle');
            context.logger.debug(`MCP state set to: ${enabled
            } via UI store`);
          } else { context.logger.warn('UI store setMCPEnabled method not available');

            if (context.stores.ui?.setSidebarVisibility) { context.stores.ui.setSidebarVisibility(enabled, 'mcp-popover-toggle-fallback');
              context.logger.debug(`Sidebar visibility set to: ${enabled
              } via UI store fallback`);
            }
          }

          const sidebarManager = (window as any).activeSidebarManager;
          if (sidebarManager) {
            if (enabled) { context.logger.debug('Showing sidebar via activeSidebarManager');
              sidebarManager.show().catch((error: any) => { context.logger.error('Error showing sidebar:', error);
              });
            } else { context.logger.debug('Hiding sidebar via activeSidebarManager');
              sidebarManager.hide().catch((error: any) => { context.logger.error('Error hiding sidebar:', error);
              });
            }
          } else { context.logger.warn('activeSidebarManager not available on window - will rely on UI store only');
          }
 context.logger.debug(`MCP toggle completed: MCP ${enabled ? 'enabled' : 'disabled' }, sidebar ${enabled ? 'shown' : 'hidden'
          }`);
        } catch (error) {
       context.logger.error('Error in setMCPEnabled:', error);
        }

        stateManager.updateUI();
      },

      setAutoInsert: (enabled: boolean) => { context.logger.debug(`Setting Auto Insert ${enabled ? 'enabled' : 'disabled'
        }`);

        if (context.stores.ui?.updatePreferences) {
          context.stores.ui.updatePreferences({ autoSubmit: enabled
          });
        }

        stateManager.updateUI();
      },

      setAutoSubmit: (enabled: boolean) => { context.logger.debug(`Setting Auto Submit ${enabled ? 'enabled' : 'disabled'
        }`);

        if (context.stores.ui?.updatePreferences) {
          context.stores.ui.updatePreferences({ autoSubmit: enabled
          });
        }

        stateManager.updateUI();
      },

      setAutoExecute: (enabled: boolean) => { context.logger.debug(`Setting Auto Execute ${enabled ? 'enabled' : 'disabled'
        }`);
        stateManager.updateUI();
      },

      updateUI: () => { context.logger.debug('Updating MCP popover UI');
 const popoverContainer = document.getElementById('mcp-popover-container');
        if (popoverContainer) {
          const currentState = stateManager.getState(); const event = new CustomEvent('mcp:update-toggle-state',
          {
            detail: { toggleState: currentState
            }
          });
          popoverContainer.dispatchEvent(event);
        }
      }
    };

    return stateManager;
  }

  public injectMCPPopoverManually(): void { this.context.logger.debug('Manual MCP popover injection requested');
    this.injectMCPPopoverWithRetry();
  }

  public isMCPPopoverInjected(): boolean { return !!document.getElementById('mcp-popover-container');
  }

  private async simulateFileDrop(file: File): Promise<boolean> {
    try { const dropZoneSelectors = this.selectors.DROP_ZONE.split(', ');
      let dropZone: Element | null = null;

      for (const selector of dropZoneSelectors) {
        dropZone = document.querySelector(selector.trim());
        if (dropZone) break;
      }

      if (!dropZone) { this.context.logger.error('No drop zone found for file simulation');
        return false;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
 const dragEnterEvent = new DragEvent('dragenter',
      {
        bubbles: true,
        dataTransfer: dataTransfer
      }); const dragOverEvent = new DragEvent('dragover',
      {
        bubbles: true,
        dataTransfer: dataTransfer
      }); const dropEvent = new DragEvent('drop',
      {
        bubbles: true,
        dataTransfer: dataTransfer
      });

      dropZone.dispatchEvent(dragEnterEvent);
      dropZone.dispatchEvent(dragOverEvent);
      dropZone.dispatchEvent(dropEvent);

      return true;
    } catch (error) {
       this.context.logger.error('Error simulating file drop:', error);
      return false;
    }
  }

  private emitExecutionCompleted(toolName: string, parameters: any, result: any): void { this.context.eventBus.emit('tool:execution-completed',
    {
      execution: {
        id: this.generateCallId(),
        toolName,
        parameters,
        result,
        timestamp: Date.now(), status: 'success'
      }
    });
  }

  private emitExecutionFailed(toolName: string, error: string): void { this.context.eventBus.emit('tool:execution-failed',
    {
      toolName,
      error,
      callId: this.generateCallId()
    });
  }

  private generateCallId(): string {
    return `claude-${Date.now()
    }-${Math.random().toString(36).substring(2,
      11)
    }`;
  }

  private checkAndRestoreSidebar(): void { this.context.logger.debug('Checking sidebar state after page navigation');

    try {
      const activeSidebarManager = (window as any).activeSidebarManager;

      if (!activeSidebarManager) { this.context.logger.warn('No active sidebar manager found after navigation');
        return;
      }

      this.ensureMCPPopoverConnection();
    } catch (error) {
       this.context.logger.error('Error checking sidebar state after navigation:', error);
    }
  }

  private ensureMCPPopoverConnection(): void { this.context.logger.debug('Ensuring MCP popover connection after navigation');

    try {
      if (!this.isMCPPopoverInjected()) { this.context.logger.debug('MCP popover missing after navigation, re-injecting');
        this.injectMCPPopoverWithRetry(3);
      } else { this.context.logger.debug('MCP popover is still present after navigation');
      }
    } catch (error) {
       this.context.logger.error('Error ensuring MCP popover connection:', error);
    }
  }
  // Event handlers
  onPageChanged?(url: string, oldUrl?: string): void { this.context.logger.debug(`Claude page changed: from ${oldUrl || 'N/A'
    } to ${url
    }`);

    this.lastUrl = url;

    const stillSupported = this.isSupported();
    if (stillSupported) {
      this.injectClaudeButtonStyles();

      setTimeout(() => {
        this.setupUIIntegration();
      },
      1000);

      setTimeout(() => {
        this.checkAndRestoreSidebar();
      },
      1500);
    } else { this.context.logger.warn('Page no longer supported after navigation');
    }
 this.context.eventBus.emit('app:site-changed',
    {
      site: url,
      hostname: window.location.hostname
    });
  }

  onHostChanged?(newHost: string, oldHost?: string): void { this.context.logger.debug(`Claude host changed: from ${oldHost || 'N/A'
    } to ${newHost
    }`);

    const stillSupported = this.isSupported();
    if (!stillSupported) { this.context.logger.warn('Claude adapter no longer supported on this host/page'); this.context.eventBus.emit('adapter:deactivated',
      {
        pluginName: this.name,
        timestamp: Date.now()
      });
    } else {
      this.setupUIIntegration();
    }
  }

  onToolDetected?(tools: any[]): void {
    this.context.logger.debug(`Tools detected in Claude adapter:`, tools);

    tools.forEach(tool => {
      this.context.stores.tool?.addDetectedTool?.(tool);
    });
  }
}