import { useCallback, useState, useRef } from "react";
import { useController } from "react-hook-form";
import Label from "./label";
import Error from "./error";
import { toast } from "sonner";

export const FileUpload = ({
    name,
    control,
    label,
    multiple = false,
    accept = "*/*",
    maxSize = 5 * 1024 * 1024, // 5MB default
    showError = true,
    className = "",
    required = false,
    disabled = false,
    onFilesChange,
    ...props
}) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        // defaultValue: multiple ? [] : null,
    });
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previews, setPreviews] = useState([]);

    const handleFileChange = useCallback(
        (files) => {
            if (!files || files.length === 0) return;

            const fileArray = Array.from(files);
            const validFiles = [];
            const newPreviews = [];

            const processFile = (index) => {
                if (index >= fileArray.length) {
                    if (validFiles.length > 0) {
                        const newValue = multiple
                            ? [...(Array.isArray(field.value) ? field.value : []), ...validFiles]
                            : validFiles[0];

                        field.onChange(newValue);
                        onFilesChange?.(validFiles);
                    }
                    return;
                }

                const file = fileArray[index];

                if (file.size > maxSize) {
                    toast.error(`File ${file.name} exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
                    processFile(index + 1);
                    return;
                }

                if (accept !== "*/*" && !file.type.match(new RegExp(accept.replace(/\*/g, ".*")))) {
                    toast.error(`File ${file.name} is not a supported file type`);
                    processFile(index + 1);
                    return;
                }

                validFiles.push(file);

                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        newPreviews.push(e.target.result);
                        setPreviews(prev => [...prev, e.target.result]);
                        processFile(index + 1);
                    };
                    reader.onerror = () => processFile(index + 1);
                    reader.readAsDataURL(file);
                } else {
                    processFile(index + 1);
                }
            };

            processFile(0);
        },
        [field, multiple, accept, maxSize, onFilesChange]
    );

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    };

    const removeFile = (index) => {
        if (multiple) {
            const newFiles = [...(Array.isArray(field.value) ? field.value : [])];
            newFiles.splice(index, 1);
            field.onChange(newFiles);
            setPreviews(previews.filter((_, i) => i !== index));
        } else {
            field.onChange(null);
            setPreviews([]);
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            <Label label={label} htmlFor={name} required={required} />

            <div
                className={`border-2 border-dashed rounded-lg p-6 transition-colors ${isDragging
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-neutral-300 dark:border-neutral-600"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !disabled && inputRef?.current.click()}
            >
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        {isDragging
                            ? "Drop files here"
                            : "Drag and drop files here, or click to browse"}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                        {accept !== "*/*" ? `Supported formats: ${accept}` : "All file types supported"}
                        {maxSize && ` • Max size: ${maxSize / 1024 / 1024}MB`}
                    </p>
                </div>

                <input
                    id={name}
                    ref={(instance) => {
                        field.ref(instance);
                        inputRef.current = instance;
                    }}
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    accept={accept}
                    onChange={(e) => handleFileChange(e.target.files)}
                    disabled={disabled}
                    {...props}
                />
            </div>

            {(field.value && (multiple ? field.value.length > 0 : true)) && (
                <div className="mt-4 space-y-2">
                    {multiple ? (
                        field.value.map((file, index) => (
                            <FilePreviewItem
                                key={index}
                                file={file}
                                previewUrl={previews[index]}
                                onRemove={() => removeFile(index)}
                                disabled={disabled}
                            />
                        ))
                    ) : (
                        <FilePreviewItem
                            file={field.value}
                            previewUrl={previews[0]}
                            onRemove={() => removeFile(0)}
                            disabled={disabled}
                        />
                    )}
                </div>
            )}

            <Error showError={true} error={error} />
        </div>
    );
};

const FilePreviewItem = ({ file, previewUrl, onRemove, disabled }) => {
    const getFileIcon = (mimeType) => {
        if (mimeType.startsWith("image/")) return "🖼️";
        if (mimeType.startsWith("video/")) return "🎬";
        if (mimeType.startsWith("audio/")) return "🎵";
        if (mimeType.includes("pdf")) return "📄";
        if (mimeType.includes("zip") || mimeType.includes("compressed")) return "🗜️";
        if (mimeType.includes("word")) return "📝";
        if (mimeType.includes("excel")) return "📊";
        if (mimeType.includes("powerpoint")) return "📑";
        return "📁";
    };

    return (
        <div className="flex items-center justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex items-center space-x-3">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt={file.name}
                        className="h-10 w-10 object-cover rounded"
                    />
                ) : (
                    <div className="h-10 w-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded">
                        <span className="text-lg">{getFileIcon(file.type)}</span>
                    </div>
                )}
                <div>
                    <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                        {(file.size / 1024).toFixed(1)}KB
                    </p>
                </div>
            </div>
            {!disabled && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};