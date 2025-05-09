import React from 'react';
import { useController } from 'react-hook-form';
import Label from './label';
import Error from './error';
import { cn } from '../../lib/utils';

const TextArea = ({ name, control, showError = true, label, className = '', maxHeightMultiplier = 5, required = false, inputClass, ...props }) => {
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
        <div className={className}>
            <Label label={label} htmlFor={name} required={required} />
            <textarea
                {...field}
                id={name}
                onChange={handleTextAreaInput}
                className={cn("w-full outline-none resize-none overflow-hidden bg-transparent rounded-md p-2", inputClass)}
                {...props}
            />
            <Error showError={showError} error={error} />
        </div>
    );
};

export default TextArea;
