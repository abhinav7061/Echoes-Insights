import { people01 } from "../../assets";
import { useState, useRef } from "react";
import DarkMode from "../../components/DarkMode";
import LogoutBtn from '../../components/Button/LogoutBtn';
import LoginBtn from "../../components/Button/LoginBtn";
import { useUserAuthentication } from '../../context/userContext';
import useOutsideClick from "../../hooks/useOutsideClick";
import CreateBtn from "../../components/CreateBtn";
import useDeviceType from "../../hooks/useDeviceType";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../../hooks/useDarkMode";

const UserAccess = () => {
    const { isDesktop } = useDeviceType();
    const { isAuthenticatedUser } = useUserAuthentication();
    return !isAuthenticatedUser ? <LoginBtn /> : <div className="flex gap-4 items-center">
        {isDesktop ? <DesktopUserMenu /> : <Link to='/settings' className="p-2 text-2xl rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 flex">
            <ion-icon name="settings-outline"></ion-icon>
        </Link>}
    </div>
}

export default UserAccess

const DesktopUserMenu = () => {
    const navigate = useNavigate()
    const isDark = useDarkMode();
    const userDropdownRef = useRef();
    const [open, setOpen] = useState(false);
    const { user } = useUserAuthentication();
    useOutsideClick(userDropdownRef, () => setOpen(false));
    const userAccessAction = [
        ...((user?.role === 'admin' || user?.role === 'writer') ? [{
            id: 1,
            icon: 'speedometer',
            name: 'Dashboard',
            onClick: () => navigate('/dashboard'),
        }] : []),
        {
            id: 2,
            icon: 'cog',
            name: 'Settings',
            onClick: () => navigate('/settings'),
        }, {
            id: 3,
            listItem: <DarkMode />
        }, {
            id: 4,
            icon: 'person-circle',
            name: 'Profile',
            onClick: () => navigate('/space'),
        }
    ]
    return (
        <>
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isDark ? "#ffdb70" : "#1075fa"}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="absolute top-0 -right-1 text-xs leading-3 -translate-y-1/2 py-0.5 px-1 bg-golden dark:bg-blue rounded-full">0</p>
            </div>
            <CreateBtn text="Create" />
            <div className="relative" ref={userDropdownRef}>
                <img type="button" src={people01} className="w-9 md:w-10 cursor-pointer" alt="User dropdown" onClick={() => setOpen((open) => !open)} />
                {open && <div className="z-10 absolute right-0 top-full mt-4 bg-neutral-100 divide-y divide-neutral-200 rounded-xl shadow w-44 dark:bg-neutral-800 dark:divide-neutral-700">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                        <div className="uppercase text-center font-bold text-base">{user.name}</div>
                        <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        {
                            userAccessAction.map((item) => <li key={item.id} className={`${item?.listItem ? "" : "px-4 py-2"} cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 dark:hover:text-white`} onClick={() => item.onClick?.()}>
                                {item?.listItem ? item.listItem : <span className="flex gap-1 items-center justify-center w-min whitespace-nowrap"><ion-icon name={item.icon}></ion-icon>{item.name}</span>}
                            </li>)
                        }
                    </ul>

                    <div className="py-1 px-3 flex items-center justify-center">
                        <LogoutBtn />
                    </div>
                </div>}
            </div>
        </>
    )
}