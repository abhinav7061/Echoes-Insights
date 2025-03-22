import { useState, useEffect } from 'react';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        windowInWidth: window.innerWidth,
        windowInheight: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => setWindowSize({
            windowInWidth: window.innerWidth,
            windowInheight: window.innerHeight,
        });

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export default useWindowSize;