import React from 'react'
import { cn } from '../../lib/utils';

const TabButton = ({ label, icon, tabKey, activeTab, setActiveTab, className }) => {
    const isActive = activeTab === tabKey;

    return (
        <button
            onClick={() => setActiveTab(tabKey)}
            className={cn(
                'px-4 py-2 font-medium flex items-center gap-1 border-b-2 whitespace-nowrap snap-start',
                isActive
                    ? 'text-blue dark:text-golden border-blue dark:border-golden'
                    : 'text-neutral-600 border-transparent dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600',
                className
            )}
        >
            <ion-icon name={icon} className="mr-2"></ion-icon>
            {label}
        </button>
    );
};

export default TabButton