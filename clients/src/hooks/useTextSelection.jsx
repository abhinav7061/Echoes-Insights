import { useEffect, useState } from 'react';

const useTextSelection = (ref) => {
    const [selection, setSelection] = useState({ text: '', x: 0, y: 0 });

    const updateSelectionCoordinates = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0).cloneRange();
            const rect = range.getBoundingClientRect();
            const selectedText = selection.toString().trim();

            if (selectedText && ref.current && ref.current.contains(range.commonAncestorContainer)) {
                setSelection({
                    text: selectedText,
                    x: rect.left + window.scrollX,
                    y: rect.top + window.scrollY,
                });
            } else {
                setSelection({ text: '', x: 0, y: 0 });
            }
        }
    };

    useEffect(() => {
        const handleMouseUp = () => {
            updateSelectionCoordinates();
        };

        const handleResize = () => {
            updateSelectionCoordinates();
        };

        document.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', handleResize);
        };
    }, [ref]);

    return selection;
};

export default useTextSelection;
