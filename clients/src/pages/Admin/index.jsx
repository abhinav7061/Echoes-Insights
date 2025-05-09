import React, { useState } from 'react';
import SettingsHeading2 from '../../components/Headers/settingsHeading2';
import UsersTab from './UsersTab';
import ContentModerationTab from './ContentModerationTab';
import AnalyticsTab from './AnalyticsTab';
import SystemSettingsTab from './SystemSettingsTab';
import TabView from '../../components/TabView';
import WriterApplicationTab from './WriterApplicationTab';

const AdminPage = () => {
    const tabs = [
        { label: 'User Management', key: 'users', icon: 'people-outline', component: UsersTab, },
        { label: 'Content Moderation', key: 'content', icon: 'document-text-outline', component: ContentModerationTab, },
        { label: 'Analytics', key: 'analytics', icon: 'analytics-outline', component: AnalyticsTab, },
        { label: 'System Settings', key: 'settings', icon: 'settings-outline', component: SystemSettingsTab, },
        { label: 'Writer Applications', key: 'writer', icon: 'create-outline', component: WriterApplicationTab, },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SettingsHeading2 title='Admin Dashboard' desc='Manage users, content, and system settings' className='flex-row' />
            <TabView tabs={tabs} />
        </div>
    );
};

export default AdminPage;