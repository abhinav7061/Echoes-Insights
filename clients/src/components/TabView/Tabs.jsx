import React from 'react'
import HorizontalScrollSnapContainer from '../HorizontalScrollSnapContainer';
import TabButton from './TabButton';
import { cn } from '../../lib/utils';

const Tabs = ({ tabs, activeTab, handleTabChange, tabBtnClass, className, containerClass }) => {
    return (
        <HorizontalScrollSnapContainer className={cn("border-b mb-6 w-full dark:border-neutral-700 sticky top-16 bg-white dark:bg-neutral-950 z-10", className)} containerClass={cn('flex gap-2', containerClass)}>
            {tabs.map(({ label, icon, key }) => (
                <TabButton
                    key={key}
                    icon={icon}
                    label={label}
                    tabKey={key}
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                    className={tabBtnClass}
                />
            ))}
        </HorizontalScrollSnapContainer>
    )
}

export default Tabs