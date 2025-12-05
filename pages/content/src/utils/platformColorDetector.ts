/**
 * Platform Color Detector
 * Detects and extracts platform-specific colors from AI chat interfaces
 * to create a cohesive theme that matches the host site
 */

export interface PlatformColors {
  primary: string;
  primaryHover: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  isDark: boolean;
}

/**
 * Get brightness of a color (0-255)
 */
function getColorBrightness(color: string): number | null {
  // RGB format
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  // Hex format
  const hexMatch = color.match(/#([0-9a-f]{3,6})/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    let r, g, b;

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return (r * 299 + g * 587 + b * 114) / 1000;
    }
  }

  return null;
}

/**
 * Detect platform-specific colors based on current site
 */
export function detectPlatformColors(): PlatformColors {
  const hostname = window.location.hostname.toLowerCase();
  
  // Detect if dark mode
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  const brightness = getColorBrightness(bodyBg);
  const isDark = brightness !== null && brightness < 128;

  // ChatGPT
  if (hostname.includes('chatgpt.com') || hostname.includes('chat.openai.com')) {
    return isDark ? { primary: '#10a37f', primaryHover: '#0d8c6d', background: '#212121', surface: '#2f2f2f', surfaceSecondary: '#3a3a3a', text: '#ececf1', textSecondary: '#c5c5d2', border: 'rgba(255, 255, 255, 0.1)', accent: '#10a37f',
      isDark: true
    } : { primary: '#10a37f', primaryHover: '#0d8c6d', background: '#ffffff', surface: '#f7f7f8', surfaceSecondary: '#ececf1', text: '#202123', textSecondary: '#6e6e80', border: 'rgba(0, 0, 0, 0.1)', accent: '#10a37f',
      isDark: false
    };
  }

  // Google Gemini if (hostname.includes('gemini.google.com')) {
    return isDark ? { primary: '#8ab4f8', primaryHover: '#aecbfa', background: '#1e1e1e', surface: '#2d2d2d', surfaceSecondary: '#3a3a3a', text: '#e8eaed', textSecondary: '#9aa0a6', border: 'rgba(255, 255, 255, 0.12)', accent: '#8ab4f8',
      isDark: true
    } : { primary: '#1a73e8', primaryHover: '#1967d2', background: '#ffffff', surface: '#f8f9fa', surfaceSecondary: '#f1f3f4', text: '#202124', textSecondary: '#5f6368', border: 'rgba(0, 0, 0, 0.12)', accent: '#1a73e8',
      isDark: false
    };
  }

  // Claude if (hostname.includes('claude.ai')) {
    return isDark ? { primary: '#6398ff', primaryHover: '#7ba9f0', background: '#1e1e1e', surface: '#2a2a2a', surfaceSecondary: '#353535', text: '#ececf1', textSecondary: '#acacbe', border: 'rgba(255, 255, 255, 0.1)', accent: '#6398ff',
      isDark: true
    } : { primary: '#5436da', primaryHover: '#4a2ec4', background: '#ffffff', surface: '#f5f5f5', surfaceSecondary: '#ebebeb', text: '#2d2d2d', textSecondary: '#6e6e80', border: 'rgba(0, 0, 0, 0.1)', accent: '#5436da',
      isDark: false
    };
  }

  // Default fallback - use detected theme
  return isDark ? { primary: '#6366f1', primaryHover: '#4f46e5', background: '#1e1e1e', surface: '#2d2d2d', surfaceSecondary: '#3a3a3a', text: '#e8eaed', textSecondary: '#9aa0a6', border: 'rgba(255, 255, 255, 0.1)', accent: '#6366f1',
    isDark: true
  } : { primary: '#6366f1', primaryHover: '#4f46e5', background: '#ffffff', surface: '#f8f9fa', surfaceSecondary: '#f1f3f4', text: '#202124', textSecondary: '#5f6368', border: 'rgba(0, 0, 0, 0.1)', accent: '#6366f1',
    isDark: false
  };
}

