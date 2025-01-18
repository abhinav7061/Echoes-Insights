import React, { useEffect } from 'react';
import { people01 } from '../../assets';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TextArea from '../Inputs/TextArea';
import { useUserAuthentication } from '../../context/userContext';
import { toast } from 'sonner';

const CommentInputForm = ({ onSubmit, value = '', isReply = false, className, autoFocus = false }) => {
    const { isAuthenticatedUser } = useUserAuthentication();
    const schema = z.object({
        value: z
            .string()
            .trim()
            .max(1000, `${isReply ? 'Reply' : 'Comment'} must be 1000 characters or less`)
            .nonempty(`${isReply ? 'Reply' : 'Comment'} is required`),
    });
    const {
        handleSubmit,
        control,
        setFocus,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { value },
    });

    const watchedValue = watch('value');

    const formSubmit = async (data) => {
        if (!isAuthenticatedUser) return toast.error("Login first")
        if (data.value == value) return;
        await onSubmit(data.value);
        reset();
    };
    useEffect(() => {
        if (autoFocus) {
            setFocus("value");
        }
    }, [setFocus]);

    return (
        <div className={`flex gap-2 rounded-md z-[10] ${className}`}>
            <img src={people01} alt="user" className="h-8 aspect-square" />
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-grow relative group">
                <TextArea
                    name="value"
                    control={control}
                    rows={1}
                    placeholder={isReply ? 'Write your reply...' : 'Write a comment...'}
                    showError={false}
                    className="w-full px-2 py-1 resize-none text-sm outline-none bg-transparent"
                    required
                />
                <button
                    type="submit"
                    className={`ml-2 text-xl flex items-center justify-center 
                        ${watchedValue.trim() == value ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue dark:hover:text-golden'}`}
                    disabled={watchedValue.trim() == value}
                >
                    <ion-icon name="send"></ion-icon>
                </button>
                <div className="border-b bottom-0 left-0 border-neutral-300 dark:border-neutral-500 w-full absolute"></div>
                <div
                    className={`border-b-2 bottom-0 left-0 w-0 ${errors.value ? 'dark:border-red-600 border-red-500' : 'dark:border-neutral-100 border-neutral-800'
                        } group-focus-within:w-full absolute transition-[width] duration-500 ease-in-out`}
                ></div>
            </form>
        </div>
    );
};

export default CommentInputForm;