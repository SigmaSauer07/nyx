import React from 'react';
import './Icon.css';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'white' | 'muted' | 'success' | 'error' | 'warning' | 'info';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  glow?: boolean;
  hover?: boolean;
  background?: boolean;
  bordered?: boolean;
  shadow?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  className = '',
  onClick,
  disabled = false,
  loading = false,
  spin = false,
  pulse = false,
  bounce = false,
  glow = false,
  hover = false,
  background = false,
  bordered = false,
  shadow = false,
}) => {
  const baseClass = 'alsania-icon';
  const sizeClass = `alsania-icon--${size}`;
  const colorClass = color ? `alsania-icon--${color}` : '';
  const stateClasses = [
    disabled && 'alsania-icon--disabled',
    loading && 'alsania-icon--loading',
    spin && 'alsania-icon--spin',
    pulse && 'alsania-icon--pulse',
    bounce && 'alsania-icon--bounce',
    glow && 'alsania-icon--glow',
    hover && 'alsania-icon--hover',
    background && 'alsania-icon--bg',
    bordered && 'alsania-icon--bordered',
    shadow && 'alsania-icon--shadow',
  ].filter(Boolean).join(' ');
  
  const classes = [
    baseClass,
    sizeClass,
    colorClass,
    stateClasses,
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-label={name}
    >
      <IconSvg name={name} />
    </div>
  );
};

// Icon SVG component
const IconSvg: React.FC<{ name: string }> = ({ name }) => {
  const iconMap: Record<string, React.ReactNode> = {
    // Brand icons
    'alsania-logo': (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="alsaniaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#39FF14', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2EBF0F', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d="M32 8L56 24V40L32 56L8 40V24L32 8Z" fill="url(#alsaniaGradient)" stroke="#39FF14" strokeWidth="2"/>
        <path d="M32 16L44 24V32L32 40L20 32V24L32 16Z" fill="#0A2472" stroke="#39FF14" strokeWidth="1"/>
        <circle cx="32" cy="32" r="4" fill="#39FF14"/>
      </svg>
    ),
    'alsania-symbol': (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="symbolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#39FF14', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00F6FF', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d="M32 4L60 20V44L32 60L4 44V20L32 4Z" fill="url(#symbolGradient)" stroke="#39FF14" strokeWidth="2"/>
        <path d="M32 12L48 20V32L32 40L16 32V20L32 12Z" fill="#0A2472" stroke="#39FF14" strokeWidth="1"/>
        <circle cx="32" cy="32" r="6" fill="#39FF14"/>
      </svg>
    ),
    // Web3 & Blockchain icons
    'wallet': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12V7H5C3.89543 7 3 6.10457 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12H17C15.8954 12 15 12.8954 15 14V16C15 17.1046 15.8954 18 17 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'blockchain': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="15" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 6H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'token': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
      </svg>
    ),
    'nft': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    'defi': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21L12 3L21 21H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 21H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'swap': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 16L3 12L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'stake': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'yield': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
        <path d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z" fill="currentColor"/>
        <circle cx="12" cy="16" r="2" fill="#0A2472"/>
      </svg>
    ),
    // UI Navigation icons
    'home': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'settings': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M19.4 15A1.65 1.65 0 0 0 18 14.63L16.5 12.5C16.5 12.5 16.5 12.5 16.5 12.5C16.5 12.5 16.5 12.5 16.5 12.5L18 10.37A1.65 1.65 0 0 0 19.4 9L21.54 10.37C21.54 10.37 21.54 10.37 21.54 10.37C21.54 10.37 21.54 10.37 21.54 10.37L20.14 12.5C20.14 12.5 20.14 12.5 20.14 12.5C20.14 12.5 20.14 12.5 20.14 12.5L21.54 14.63A1.65 1.65 0 0 0 19.4 15Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M4.6 9A1.65 1.65 0 0 1 6 10.37L7.5 12.5C7.5 12.5 7.5 12.5 7.5 12.5C7.5 12.5 7.5 12.5 7.5 12.5L6 14.63A1.65 1.65 0 0 1 4.6 15L2.46 13.63C2.46 13.63 2.46 13.63 2.46 13.63C2.46 13.63 2.46 13.63 2.46 13.63L3.86 11.5C3.86 11.5 3.86 11.5 3.86 11.5C3.86 11.5 3.86 11.5 3.86 11.5L2.46 9.37A1.65 1.65 0 0 1 4.6 9Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'user': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'search': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'menu': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'close': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Action icons
    'arrow-right': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'arrow-left': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'arrow-up': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'arrow-down': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'check': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'plus': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'minus': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Status icons
    'success': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'error': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'warning': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="17" r="1" fill="currentColor"/>
      </svg>
    ),
    'info': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    // Social Media icons
    'twitter': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 3A10.9 10.9 0 0 1 20.1 4.8C21.2 4.2 22.1 3.3 22.7 2.2C21.6 2.8 20.4 3.2 19.1 3.4C18.1 2.3 16.7 1.7 15.1 1.7C12.6 1.7 10.6 3.7 10.6 6.2C10.6 6.6 10.6 7 10.7 7.3C7 7.1 3.7 5.4 1.4 2.8C1 3.4 0.8 4.1 0.8 4.9C0.8 6.4 1.5 7.7 2.6 8.5C1.7 8.5 0.9 8.3 0.2 8V8.1C0.2 10.3 1.6 12.1 3.5 12.6C3.1 12.7 2.7 12.8 2.3 12.8C2 12.8 1.7 12.7 1.4 12.7C2 14.4 3.6 15.6 5.5 15.6C4 16.8 2.1 17.5 0 17.2C1.9 18.4 4.1 19.1 6.5 19.1C15.1 19.1 19.6 12.9 19.6 7.7C19.6 7.5 19.6 7.3 19.6 7.1C20.8 6.3 21.8 5.3 22.6 4.1L23 3Z" fill="currentColor"/>
      </svg>
    ),
    'discord': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" fill="currentColor"/>
      </svg>
    ),
    'github': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
      </svg>
    ),
    'telegram': (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.14-.04-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.75-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.13-.02.2z" fill="currentColor"/>
      </svg>
    ),
  };

  return iconMap[name] || null;
};