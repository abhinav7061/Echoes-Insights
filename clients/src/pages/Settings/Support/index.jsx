import React from 'react';
import ContactTab from './ContactTab';
import Resources from './Resources';
import FAQ from './FAQ';
import TabView from '../../../components/TabView';
import SettingsHeading from '../../../components/Headers/heading';

const SupportPage = () => {
    const tabs = [
        { label: 'FAQs', icon: 'help-circle-outline', key: 'faq', component: FAQ },
        { label: 'Contact Us', icon: 'mail-outline', key: 'contact', component: ContactTab },
        { label: 'Resources', icon: 'document-text-outline', key: 'resources', component: Resources },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 flex flex-col h-full">
            <SettingsHeading title='Help & Support' />
            <TabView tabs={tabs} defaultTab="faq" />
        </div>
    );
};

export default SupportPage;