import React from 'react';
import { useController } from 'react-hook-form';

const TextArea = ({ name, control, showError = true, className = '', maxHeightMultiplier = 5, ...props }) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    const handleTextAreaInput = (e) => {
        const textarea = e.target;

        field.onChange(textarea.value);
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;

        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
        const maxHeight = lineHeight * maxHeightMultiplier;

        if (textarea.scrollHeight > maxHeight) {
            textarea.style.height = `${maxHeight}px`;
            textarea.style.overflowY = 'auto';
        } else {
            textarea.style.overflowY = 'hidden';
        }
    };

    return (
        <>
            <textarea
                {...field}
                onChange={handleTextAreaInput}
                className={`w-full outline-none resize-none overflow-hidden ${className}`}
                {...props}
            />
            {showError && error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </>
    );
};

export default TextArea;
