import { cn } from "../../lib/utils";

const Card = ({ icon, iconName, title, value, description, className = '' }) => {
    return (
        <div className={cn('p-3 bg-neutral-100/70 dark:bg-neutral-700/70 rounded-lg', className)}>
            {iconName && (
                <div className="flex justify-center my-1">
                    <ion-icon name={iconName} className="text-xl text-blue dark:text-golden"></ion-icon>
                </div>
            )}
            {icon}
            {value && <p className="text-2xl font-bold text-blue dark:text-golden">{value}</p>}
            <div>
                {title && <h4 className="font-medium text-neutral-900 dark:text-white">{title}</h4>}
                {description && (
                    <p className={`text-xs ${value ? 'mt-1' : 'mt-2'} text-neutral-600 dark:text-neutral-400`}>
                        {description}
                    </p>
                )}
            </div>
        </div >
    );
};

export default Card;