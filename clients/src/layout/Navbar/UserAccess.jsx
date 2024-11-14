import { people01 } from "../../assets";
import { useState, useRef } from "react";
import DarkMode from "../../components/DarkMode";
import LogoutBtn from '../../components/Button/LogoutBtn';
import LoginBtn from "../../components/Button/LoginBtn";
import { useUserAuthentication } from '../../context/userContext';
import useOutsideClick from "../../hooks/useOutsideClick";

const UserAccess = () => {
    const userDropdownRef = useRef();
    const [open, setOpen] = useState(false);
    const { isAuthenticatedUser, user } = useUserAuthentication();
    useOutsideClick(userDropdownRef, () => setOpen(false));

    return (
        <>{isAuthenticatedUser ? (<div ref={userDropdownRef} className="text-xl relative z[1001]">
            <img type="button" src={people01} className="w-9 md:w-10 cursor-pointer" alt="User dropdown" onClick={() => setOpen((open) => !open)} />
            {open && <div className="z-10 absolute right-0 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-900 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="uppercase text-center font-bold text-base">{user.name}</div>
                    <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <span className="flex gap-1 items-center justify-center w-min"><ion-icon name="options-outline"></ion-icon> Dashboard</span>
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <span className="flex gap-1 items-center justify-center w-min"><ion-icon name="cog-outline"></ion-icon> Settings</span>
                    </li>
                    <li className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <DarkMode />
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <span className="flex gap-1 items-center justify-center w-min"><ion-icon name="person-circle-outline"></ion-icon> Profile</span>
                    </li>
                </ul>
                <div className="py-1 px-3 flex items-center justify-center">
                    <LogoutBtn />
                </div>
            </div>}
        </div>) : (<LoginBtn />)}</>
    )
}

export default UserAccess