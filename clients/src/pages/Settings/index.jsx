import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import DarkMode from '../../components/DarkMode';
import TermsAndConditions from '../../components/TermsAndConditions';
import AboutModal from '../../components/About';
import SettingsSection from './SettingsSection';
import SettingsItem from './SettingsItem';
import useDeviceType from '../../hooks/useDeviceType';

const Settings = () => {
    const { user } = useUserAuthentication();
    const navigate = useNavigate();
    const { isMobile } = useDeviceType();
    const [showTerms, setShowTerms] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const userAccessAction = [
        ...((user?.role === 'admin' || user?.role === 'writer') ? [{
            id: 1,
            iconName: 'speedometer-outline',
            name: 'Dashboard',
            onClick: () => navigate('/dashboard'),
        },
        {
            id: 7,
            iconName: 'radio-outline',
            name: 'Channel',
            onClick: () => navigate('channel'),
        }] : []),
        {
            id: 2,
            iconName: 'person-circle-outline',
            name: 'Profile',
            onClick: () => navigate('profile'),
        },
        {
            id: 3,
            iconName: 'notifications-outline',
            name: 'Notifications',
            onClick: () => navigate('notifications'),
        },
        {
            id: 4,
            iconName: 'lock-closed-outline',
            name: 'Security',
            onClick: () => navigate('security'),
        },
        {
            id: 5,
            listItem: <DarkMode position='right' triggerBtnClass='p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800' />
        },
        ...(user?.role === 'admin' ? [{
            id: 6,
            iconName: 'shield-checkmark-outline',
            name: 'Admin Panel',
            onClick: () => navigate('/admin'),
        }] : []),
    ];

    // General application settings
    const appSettings = [
        {
            id: 1,
            iconName: 'help-circle-outline',
            name: 'Help & Support',
            onClick: () => navigate('/support'),
        },
        {
            id: 2,
            iconName: 'information-circle-outline',
            name: 'About',
            onClick: () => isMobile ? navigate('/about') : setShowAbout(true),
        },
        {
            id: 3,
            iconName: 'document-text-outline',
            name: 'Terms & Conditioins',
            onClick: () => setShowTerms(true),
        },
        {
            id: 3,
            iconName: 'lock-closed-outline',
            name: 'Privacy',
            onClick: () => navigate('/privacy'),
        },
    ];

    const adminSettings = [
        {
            id: 1,
            iconName: 'people-outline',
            name: 'Manage Users',
            onClick: () => navigate('/admin?tab=users'),
        },
        {
            id: 2,
            iconName: 'analytics-outline',
            name: 'View Analytics',
            onClick: () => navigate('/admin?tab=analytics'),
        },
    ]

    return (
        <div className="max-w-4xl mx-auto py-6 ss:p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>

            {/* User Section */}
            <SettingsSection title="Account Settings" iconName="person-outline" className="dark:bg-neutral-900">
                {userAccessAction.map((action) => (
                    <SettingsItem
                        key={action?.id}
                        name={action?.name}
                        iconName={action?.iconName}
                        onClick={action?.onClick}
                        listItem={action?.listItem}
                    />
                ))}
            </SettingsSection>

            {/* App Settings Section */}
            <SettingsSection title="Application" iconName="settings-outline" className="dark:bg-neutral-900">
                {appSettings.map((setting) => (
                    <SettingsItem
                        key={setting.id}
                        name={setting.name}
                        iconName={setting.iconName}
                        onClick={setting.onClick}
                    />
                ))}
            </SettingsSection>

            {/* Danger Zone Section */}
            {user?.role === 'admin' && (
                <SettingsSection title="Admin Zone" iconName='warning-outline' className="border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400">
                    <div className="space-y-3">
                        {adminSettings.map((setting) => (
                            <SettingsItem
                                key={setting.id}
                                name={setting.name}
                                iconName={setting.iconName}
                                onClick={setting.onClick}
                                btnClassName="hover:bg-red-50 dark:hover:bg-red-900/20"
                                className='border-none'
                            />
                        ))}
                    </div>
                </SettingsSection>
            )}

            <TermsAndConditions
                isOpen={showTerms}
                onClose={() => setShowTerms(false)}
                userRole={user?.role}
            />
            <AboutModal
                isOpen={showAbout}
                onClose={() => setShowAbout(false)}
            />
        </div>
    );
};

export default Settings;