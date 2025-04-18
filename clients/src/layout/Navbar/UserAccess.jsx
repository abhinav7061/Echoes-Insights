import { people01 } from "../../assets";
import { useState, useRef } from "react";
import DarkMode from "../../components/DarkMode";
import LogoutBtn from '../../components/Button/LogoutBtn';
import LoginBtn from "../../components/Button/LoginBtn";
import { useUserAuthentication } from '../../context/userContext';
import useOutsideClick from "../../hooks/useOutsideClick";
import Dropdown, { DefaultTrigger, DropdownMenuItem } from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";

const UserAccess = () => {
    const navigate = useNavigate();
    const userDropdownRef = useRef();
    const [open, setOpen] = useState(false);
    const [showCreateOptions, setShowCreateOptions] = useState(false);
    const { isAuthenticatedUser, user } = useUserAuthentication();
    useOutsideClick(userDropdownRef, () => setOpen(false));
    const userAccessAction = [
        {
            id: 1,
            icon: 'speedometer',
            name: 'Dashboard',
        }, {
            id: 2,
            icon: 'cog',
            name: 'Settings',
        }, {
            id: 3,
            hasOwnItem: true,
            listItem: <DarkMode />
        }, {
            id: 4,
            icon: 'person-circle',
            name: 'Profile',
        }
    ]
    return (
        <>{isAuthenticatedUser ? (<div className="z[1001] flex gap-4 items-center">
            <Dropdown trigger={DefaultTrigger} triggerChild={<><span className="text-[28px] flex -mr-[5px]"><ion-icon name="add-outline"></ion-icon></span>Create</>} triggerClassName='rounded-full ps-2 pe-3 py-1' contentClassName='mt-4'>
                {(user?.role == 'writer' || user?.role == 'admin') ?
                    <>
                        <DropdownMenuItem className="flex items-center gap-1">
                            <span className="text-xl flex"> <ion-icon name="create-outline"></ion-icon></span> <p>Create Post</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-1">
                            <span className="text-xl flex"><ion-icon name="albums-outline"></ion-icon></span>  <p>Create Shorts</p>
                        </DropdownMenuItem>
                    </>
                    : <DropdownMenuItem className="flex items-center gap-1" onClick={() => navigate('/writer-registration')}>
                        <span className="text-xl flex"> <ion-icon name="create-outline"></ion-icon></span> <p>Become a Blogger</p>
                    </DropdownMenuItem>}
            </Dropdown>
            <div className="relative" ref={userDropdownRef}>
                <img type="button" src={people01} className="w-9 md:w-10 cursor-pointer" alt="User dropdown" onClick={() => setOpen((open) => !open)} />
                {open && <div className="z-10 absolute right-0 top-full mt-4 bg-neutral-100 divide-y divide-neutral-200 rounded-lg shadow w-44 dark:bg-neutral-800 dark:divide-neutral-700 border dark:border-neutral-700">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                        <div className="uppercase text-center font-bold text-base">{user.name}</div>
                        <div className="font-medium truncate">{user.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        {
                            userAccessAction.map((item) => <li key={item.id} className={`${item?.hasOwnItem ? "" : "px-4 py-2"} "cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 dark:hover:text-white"`}>
                                {item?.hasOwnItem ? item.listItem : <span className="flex gap-1 items-center justify-center w-min whitespace-nowrap"><ion-icon name={item.icon}></ion-icon>{item.name}</span>}
                            </li>)
                        }
                    </ul>

                    <div className="py-1 px-3 flex items-center justify-center">
                        <LogoutBtn />
                    </div>
                </div>}
            </div>
        </div>) : (<LoginBtn />)}</>
    )
}

export default UserAccess