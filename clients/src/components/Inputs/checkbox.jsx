import { useController } from "react-hook-form";
import Error from "./error";
import Label from "./label";

export const Checkbox = ({
  name,
  control,
  label,
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
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            {...field}
            id={name}
            type="checkbox"
            checked={field.value}
            disabled={disabled}
            className="hidden"
            {...props}
          />
          <div
            className={`w-5 h-5 flex items-center justify-center rounded border-2 transition-colors bg-white dark:bg-neutral-800
              ${field.value
                ? "border-neutral-600 dark:border-neutral-300"
                : "border-neutral-300 dark:border-neutral-600"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
            onClick={() => !disabled && field.onChange(!field.value)}
          >
            {field.value && (
              <svg
                className="w-3 h-3 text-neutral-600 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <Label className={`ml-2 mb-0 text-sm cursor-pointer ${disabled ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-300"}`} label={label} htmlFor={name} required={required} />
      </div>
      <Error showError={showError} error={error} />
    </div>
  );
};