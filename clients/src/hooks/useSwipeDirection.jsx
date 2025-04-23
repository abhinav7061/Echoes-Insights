import { useState, useEffect } from 'react';

const useSwipeDirection = (ref, threshold = 50) => {
    const [direction, setDirection] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            setTouchStart({ x: touch.clientX, y: touch.clientY });
            setTouchEnd(null);
            setDirection(null);
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            setTouchEnd({ x: touch.clientX, y: touch.clientY });
        };

        const handleTouchEnd = () => {
            if (!touchStart || !touchEnd) return;

            const xDiff = touchStart.x - touchEnd.x;
            const yDiff = touchStart.y - touchEnd.y;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > threshold) {
                    setDirection('left');
                } else if (xDiff < -threshold) {
                    setDirection('right');
                }
            }
            else {
                if (yDiff > threshold) {
                    setDirection('up');
                } else if (yDiff < -threshold) {
                    setDirection('down');
                }
            }
        };

        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [ref, threshold, touchEnd, touchStart]);

    return direction;
};

export default useSwipeDirection;