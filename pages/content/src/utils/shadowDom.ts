import { logMessage
} from './helpers';
import { createLogger
} from '@extension/shared/lib/logger';
import { detectPlatformColors
} from './platformColorDetector';

/**
 * Injects CSS into a Shadow DOM with proper error handling
 * This enhanced version ensures CSS is properly scoped and applied in the Shadow DOM
 *
 * @param shadowRoot The Shadow DOM root to inject styles into
 * @param cssPath The path to the CSS file relative to the extension root
 * @returns Promise that resolves when the CSS is injected or rejects with an error
 */ const logger = createLogger('ShadowDomUtils');

export const injectShadowDomCSS = async (shadowRoot: ShadowRoot, cssPath: string): Promise<void> => {
  if (!shadowRoot) { throw new Error('Shadow root is not available for style injection');
  }

  try {
    const cssUrl = chrome.runtime.getURL(cssPath);
    logMessage(`Fetching CSS from: ${cssUrl
    }`);

    const response = await fetch(cssUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSS: ${response.statusText
      } (URL: ${cssUrl
      })`);
    }

    let cssText = await response.text();
    if (cssText.length === 0) { throw new Error('CSS content is empty');
    }

    logMessage(`Fetched CSS content (${cssText.length
    } bytes)`);

    // Modify the CSS to better target elements within the Shadow DOM
    cssText = transformCSSForShadowDOM(cssText);
 const styleElement = document.createElement('style');
    styleElement.textContent = cssText;
    shadowRoot.appendChild(styleElement);
 logMessage('Successfully injected CSS into Shadow DOM with additional customizations');
    return Promise.resolve();
  } catch (error) {
    logMessage(`Error injecting CSS into Shadow DOM: ${error instanceof Error ? error.message : String(error)
    }`);
    throw error;
  }
};

/**
 * Transform CSS to better work within Shadow DOM
 * This function processes the CSS to ensure it targets elements within the Shadow DOM correctly
 *
 * @param css The original CSS content
 * @returns The transformed CSS content
 */
function transformCSSForShadowDOM(css: string): string {
  // Keep track of CSS processing logMessage('Transforming CSS for Shadow DOM compatibility');

  // Remove any host-targeting selectors that might cause conflicts css = css.replace(/:root/g, ':host');

  // Scope all CSS selectors to the Shadow DOM host to prevent leaking css = css.replace(/(^|\})([^{}]+)\{/gm, '$1:host $2 {');

  // Add custom Shadow DOM envelope styles (allow inheritance)
  css = `
    /* Shadow DOM Envelope Styles */
    :host {
      display: block;
      font-family: inherit;
      color: inherit;
    }
    /* Ensure all styles are properly contained */
    * {
      box-sizing: border-box;
    }
    /* Original CSS with modifications */
    ${css
    }
  `;

  return css;
  }
  /**
 * Generate custom styles specifically for the Shadow DOM
 * These styles help ensure the UI renders correctly within the Shadow DOM
 *
 * @returns CSS string with custom styles
 */
  /**
 * Apply critical styles directly to an element within the Shadow DOM
 * This can be used to fix specific styling issues on individual elements
 *
 * @param element The element to style
 * @param styles CSS styles as a string
 */
export const applyShadowDomElementStyles = (element: HTMLElement, styles: string): void => {
  if (!element) return;

  // Apply styles directly to the element element.setAttribute('style', `${element.getAttribute('style') || ''
    }; ${styles
    }`);
  logMessage(`Applied direct styles to element: ${element.tagName
    }`);
  };

/**
 * Apply dark mode styling to the Shadow DOM
 * This function applies dark mode by adding a class to the Shadow DOM host
 * and injecting CSS variables for theme colors
 *
 * @param shadowRoot The Shadow DOM root to apply dark mode to
 * @returns void
 */
export const applyDarkMode = (shadowRoot: ShadowRoot): void => {
  if (!shadowRoot) { logMessage('[applyDarkMode   ] Shadow root is not available');
    return;
    }
    // Add the dark mode class to the host element
  if (shadowRoot.host) { shadowRoot.host.classList.remove('light'); shadowRoot.host.classList.add('dark');
    }
    // Apply theme via CSS variables const styleElement = shadowRoot.querySelector('#theme-variables') as HTMLStyleElement;
  if (styleElement) {
    styleElement.textContent = generateDarkThemeVariables();
    } else { const newStyleElement = document.createElement('style'); newStyleElement.id = 'theme-variables';
    newStyleElement.textContent = generateDarkThemeVariables();
    shadowRoot.appendChild(newStyleElement);
    }
 logMessage('[applyDarkMode  ] Dark mode applied to Shadow DOM');
  };

/**
 * Apply light mode styling to the Shadow DOM
 * This function applies light mode by adding a class to the Shadow DOM host
 * and injecting CSS variables for theme colors
 *
 * @param shadowRoot The Shadow DOM root to apply light mode to
 * @returns void
 */
export const applyLightMode = (shadowRoot: ShadowRoot): void => {
  if (!shadowRoot) { logMessage('[applyLightMode   ] Shadow root is not available');
    return;
    }
    // Add the light mode class to the host element
  if (shadowRoot.host) { shadowRoot.host.classList.remove('dark'); shadowRoot.host.classList.add('light');
    }
    // Apply theme via CSS variables const styleElement = shadowRoot.querySelector('#theme-variables') as HTMLStyleElement;
  if (styleElement) {
    styleElement.textContent = generateLightThemeVariables();
    } else { const newStyleElement = document.createElement('style'); newStyleElement.id = 'theme-variables';
    newStyleElement.textContent = generateLightThemeVariables();
    shadowRoot.appendChild(newStyleElement);
    }
 logMessage('[applyLightMode  ] Light mode applied to Shadow DOM');
  };

/**
 * Generate CSS variables for dark theme
 * @returns CSS string with dark theme variables
 */
function generateDarkThemeVariables(): string {
  const platformColors = detectPlatformColors();

  // Use platform colors if dark, otherwise use defaults
  const colors = platformColors.isDark ? platformColors : { primary: '#6366f1', primaryHover: '#4f46e5', background: '#1e1e1e', surface: '#2d2d2d', surfaceSecondary: '#3a3a3a', text: '#e8eaed', textSecondary: '#9aa0a6', border: 'rgba(255, 255, 255, 0.1)', accent: '#6366f1',
    };

  return `
    :host {
      --bg-primary: ${colors.background
      };
      --bg-secondary: ${colors.surface
      };
      --bg-tertiary: ${colors.surfaceSecondary
      };
      --text-primary: ${colors.text
      };
      --text-secondary: ${colors.textSecondary
      };
      --text-tertiary: ${colors.textSecondary
      };
      --border-primary: ${colors.border
      };
      --border-secondary: ${colors.border
      };
      --hover-bg: ${colors.surface
      };
      --hover-bg-light: ${colors.surfaceSecondary
      };
      --shadow-color: rgba(0, 0, 0, 0.3);
      --accent-primary: ${colors.primary
      };
      --accent-hover: ${colors.primaryHover
      };
    }
    /* Force common dark mode styles */
    :host(.dark) .bg-white,
    :host(.dark) [class*="bg-white"
    ] {
      background-color: var(--bg-primary) !important;
    }
    
    :host(.dark) .bg-slate-50,
    :host(.dark) [class*="bg-slate-50"
    ] {
      background-color: var(--bg-primary) !important;
    }
    
    :host(.dark) .bg-slate-100,
    :host(.dark) [class*="bg-slate-100"
    ] {
      background-color: var(--bg-primary) !important;
    }
    
    :host(.dark) .bg-slate-900,
    :host(.dark) [class*="bg-slate-900"
    ] {
      background-color: var(--bg-primary) !important;
    }
    
    :host(.dark) .bg-slate-800,
    :host(.dark) [class*="bg-slate-800"
    ] {
      background-color: var(--bg-secondary) !important;
    }
    
    :host(.dark) .text-slate-900,
    :host(.dark) [class*="text-slate-900"
    ] {
      color: var(--text-primary) !important;
    }
    
    :host(.dark) .text-slate-700,
    :host(.dark) [class*="text-slate-700"
    ],
    :host(.dark) .text-slate-600,
    :host(.dark) [class*="text-slate-600"
    ] {
      color: var(--text-tertiary) !important;
    }
    
    :host(.dark) .text-slate-500,
    :host(.dark) [class*="text-slate-500"
    ],
    :host(.dark) .text-slate-400,
    :host(.dark) [class*="text-slate-400"
    ] {
      color: var(--text-secondary) !important;
    }

    :host(.dark) .text-slate-300,
    :host(.dark) [class*="text-slate-300"
    ],
    :host(.dark) .text-slate-200,
    :host(.dark) [class*="text-slate-200"
    ],
    :host(.dark) .text-slate-100,
    :host(.dark) [class*="text-slate-100"
    ] {
      color: var(--text-primary) !important;
    }
    
    :host(.dark) .border-slate-200,
    :host(.dark) [class*="border-slate-200"
    ] {
      border-color: var(--border-primary) !important;
    }
    
    :host(.dark) .border-slate-300,
    :host(.dark) [class*="border-slate-300"
    ] {
      border-color: var(--border-secondary) !important;
    }
    
    :host(.dark) .hover\\:bg-slate-100:hover,
    :host(.dark) .hover\\:bg-slate-200:hover {
      background-color: var(--hover-bg) !important;
    }
    /* Fix input area styles in dark mode */
    :host(.dark) textarea,
    :host(.dark) input[type="text"
    ] {
      background-color: var(--bg-secondary) !important;
      color: var(--text-primary) !important;
      border-color: var(--border-primary) !important;
    }
    
    :host(.dark) .input-area {
      background-color: var(--bg-secondary) !important;
      border-color: var(--border-primary) !important;
    }
    
  `;
  }
  /**
 * Generate CSS variables for light theme
 * @returns CSS string with light theme variables
 */
function generateLightThemeVariables(): string {
  const platformColors = detectPlatformColors();

  // Use platform colors if light, otherwise use defaults
  const colors = !platformColors.isDark ? platformColors : { primary: '#6366f1', primaryHover: '#4f46e5', background: '#ffffff', surface: '#f8f9fa', surfaceSecondary: '#f1f3f4', text: '#202124', textSecondary: '#5f6368', border: 'rgba(0, 0, 0, 0.1)', accent: '#6366f1',
    };

  return `
    :host {
      --bg-primary: ${colors.background
      };
      --bg-secondary: ${colors.surface
      };
      --bg-tertiary: ${colors.surfaceSecondary
      };
      --text-primary: ${colors.text
      };
      --text-secondary: ${colors.textSecondary
      };
      --text-tertiary: ${colors.textSecondary
      };
      --border-primary: ${colors.border
      };
      --border-secondary: ${colors.border
      };
      --hover-bg: ${colors.surface
      };
      --shadow-color: rgba(0, 0, 0, 0.1);
      --accent-primary: ${colors.primary
      };
      --accent-hover: ${colors.primaryHover
      };
    }
    /* Force common light mode styles */
    :host(.light) .bg-white,
    :host(.light) [class*="bg-white"
    ] {
      background-color: var(--bg-primary) !important;
    }

    :host(.light) .bg-card,
    :host(.light) [class*="bg-card"
    ] {
      background-color: var(--bg-primary) !important;
    }
    
    :host(.light) .bg-slate-50,
    :host(.light) [class*="bg-slate-50"
    ] {
      background-color: var(--bg-secondary) !important;
    }
    
    :host(.light) .bg-slate-100,
    :host(.light) [class*="bg-slate-100"
    ] {
      background-color: var(--bg-tertiary) !important;
    }

    
    :host(.light) .text-slate-900,
    :host(.light) [class*="text-slate-900"
    ] {
      color: var(--text-primary) !important;
    }

    :host(.light) .text-slate-800,
    :host(.light) [class*="text-slate-800"
    ] {
      color: var(--text-primary) !important;
    }
    
    :host(.light) .text-slate-700,
    :host(.light) [class*="text-slate-700"
    ],
    :host(.light) .text-slate-600,
    :host(.light) [class*="text-slate-600"
    ] {
      color: var(--text-secondary) !important;
    }
    
    :host(.light) .text-slate-500,
    :host(.light) [class*="text-slate-500"
    ],
    :host(.light) .text-slate-400,
    :host(.light) [class*="text-slate-400"
    ] {
      color: var(--text-tertiary) !important;
    }
    
    :host(.light) .border-slate-200,
    :host(.light) [class*="border-slate-200"
    ] {
      border-color: var(--border-primary) !important;
    }
    
    :host(.light) .border-slate-300,
    :host(.light) [class*="border-slate-300"
    ] {
      border-color: var(--border-secondary) !important;
    }
    
    :host(.light) .hover\\:bg-slate-100:hover,
    :host(.light) .hover\\:bg-slate-200:hover {
      background-color: var(--hover-bg) !important;
    }
    /* Fix input area styles in light mode */
    :host(.light) textarea,
    :host(.light) input[type="text"
    ] {
      background-color: var(--bg-primary) !important;
      color: var(--text-primary) !important;
      border-color: var(--border-secondary) !important;
    }
    
    :host(.light) .input-area {
      background-color: var(--bg-primary) !important;
      border-color: var(--border-secondary) !important;
    }
  `;
  }
  /**
 * Debug Shadow DOM styling issues
 * This is a helper function for development to diagnose styling problems
 *
 * @param shadowRoot The Shadow DOM root to debug
 */
export const debugShadowDomStyling = (shadowRoot: ShadowRoot): void => {
  try {
    if (!shadowRoot) { logger.error('Cannot debug: Shadow DOM not available');
      return;
      }
      // Log all style elements in the Shadow DOM const styles = shadowRoot.querySelectorAll('style');
    logger.debug(`Found ${styles.length
      } style elements in Shadow DOM`);

    styles.forEach((style, index) => {
      logger.debug(`Style #${index + 1
        }:`, style.textContent);
      });

    // Log computed styles for key elements const sidebarContainer = shadowRoot.querySelector('#sidebar-container');
    if (sidebarContainer) { logger.debug('[Debug    ] Sidebar container computed styles:', window.getComputedStyle(sidebarContainer));
      }
      // Check dark mode
    const host = shadowRoot.host; logger.debug('[Debug   ] Shadow host classes:', host.className); logger.debug('[Debug   ] Is dark mode active in host?', host.classList.contains('dark'));
 logMessage('[Debug   ] Shadow DOM styling debug complete - check console for details');
    } catch (error) {
       logger.error('Error debugging Shadow DOM styles:', error);
    }
  };

/**
 * New function to add to shadowDom.ts
 * @param shadowRoot The Shadow DOM root to inject styles into
 * @returns Promise that resolves when the CSS is injected or rejects with an error
 */
export const injectTailwindToShadowDom = async (shadowRoot: ShadowRoot): Promise<void> => {
  if (!shadowRoot) { throw new Error('Shadow root is not available for style injection');
    }

  try {
      // 1. Fetch the compiled Tailwind CSS const cssUrl = chrome.runtime.getURL('content/index.css');
    logMessage(`Fetching Tailwind CSS from: ${cssUrl
      }`);

    const response = await fetch(cssUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSS: ${response.statusText
        }`);
      }

    const cssText = await response.text();

    // 2. Try Constructable Stylesheets API first (Chrome/modern browsers)
    try {
      const sheet = new CSSStyleSheet();
      await sheet.replace(cssText);
      shadowRoot.adoptedStyleSheets = [sheet
        ]; logMessage('Successfully injected Tailwind CSS using Constructable Stylesheets');
      } catch (constructableError) {
        // 3. Fallback to style element for Firefox and older browsers
      logMessage(`Constructable Stylesheets not supported, falling back to style element: ${constructableError instanceof Error ? constructableError.message : String(constructableError)
        }`);
       const styleElement = document.createElement('style');
      styleElement.textContent = cssText;
      shadowRoot.appendChild(styleElement); logMessage('Successfully injected Tailwind CSS using style element fallback');
      }
      // 4. Add essential Shadow DOM reset styles const resetStyles = document.createElement('style');
    resetStyles.textContent = `
      :host {
        display: block;
      }
      *,
      :host {
        box-sizing: border-box;
      }
    `;
    shadowRoot.appendChild(resetStyles);
 logMessage('Tailwind CSS injection completed with browser compatibility handling');
    } catch (error) {
    logMessage(`Error injecting Tailwind CSS: ${error instanceof Error ? error.message : String(error)
      }`);
    throw error;
    }
  };
