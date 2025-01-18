import React, { useState, useRef, useEffect } from 'react';

const Accordion = ({ text, maxLines = 2, className }) => {
    const [isExpanded, setExpanded] = useState(false);
    const [isOverflowed, setOverflowed] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                const element = contentRef.current;
                setOverflowed(element.offsetHeight < element.scrollHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [text, contentRef]);

    return (
        <>
            <div
                ref={contentRef}
                aria-expanded={isExpanded}
                aria-controls="accordion-content"
                className={className}
                style={{
                    WebkitLineClamp: isExpanded ? 'unset' : maxLines,
                    lineClamp: isExpanded ? 'unset' : maxLines,
                    overflow: isExpanded ? 'unset' : 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                }}>
                {text}
            </div>
            {isOverflowed && (
                <button
                    onClick={() => setExpanded(!isExpanded)}
                    className="hover:underline duration-300 text-neutral-500 hover:text-blue dark:hover:text-golden"
                    aria-label={isExpanded ? 'See less' : 'See more'}>
                    <h3>{isExpanded ? 'See less' : 'See more'}</h3>
                </button>
            )}
        </>
    );
};

export default Accordion;