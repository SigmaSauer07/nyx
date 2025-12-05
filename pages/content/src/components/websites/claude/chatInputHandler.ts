/**
 * Chat Input Handler for Claude
 *
 * Utility functions for interacting with Claude's chat interface
 */ import { logMessage } from '@src/utils/helpers';
import { createLogger } from '@extension/shared/lib/logger';
const logger = createLogger('ClaudeChatInputHandler');

let lastFoundInputElement: HTMLElement | null = null;

/** * Find Claude's chat input element
 */
export const findChatInputElement = (): HTMLElement | null => {
  // Try Claude's contenteditable div first
  const claudeInput = document.querySelector('div[contenteditable="true"][data-testid="composer-input"]');

  if (claudeInput) {
    logMessage('Found Claude input element via data-testid');
    lastFoundInputElement = claudeInput as HTMLElement;
    return claudeInput as HTMLElement;
  }

  // Fallback: any contenteditable div const contentEditableDiv = document.querySelector('div[contenteditable="true"]');
  if (contentEditableDiv) {
    logMessage('Found Claude input element via contenteditable fallback');
    lastFoundInputElement = contentEditableDiv as HTMLElement;
    return contentEditableDiv as HTMLElement;
  }

  // Fallback: textarea const textarea = document.querySelector('textarea[placeholder*="Reply"], textarea[placeholder*="Talk"]');
  if (textarea) {
    logMessage('Found Claude input element via textarea');
    lastFoundInputElement = textarea as HTMLElement;
    return textarea as HTMLElement;
  }
  logMessage('Could not find Claude input element');
  return null;
};

/** * Insert text into Claude's chat input
 */
export const insertTextToChatInput = (text: string): boolean => {
  try {
    const chatInput = findChatInputElement();
    if (!chatInput) {
      logMessage('Could not find Claude input element');
      logger.error('Could not find Claude input element');
      return false;
    }
    if (chatInput.tagName === 'TEXTAREA') {
      const textarea = chatInput as HTMLTextAreaElement;
      const currentText = textarea.value;
      const formattedText = currentText ? `${currentText}\n\n${text}` : text;
      textarea.value = formattedText;
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      const inputEvent = new InputEvent('input', { bubbles: true });
      textarea.dispatchEvent(inputEvent);
      textarea.focus();
      logMessage('Appended text to textarea with preserved newlines');
      return true;
    } else if (chatInput.getAttribute('contenteditable') === 'true') {
      chatInput.focus();
      const currentText = chatInput.textContent || '';
      if (currentText && currentText.trim() !== '') {
        if (!chatInput.lastChild || chatInput.lastChild.nodeType !== Node.TEXT_NODE) {
          chatInput.appendChild(document.createTextNode(''));
        }

        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(chatInput);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('insertText', false, '\n\n');
      }
      document.execCommand('insertText', false, text);
      const inputEvent = new InputEvent('input', { bubbles: true });
      chatInput.dispatchEvent(inputEvent);
      logMessage('Appended text to contenteditable with preserved newlines using execCommand');
      return true;
    } else {
      logMessage('Using fallback method for unknown element type');
      if ('value' in chatInput) {
        const inputElement = chatInput as HTMLInputElement;
        const currentValue = inputElement.value;
        inputElement.value = currentValue ? `${currentValue}\n\n${text}` : text;
        const inputEvent = new InputEvent('input', { bubbles: true });
        inputElement.dispatchEvent(inputEvent);
        inputElement.focus();
        logMessage('Appended text to input element via value property');
        return true;
      }
      const currentText = chatInput.textContent || '';
      chatInput.textContent = currentText ? `${currentText}\n\n${text}` : text;
      const inputEvent = new InputEvent('input', { bubbles: true });
      chatInput.dispatchEvent(inputEvent);
      chatInput.focus();
      logMessage('Appended text using textContent (fallback method)');
      return true;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logMessage(`Error appending text to Claude input: ${errorMessage}`);
    logger.error('Error appending text to Claude input:', error);
    return false;
  }
};

/**
 * Insert tool result into chat input
 */
export const insertToolResultToChatInput = (result: any): boolean => {
  try {
    if (typeof result !== 'string') {
      result = JSON.stringify(result, null, 2);
      logMessage('Converted tool result to string format');
    }
    return insertTextToChatInput(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logMessage(`Error formatting tool result: ${errorMessage}`);
    logger.error('Error formatting tool result:', error);
    return false;
  }
};

/** * Attach file to Claude's chat input
 */
export const attachFileToChatInput = async (file: File): Promise<boolean> => {
  try {
    const chatInput = findChatInputElement();
    if (!chatInput) {
      logMessage('Could not find Claude input element for file attachment');
      return false;
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const dragOverEvent = new DragEvent('dragover', {
      bubbles: true,
      cancelable: true,
      dataTransfer: dataTransfer,
    });
    const dropEvent = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      dataTransfer: dataTransfer,
    });
    chatInput.addEventListener('dragover', e => e.preventDefault(), { once: true });
    chatInput.dispatchEvent(dragOverEvent);
    chatInput.dispatchEvent(dropEvent);

    logMessage(`Attached file ${file.name} to Claude input`);
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logMessage(`Error attaching file to Claude input: ${errorMessage}`);
    logger.error('Error attaching file to Claude input:', error);
    return false;
  }
};

/** * Submit Claude's chat input
 */
export const submitChatInput = (maxWaitTime = 5000): Promise<boolean> => {
  return new Promise(resolve => {
    try {
      const chatInput = lastFoundInputElement || findChatInputElement();
      if (!chatInput) {
        logMessage('Could not find chat input to submit');
        resolve(false);
        return;
      }

      const findSubmitButton = (): HTMLButtonElement | null => {
        const submitButton =
          document.querySelector('button[aria-label*="Send"]') ||
          document.querySelector('button[type="submit"]') ||
          document.querySelector('button svg[viewBox="0 0 16 16"]')?.closest('button') ||
          chatInput.closest('form')?.querySelector('button[type="submit"]') ||
          chatInput.closest('fieldset')?.querySelector('button:last-child');

        return submitButton as HTMLButtonElement | null;
      };

      const submitButton = findSubmitButton();

      if (submitButton) {
        logMessage(`Found submit button (${submitButton.getAttribute('aria-label') || 'unknown'})`);

        const tryClickingButton = () => {
          const button = findSubmitButton();
          if (!button) {
            logMessage('Submit button no longer found');
            resolve(false);
            return;
          }

          const isDisabled =
            button.disabled ||
            button.getAttribute('disabled') !== null ||
            button.getAttribute('aria-disabled') === 'true' ||
            button.classList.contains('disabled');

          if (!isDisabled) {
            logMessage('Submit button is enabled, clicking it');
            button.click();
            resolve(true);
          } else {
            logMessage('Submit button is disabled, waiting...');
          }
        };

        let elapsedTime = 0;
        const checkInterval = 200;

        const intervalId = setInterval(() => {
          elapsedTime += checkInterval;

          tryClickingButton();

          if (elapsedTime >= maxWaitTime) {
            clearInterval(intervalId);
            logMessage(`Button remained disabled for ${maxWaitTime}ms, trying alternative methods`);
            const form = chatInput.closest('form');
            if (form) {
              logMessage('Found form element, submitting it');
              const submitEvent = new SubmitEvent('submit', { bubbles: true, cancelable: true });
              form.dispatchEvent(submitEvent);
              resolve(true);
              return;
            }
            logMessage('Simulating Enter key press as fallback');

            chatInput.focus();
            const keydownEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
              cancelable: true,
              composed: true,
            });
            const keypressEvent = new KeyboardEvent('keypress', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
              cancelable: true,
              composed: true,
            });
            const keyupEvent = new KeyboardEvent('keyup', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
              cancelable: true,
              composed: true,
            });

            const keydownResult = chatInput.dispatchEvent(keydownEvent);
            const keypressResult = chatInput.dispatchEvent(keypressEvent);
            const keyupResult = chatInput.dispatchEvent(keyupEvent);

            logMessage(
              `Attempted to submit chat input via key simulation (keydown: ${keydownResult}, keypress: ${keypressResult}, keyup: ${keyupResult})`,
            );
            resolve(true);
          }
        }, checkInterval);

        tryClickingButton();

        if (submitButton && !submitButton.disabled) {
          clearInterval(intervalId);
        }
      } else {
        logMessage('No submit button found, trying alternative methods');
        const form = chatInput.closest('form');
        if (form) {
          logMessage('Found form element, submitting it');
          const submitEvent = new SubmitEvent('submit', { bubbles: true, cancelable: true });
          form.dispatchEvent(submitEvent);
          resolve(true);
          return;
        }
        logMessage('Simulating Enter key press as fallback');

        chatInput.focus();
        const keydownEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        const keypressEvent = new KeyboardEvent('keypress', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        const keyupEvent = new KeyboardEvent('keyup', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
          composed: true,
        });

        const keydownResult = chatInput.dispatchEvent(keydownEvent);
        const keypressResult = chatInput.dispatchEvent(keypressEvent);
        const keyupResult = chatInput.dispatchEvent(keyupEvent);

        logMessage(
          `Attempted to submit chat input via key simulation (keydown: ${keydownResult}, keypress: ${keypressResult}, keyup: ${keyupResult})`,
        );
        resolve(true);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logMessage(`Error submitting chat input: ${errorMessage}`);
      logger.error('Error submitting chat input:', error);
      resolve(false);
    }
  });
};
