import Label from "./label";

const Switch = ({
    name,
    control,
    label,
    required = false,
    disabled = false,
    className = '',
}) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={field.value}
                onClick={() => !disabled && field.onChange(!field.value)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${field.value ? 'bg-blue-600' : 'bg-neutral-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${field.value ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </button>
            <Label htmlFor={name} label={label} required={required} className="text-sm" />
        </div>
    );
};

export default Switch;