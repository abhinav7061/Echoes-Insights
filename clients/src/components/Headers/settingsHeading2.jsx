import React from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils';

const SettingsHeading2 = ({ title, desc, children, className }) => {
    const navigate = useNavigate();
    return (
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center mb-8", className)}>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    {desc}
                </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2">
                {children}
                <button
                    onClick={() => navigate('/settings')}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 flex"
                >
                    <ion-icon name="settings-outline" className="text-xl"></ion-icon>
                </button>
            </div>
        </div>
    )
}

export default SettingsHeading2