import React from 'react'
import { useNavigate } from 'react-router-dom'

const SettingsHeading = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-2 mb-6">
            <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-full h-min flex hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
                <ion-icon name="arrow-back-outline" className="text-xl"></ion-icon>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        </div>
    )
}

export default SettingsHeading