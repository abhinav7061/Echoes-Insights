import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const HorizontalScrollSnapContainer = ({ children, scrollAmount = 250, className, containerClass, leftBtnClass, rightBtnClass }) => {
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });

    return (
        <div className={cn("relative", className)}>
            {showLeft && (
                <button
                    onClick={scrollLeft}
                    className={cn("absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white/40 to-white dark:from-neutral-950/40 to-40%  dark:to-neutral-950 py-1 px-2", leftBtnClass)}
                >
                    <ion-icon name="chevron-back-outline" className="text-xl"></ion-icon>
                </button>
            )}
            <div
                ref={scrollRef}
                className={cn('flex overflow-x-auto scrollbar-none scroll-smooth', containerClass)}
            >
                {children}
            </div>
            {showRight && (
                <button
                    onClick={scrollRight}
                    className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white/40 to-white dark:from-neutral-950/40 to-40% dark:to-neutral-950 py-1 px-2", rightBtnClass)}
                >
                    <ion-icon name="chevron-forward-outline" className="text-xl"></ion-icon>
                </button>
            )}
        </div>
    );
};

export default HorizontalScrollSnapContainer;