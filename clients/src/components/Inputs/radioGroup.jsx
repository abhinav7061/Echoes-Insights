import { useController } from "react-hook-form";
import Error from "./error";
import Label from "./label";
import { cn } from "../../lib/utils";

export const RadioGroup = ({
    name,
    control,
    label,
    options = [],
    showError = true,
    className = "",
    radiosClass = "",
    required = false,
    disabled = false,
    ...props
}) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <div className={`mb-4 ${className}`}>
            <Label
                label={label}
                htmlFor={name}
                required={required}
                className={cn('mb-1', disabled ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300")}
            />
            <div className={radiosClass}>
                {options.map((opt) => (
                    <div
                        key={opt.value}
                        className={cn("flex items-center text-sm group",
                            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                        )}
                        onClick={() => !disabled && field.onChange(opt.value)}
                    >
                        <input
                            type="radio"
                            id={`${name} - ${opt.value}`}
                            name={name}
                            value={opt.value}
                            disabled={disabled}
                            className="hidden"
                            {...props}
                        />
                        <div
                            className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                                field.value === opt.value
                                    ? "border-neutral-600 dark:border-neutral-300"
                                    : "border-neutral-300 dark:border-neutral-600",
                                disabled ? "bg-neutral-100 dark:bg-neutral-700" : "bg-white dark:bg-neutral-800"
                            )}
                        >
                            <div className={cn("w-1.5 h-1.5 rounded-full transition-colors",
                                field.value === opt.value ? "bg-neutral-600 dark:bg-white" : "bg-none group-hover:bg-black/30 dark:group-hover:bg-white/30"
                            )} />
                        </div>
                        <span className={cn('ml-2', disabled ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300 hover:dark:text-white",
                            field.value === opt.value && "dark:text-white text-black"
                        )}>
                            {opt.label}
                        </span>
                    </div>
                ))}
            </div>
            <Error showError={showError} error={error} />
        </div>
    );
};
