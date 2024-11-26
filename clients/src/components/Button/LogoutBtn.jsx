import React from 'react';
import Button from '.';
import { useUserAuthentication } from '../../context/userContext';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const LogoutBtn = () => {
    const { logout: logoutUser, jwtToken } = useUserAuthentication();
    const logout = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/logout`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                },
                credentials: 'include',
            });
            if (res.ok) {
                logoutUser();
                toast.success("Logged out successfully");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            toast.info("Error during logout")
            console.log("Error during logout:", error);
        }
    }
    return (
        <Button className='px-5 py-1 text-sm rounded-md w-full' title={`Logout`} onclicks={logout} />
    )
}

export default LogoutBtn