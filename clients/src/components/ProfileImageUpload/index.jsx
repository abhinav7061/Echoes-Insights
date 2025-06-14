import React from "react";
import { useState } from "react";
import { useUserAuthentication } from "../../context/userContext";
import { FileUpload } from "../Inputs/fileUpload";
import { cn } from "../../lib/utils";
import { useForm } from "react-hook-form";
import { usePost } from "../../hooks/usePost";
import { toast } from "sonner";

const ProfileImageUpload = ({ label, className }) => {
    const { user, login } = useUserAuthentication();
    const { control, setValue, getValues } = useForm();
    const [profileImage, setProfileImage] = useState("");
    const [success, setSuccess] = useState(false);
    const { post: upload, loading } = usePost('/user/profile-picture', {}, false, true);
    const handleFileUpload = async () => {
        console.log({
            value: getValues('profileImage')
        });
        const formData = new FormData();
        formData.append('avatar', getValues('profileImage'));
        const res = await upload(formData);
        console.log({
            res
        })
        if (res.error) {
            return toast.error('Error while uploading image');
        }
        toast.success("Profile image uploaded successfully!");
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setProfileImage('');
        }, 1000);
    };
    const handleFileChange = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <div className={cn("flex flex-col items-center", className)}>
                <div className="relative flex-shrink-0">
                    <img
                        src={profileImage || user?.avatar?.url || "/default-profile.png"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                    />
                    {profileImage && (
                        <>
                            <button
                                onClick={() => setProfileImage("")}
                                type="button"
                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex"
                            >
                                <ion-icon name="close-outline" className="text-sm"></ion-icon>
                            </button>
                            <button
                                onClick={handleFileUpload}
                                type="button"
                                className={cn("absolute bottom-0 right-0 p-1 text-white dark:text-black rounded-full flex font-bold",
                                    success ? "bg-green-500" : 'bg-blue dark:bg-golden'
                                )}
                                title="upload"
                            >
                                <ion-icon name={success ? "cloud-done-outline" : "cloud-upload-outline"}></ion-icon>
                            </button>
                        </>
                    )}
                </div>
                <FileUpload
                    name="profileImage"
                    control={control}
                    label={label}
                    accept="image/*"
                    onFilesChange={handleFileChange}
                    className="w-full"
                    showPreview={false}
                />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                Recommended size: 200x200 pixels
            </p>
        </div>
    );
};

export default ProfileImageUpload;