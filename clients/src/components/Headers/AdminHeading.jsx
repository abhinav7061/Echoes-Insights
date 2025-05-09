import React from 'react'
import { useNavigate } from 'react-router-dom';
import SettingsHeading2 from './settingsHeading2';

const AdminHeading = ({ title, desc, children, className }) => {
    const navigate = useNavigate();
    return (
        <SettingsHeading2 title={title} desc={desc} className={className}>
            <div className='flex gap-2 flex-col xs:flex-row'>
                {children}
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors whitespace-nowrap"
                >
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    Back to Admin
                </button>
            </div>
        </SettingsHeading2>
    )
}

export default AdminHeading