import React, { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // Define your breakpoint value

const McpPopover = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobile && <div className="overlay">Overlay Content</div>}
            {/* Other component content */}
        </div>
    );
};

export default McpPopover;