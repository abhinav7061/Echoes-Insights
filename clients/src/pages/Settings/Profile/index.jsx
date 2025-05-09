import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Inputs';
import TextArea from '../../../components/Inputs/TextArea';
import { FileUpload } from '../../../components/Inputs/fileUpload';
// import { verifyEmail, verifyPhone } from '../../services/authService';
import { useUserAuthentication } from '../../../context/userContext';
import SettingsHeading from '../../../components/Headers/heading';
import CancelBtn from '../../../components/Button/cancelBtn';
import AcceptBtn from '../../../components/Button/acceptBtn';
import { Select } from '../../../components/Inputs/select';

const ProfileSettingsPage = () => {
    const { user } = useUserAuthentication();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationSent, setVerificationSent] = useState({ email: false, phone: false });
    const [profileImage, setProfileImage] = useState(user?.profileImage || '');

    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            gender: user?.gender || '',
            bio: user?.bio || ''
        }
    });

    const currentEmail = watch('email');
    const currentPhone = watch('phone');

    const handleFileUpload = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendVerification = async (type) => {
        try {
            setIsSubmitting(true);
            if (type === 'email') {
                // await verifyEmail(currentEmail);
                setVerificationSent(prev => ({ ...prev, email: true }));
            } else {
                // await verifyPhone(currentPhone);
                setVerificationSent(prev => ({ ...prev, phone: true }));
            }
        } catch (error) {
            console.error(`Error sending ${type} verification:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            // await updateUser({
            //     ...data,
            //     profileImage,
            //     // Only include verification status if email/phone changed
            //     ...(currentEmail !== user?.email && { emailVerified: false }),
            //     ...(currentPhone !== user?.phone && { phoneVerified: false })
            // });
            // Show success message or redirect
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <SettingsHeading title='Profile Settings' />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Picture Section */}
                <div className="lg:col-span-1">
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <img
                                    src={profileImage || '/default-profile.png'}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                                />
                                {profileImage && (
                                    <button
                                        onClick={() => setProfileImage('')}
                                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex"
                                    >
                                        <ion-icon name="close-outline" className="text-sm"></ion-icon>
                                    </button>
                                )}
                            </div>
                            <FileUpload
                                name="profileImage"
                                control={control}
                                label="Upload new photo"
                                accept="image/*"
                                onFilesChange={handleFileUpload}
                                className="w-full"
                                showPreview={false}
                            />
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                Recommended size: 200x200 pixels
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Information Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    name="name"
                                    control={control}
                                    label="Full Name"
                                    required={true}
                                    inputClass='dark:bg-neutral-950/50'
                                />

                                <div className="relative">
                                    <Input
                                        name="email"
                                        control={control}
                                        label="Email Address"
                                        type="email"
                                        required={true}
                                        inputClass='dark:bg-neutral-950/50'
                                    />
                                    {currentEmail !== user?.email && (
                                        <div className="absolute right-0 top-1/3 mt-2">
                                            {verificationSent.email ? (
                                                <span className="text-xs text-green-600 dark:text-green-400">
                                                    Verification sent
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSendVerification('email')}
                                                    disabled={isSubmitting || errors.email}
                                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    Verify Email
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Select
                                    options={[
                                        { label: "Select gender", value: "" },
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                        { label: "Other", value: "other" },
                                        { label: "Prefer not to say", value: "prefer-not-to-say" }
                                    ]}
                                    name="gender"
                                    label="Gender"
                                    control={control}
                                    inputClass='dark:bg-neutral-950/50'
                                />

                                <div className="relative">
                                    <Input
                                        name="phone"
                                        control={control}
                                        label="Phone Number"
                                        type="tel"
                                        inputClass='dark:bg-neutral-950/50'
                                        rules={{
                                            pattern: {
                                                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                                                message: 'Invalid phone number'
                                            }
                                        }}
                                    />
                                    {currentPhone && currentPhone !== user?.phone && (
                                        <div className="absolute right-3 top-1/3 mt-2">
                                            {verificationSent.phone ? (
                                                <span className="text-xs text-green-600 dark:text-green-400">
                                                    Verification sent
                                                </span>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSendVerification('phone')}
                                                    disabled={isSubmitting || errors.phone}
                                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    Verify Phone
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">About</h2>
                            <TextArea
                                name="bio"
                                control={control}
                                label="Bio"
                                placeholder="Tell people about yourself..."
                                rows={4}
                                maxHeightMultiplier={8}
                                inputClass='dark:bg-neutral-950/50'
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <CancelBtn onClick={() => navigate('/settings')} type='button' />
                            <AcceptBtn
                                type='submit'
                                title={isSubmitting ? 'Saving...' : 'Save Changes'}
                                disabled={isSubmitting}
                                className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsPage;