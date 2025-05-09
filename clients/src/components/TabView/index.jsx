import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useSwipeDirection from '../../hooks/useSwipeDirection';
import Tabs from './Tabs';

const TabView = ({ tabs = [], defaultTab, children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const activeTab = tabParam || defaultTab || tabs[0]?.key;

    const tabRef = useRef(null);
    const swipeDirection = useSwipeDirection(tabRef);

    useEffect(() => {
        if (!swipeDirection) return;

        const currentIndex = tabs.findIndex(t => t.key === activeTab);
        const newIndex = swipeDirection === 'left' ? currentIndex + 1 : currentIndex - 1;

        if (newIndex >= 0 && newIndex < tabs.length) {
            setSearchParams({ tab: tabs[newIndex].key });
        }
    }, [swipeDirection]);

    const handleTabChange = (key) => {
        setSearchParams({ tab: key });
    };

    const ActiveTabComponent = tabs.find(t => t.key === activeTab)?.component;

    return (
        <div className="flex flex-col h-full">
            <Tabs tabs={tabs} activeTab={activeTab} handleTabChange={handleTabChange} />
            {children}
            <div ref={tabRef} className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {ActiveTabComponent && <ActiveTabComponent />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TabView;
