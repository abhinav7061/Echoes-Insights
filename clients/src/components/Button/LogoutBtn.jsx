import React from 'react';
import Button from '.';
import useLogout from '../../hooks/useLogout';

const LogoutBtn = () => {
    const { logout, loading } = useLogout();
    return (
        <Button
            className='px-5 py-1 text-sm rounded-full w-full dark:before:bg-neutral-700/60 dark:hover:before:bg-gradient-to-tr dark:hover:before:from-neutral-800/20 dark:hover:before:to-neutral-800/90 before:inset-[1px]'
            icon={<ion-icon name={loading ? "refresh-circle-outline" : "log-out-outline"}></ion-icon>}
            title={`Logout`}
            onClick={logout}
        />
    )
}

export default LogoutBtn