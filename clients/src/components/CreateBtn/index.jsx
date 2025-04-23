import React from 'react'
import Dropdown, { DefaultTrigger, DropdownMenuItem } from '../Dropdown'
import { useNavigate } from 'react-router-dom';
import { useUserAuthentication } from '../../context/userContext';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const CreateBtn = ({ text, position }) => {
    const navigate = useNavigate();
    const { user, isAuthenticatedUser } = useUserAuthentication();
    return (
        <Dropdown
            trigger={DefaultTrigger}
            triggerChild={<>
                <span className={cn("text-[28px] flex", text && "-mr-[5px]")}>
                    <ion-icon name="add-outline"></ion-icon>
                </span>
                {text}
            </>}
            triggerClassName={cn('rounded-full',
                text ? 'ps-2 pe-3 py-1' : 'p-1.5')}
            contentClassName='mt-4'
            position={position}
        >
            {(!isAuthenticatedUser || !user) ? <DropdownMenuItem className="flex items-center gap-1" onClick={() => navigate('/login')}>
                <span className="text-xl flex"><ion-icon name="log-in-outline"></ion-icon></span> <p>Login First</p>
            </DropdownMenuItem> : (user?.role == 'writer' || user?.role == 'admin') ?
                <>
                    <DropdownMenuItem className="flex items-center gap-1" onClick={() => toast.info("This is under development! stay tuned with us!")}>
                        <span className="text-xl flex"><ion-icon name="albums-outline"></ion-icon></span>  <p>Create Shorts</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-1" onClick={() => navigate('/create-blog')}>
                        <span className="text-xl flex"> <ion-icon name="create-outline"></ion-icon></span> <p>Create Post</p>
                    </DropdownMenuItem>
                </>
                : <DropdownMenuItem className="flex items-center gap-1" onClick={() => navigate('/writer-registration')}>
                    <span className="text-xl flex"> <ion-icon name="create-outline"></ion-icon></span> <p>Become a Blogger</p>
                </DropdownMenuItem>}
        </Dropdown>
    )
}

export default CreateBtn