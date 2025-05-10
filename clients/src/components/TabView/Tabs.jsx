import React from 'react'
import HorizontalScrollSnapContainer from '../HorizontalScrollSnapContainer';
import TabButton from './TabButton';
import { cn } from '../../lib/utils';
import useScrollDirection from '../../hooks/useScrollDirection';
import useDeviceType from '../../hooks/useDeviceType';

const Tabs = ({ tabs, activeTab, handleTabChange, tabBtnClass, className, containerClass }) => {
    const scrollDirection = useScrollDirection();
    const { isMobile } = useDeviceType();

    return (
        <HorizontalScrollSnapContainer className={cn("border-b mb-6 w-full dark:border-neutral-700 sticky top-16 bg-white dark:bg-neutral-950 z-10 transition-all duration-300",
            (isMobile && scrollDirection == 'down') && "top-0",
            className)} containerClass={cn('flex gap-2', containerClass)}>
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