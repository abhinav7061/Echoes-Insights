import { cn } from "../../lib/utils";

const ProfileItem = ({ icon, title, value, children, className, ...rest }) => {
    return (
        <div className={cn("bg-neutral-200 dark:bg-neutral-800 p-2 rounded-md flex gap-2", className)} {...rest}>
            {icon}
            <div className='flex-grow w-[calc(100%-2rem)]'>
                <h3 className="text-md font-semibold truncate">{title}</h3>
                <p className="text-sm text-neutral-500 break-all">{value}</p>
            </div>
            {children}
        </div>
    );
};

export default ProfileItem;