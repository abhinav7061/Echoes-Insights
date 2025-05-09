import React, { useState } from 'react';
import SettingsHeading from '../../../components/Headers/heading';
import { Checkbox } from '../../../components/Inputs/checkbox';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import { cn } from '../../../lib/utils';

const NotificationSettingsPage = () => {
    const method = useForm({
        defaultValues: {
            emergencyOverride: ''
        }
    })
    // Notification preferences state
    const [notificationPrefs, setNotificationPrefs] = useState({
        email: {
            activity: true,
            newsletters: false,
            promotions: false,
            security: true
        },
        push: {
            messages: true,
            mentions: true,
            reminders: false
        },
        inApp: {
            comments: true,
            updates: true,
            suggestions: true
        },
        sms: {
            importantOnly: false
        }
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleToggle = (type, category) => {
        setNotificationPrefs(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [category]: !prev[type][category]
            }
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const notificationGroups = [
        {
            title: "Email Notifications",
            icon: "mail-outline",
            type: "email",
            items: [
                { label: "Activity on my content", key: "activity" },
                { label: "Newsletters", key: "newsletters" },
                { label: "Promotions", key: "promotions" },
                { label: "Security alerts", key: "security" }
            ]
        },
        {
            title: "Push Notifications",
            icon: "notifications-outline",
            type: "push",
            items: [
                { label: "New messages", key: "messages" },
                { label: "Mentions", key: "mentions" },
                { label: "Reading reminders", key: "reminders" }
            ]
        },
        {
            title: "In-App Notifications",
            icon: "chatbubbles-outline",
            type: "inApp",
            items: [
                { label: "Comments on my posts", key: "comments" },
                { label: "System updates", key: "updates" },
                { label: "Content suggestions", key: "suggestions" }
            ]
        },
        {
            title: "SMS Alerts",
            icon: "phone-portrait-outline",
            type: "sms",
            items: [
                { label: "Important notifications only", key: "importantOnly" }
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <SettingsHeading title='Notification Settings' />

            <div className="space-y-6">
                {notificationGroups.map((group) => (
                    <div key={group.type} className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ion-icon name={group.icon} className="text-xl"></ion-icon>
                            <h2 className="text-lg font-semibold">{group.title}</h2>
                        </div>

                        <div className="space-y-3">
                            {group.items.map((item) => (
                                <div key={item.key} className="flex justify-between items-center py-3 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                                    <span className="text-neutral-800 dark:text-neutral-200">{item.label}</span>
                                    <button
                                        onClick={() => handleToggle(group.type, item.key)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notificationPrefs[group.type][item.key]
                                            ? 'bg-neutral-400 dark:bg-neutral-950'
                                            : 'bg-neutral-200 dark:bg-neutral-800'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-blue dark:bg-golden transition-transform ${notificationPrefs[group.type][item.key]
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
                {saveSuccess && (
                    <span className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm">
                        <ion-icon name="checkmark-circle-outline" className="mr-2"></ion-icon>
                        Preferences saved successfully
                    </span>
                )}
                <Button
                    title={isSaving ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-spin mr-2"><ion-icon name="refresh-outline"></ion-icon></span>
                            Saving...
                        </span>
                    ) : 'Save Changes'}
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn("px-6 py-2 rounded-lg", isSaving && 'opacity-70 cursor-not-allowed')}
                />
            </div>

            {/* Notification Preferences */}
            <div className="mt-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ion-icon name="moon-outline"></ion-icon>
                    Do Not Disturb
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium mb-2">Scheduled Quiet Hours</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">From</label>
                                <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <option key={`from-${i}`} value={i}>{i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">To</label>
                                <select className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700 dark:text-white">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <option key={`to-${i}`} value={i}>{i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Emergency Override</h3>
                        <Checkbox
                            id='emergencyOverride'
                            label='Allow notifications from admins during quiet hours'
                            name='emergencyOverride'
                            control={method.control}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingsPage;