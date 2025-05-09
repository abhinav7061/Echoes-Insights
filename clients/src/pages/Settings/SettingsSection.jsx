import React from 'react'
import { cn } from '../../lib/utils';

const SettingsSection = ({ title, iconName, children, className }) => {
    return (
        <div className={cn("rounded-xl shadow-sm p-4 mb-6", className)}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ion-icon name={iconName}></ion-icon>
                {title}
            </h2>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
};

export default SettingsSection