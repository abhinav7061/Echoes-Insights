import React from 'react'
import { cn } from '../../lib/utils'

const SettingActionsBtn = ({ action, iconName, label, className }) => {
    return (
        <button
            onClick={action}
            className={cn("flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors", className)}
        >
            <ion-icon name={iconName} className="text-2xl mb-2"></ion-icon>
            <span className="text-sm">{label}</span>
        </button>
    )
}

export default SettingActionsBtn