import React from 'react'
import { cn } from '../../lib/utils';

const SettingsItem = ({ name, iconName, onClick, listItem, btnClassName, className }) => {
    return (
        <div className={cn("border-b border-neutral-100 dark:border-neutral-700 last:border-0", className)}>
            {listItem ? (
                listItem
            ) : (
                <button
                    onClick={onClick}
                    className={cn("flex items-center gap-3 w-full p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors", btnClassName)}
                >
                    <ion-icon name={iconName} className="text-xl"></ion-icon>
                    <span className="flex-1 text-left">{name}</span>
                    <ion-icon name="chevron-forward-outline" className="text-neutral-400"></ion-icon>
                </button>
            )}
        </div>
    );
};

export default SettingsItem;
