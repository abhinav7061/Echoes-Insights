import React from 'react'
import CreateBtn from '../../components/CreateBtn';
import { filled_shorts_icon, shorts_icon } from '../../assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useUserAuthentication } from '../../context/userContext';

const Bottombar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUserAuthentication();

    const sidebarItems = [
        {
            path: '/',
            iconName: 'home',
            text: 'Home',
        },
        {
            path: '/shorts',
            icon: (active) => (
                <img
                    src={active ? filled_shorts_icon : shorts_icon}
                    className="dark:invert w-5"
                    alt="Shorts"
                />
            ),
            text: 'Shorts',
        },
        {
            render: <CreateBtn position='top-center' />
        },
        {
            path: '/subscription',
            iconName: 'footsteps',
            text: 'Subscription',
        },
        {
            path: '/space',
            icon: (active) => (
                <img
                    src={user?.avatar?.url || "/default-profile.png"}
                    className={cn("w-6 rounded-full cursor-pointer",
                        active ? 'border-[3px] border-neutral-800 dark:border-neutral-200' : 'border-0'
                    )}
                    alt="User profile"
                />
            ),
            text: 'You',
        }
    ].map(item => ({
        ...item,
        active: location.pathname === item.path ||
            (item.path === '/shorts' && location.pathname.startsWith('/shorts')),
    }));

    return (
        <div className="fixed bottom-0 left-0 w-full h-14 bg-white dark:bg-neutral-950 z-[1000] grid grid-cols-5 py-1 border-t dark:border-neutral-800 select-none">
            {sidebarItems.map(({ path, iconName, icon, text, active, render }) => (
                <BottombarItem
                    key={path}
                    icon={icon
                        ? icon(active)
                        : <ion-icon name={`${iconName}${active ? '' : '-outline'}`}></ion-icon>
                    }
                    render={render}
                    text={text}
                    active={active}
                    onClick={() => path && navigate(path)}
                />
            ))}
        </div>
    );
};

export default React.memo(Bottombar);

const BottombarItem = ({ icon, text, active, onClick, render }) => {
    return (
        <button
            className="justify-self-center flex flex-col items-center justify-evenly h-full w-full active:opacity-70"
            onClick={onClick}
            aria-label={text}
        >
            {render ? render : (<>
                <span className="text-xl flex">
                    {icon}
                </span>
                <span className={`text-[10px] ${active ? 'font-medium' : ''}`}>
                    {text}
                </span>
            </>)}
        </button>
    );
};