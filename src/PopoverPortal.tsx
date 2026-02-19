// Import the MOBILE_BREAKPOINT constant
import { MOBILE_BREAKPOINT } from 'path-to-mobile-breakpoint';

const isMobile = () => {
    // Replace the modal detection to check the correct element
    return window.innerWidth < MOBILE_BREAKPOINT;
};

// Your existing PopoverPortal component logic continues here
