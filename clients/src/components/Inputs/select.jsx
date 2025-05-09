import { useController } from "react-hook-form";
import Error from "./error";
import Label from "./label";
import { cn } from "../../lib/utils";

export const Select = ({
    name,
    control,
    label,
    options = [],
    showError = true,
    className = "",
    required = false,
    disabled = false,
    inputClass,
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
            />
            <select
                {...field}
                id={name}
                disabled={disabled}
                className={cn("w-full px-3 py-2.5 rounded-md bg-white dark:bg-neutral-800",
                    disabled && "opacity-50 cursor-not-allowed",
                    inputClass
                )}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <Error showError={showError} error={error} />
        </div>
    );
};
