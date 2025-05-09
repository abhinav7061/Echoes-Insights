import React from 'react';
import { cn } from '../../lib/utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SimpleCheckbox = ({ id, checked, onChange, indeterminate, className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <div className="relative flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    ref={(el) => el && (el.indeterminate = indeterminate)}
                    className="hidden"
                />
                <div
                    className={`w-5 h-5 flex items-center justify-center rounded border-2 transition-colors bg-white dark:bg-neutral-800
            ${checked || indeterminate
                            ? "border-neutral-600 dark:border-neutral-300"
                            : "border-neutral-300 dark:border-neutral-600"
                        }
            cursor-pointer
          `}
                    onClick={() => onChange(!checked)}
                >
                    {(checked || indeterminate) && (
                        <svg
                            className="w-3 h-3 text-neutral-600 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d={checked ? "M5 13l4 4L19 7" : "M5 12h14"}
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export const SimpleRadio = ({ id, name, value, checked, onChange, label, className }) => {
    return (
        <label className={cn("flex items-center cursor-pointer", className)}>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <div
                className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    checked ? 'border-neutral-900 dark:border-white'
                        : 'border-neutral-500')}
                onClick={() => onChange(value)}
            >
                {checked && (
                    <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white shadow-[0px_0px_20px_5px_rgba(0,_0,_0,_0.3)] dark:shadow-[0px_0px_20px_5px_rgba(255,_255,_255,_0.5)]"></div>
                )}
            </div>
            {label && <span className="ml-2">{label}</span>}
        </label >
    );
};

export const SimpleSwitch = ({ id, checked, onChange, label, className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 cursor-pointer",
                    checked
                        ? 'bg-neutral-600 dark:bg-neutral-500'
                        : 'bg-neutral-200 dark:bg-neutral-600'
                )}
                onClick={() => onChange(!checked)}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
                />
            </button>
            {label && (
                <label htmlFor={id} className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {label}
                </label>
            )}
        </div>
    );
};

export const Datepicker = ({ startDate, endDate, setDateRange }) => {
    return (<div className="relative flex z-20">
        <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            placeholderText="Select date range"
            className="pl-10 pr-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 outline-none"
        />
        <span className="absolute left-3 top-2.5 text-neutral-400"><ion-icon name="calendar-outline"></ion-icon></span>
    </div>)
}