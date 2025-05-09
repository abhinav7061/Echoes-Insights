import React from 'react';
import { useController } from 'react-hook-form';
import Label from './label';
import Error from './error';
import { cn } from '../../lib/utils';

const Input = ({ name, control, label, showError = true, type = 'text', className = '', required = false, inputClass, ...props }) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className={cn('mb-4', className)}>
            <Label label={label} htmlFor={name} required={required} />
            <input
                {...field}
                id={name}
                type={type}
                className={cn("w-full p-2 rounded-md outline-none bg-neutral-100 dark:bg-neutral-900", inputClass)}
                {...props}
                required={false}
            />
            <Error showError={showError} error={error} />
        </div>
    );
};

export default Input;
