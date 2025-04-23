import React, { useState, useRef } from 'react';
import Button from '../Button';
import useOutsideClick from '../../hooks/useOutsideClick';
import { cn } from '../../lib/utils';

const Dropdown = ({
    trigger: Trigger,
    children,
    position = 'bottom-center',
    closeOnOutsideClick = true,
    closeOnSelect = true,
    onOpen,
    onClose,
    className = '',
    triggerClassName = '',
    contentClassName = '',
    triggerChild,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        newState ? onOpen?.() : onClose?.();
    };

    const closeDropdown = () => {
        setIsOpen(false);
        onClose?.();
    };

    useOutsideClick(dropdownRef, () => {
        if (closeOnOutsideClick)
            closeDropdown();
    })

    const positionClasses = {
        'bottom-left': 'top-full left-0 mt-1',
        'bottom-right': 'top-full right-0 mt-1',
        'bottom-center': 'top-full left-1/2 -translate-x-1/2 mt-1',
        'top-left': 'bottom-full left-0 mb-1',
        'top-right': 'bottom-full right-0 mb-1',
        'top-center': 'bottom-full left-1/2 -translate-x-1/2 mb-1',
        'left': 'right-full top-0 mr-1',
        'right': 'left-full top-0 ml-1',
    };

    return (
        <div ref={dropdownRef} className={`relative inline-block ${className}`}>
            <Trigger
                title={triggerChild}
                isOpen={isOpen}
                onClick={toggleDropdown}
                className={triggerClassName}
            />

            {isOpen && (
                <div
                    className={`absolute z-50 min-w-max rounded-xl shadow-sm bg-neutral-100 dark:bg-neutral-800 dark:shadow-neutral-700 p-3 ${positionClasses[position]} ${contentClassName}`}
                    onClick={() => closeOnSelect && closeDropdown()}
                >
                    {typeof children === 'function' ? children({ closeDropdown }) : children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;


export const DefaultTrigger = ({ isOpen, children, ...rest }) => (
    <Button aria-expanded={isOpen} {...rest}>
        {children || 'Dropdown'}
    </Button>
);

export const DropdownMenuItem = ({
    children,
    onClick,
    className = '',
    disabled = false,
    active = false,
}) => (
    <li
        className={cn('block w-full text-left p-2 text-sm rounded-md',
            disabled ? 'text-neutral-400 cursor-not-allowed' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer',
            active && 'bg-neutral-100 dark:bg-neutral-700',
            className)}
        onClick={disabled ? undefined : onClick}
        role="menuitem"
        aria-disabled={disabled}
    >
        {children}
    </li>
);