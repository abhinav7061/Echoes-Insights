import { useController } from "react-hook-form";
import Error from "./error";
import Label from "./label";

export const RadioGroup = ({
    name,
    control,
    label,
    options = [],
    showError = true,
    className = "",
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
                className={`mb-1 ${disabled ? "text-neutral-400" : "text-neutral-700"}`}
            />
            <div className="space-y-2">
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className={`flex items-center text-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <input
                            type="radio"
                            value={opt.value}
                            checked={field.value === opt.value}
                            onChange={() => field.onChange(opt.value)}
                            disabled={disabled}
                            className="mr-2"
                            {...props}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
            <Error showError={showError} error={error} />
        </div>
    );
};
