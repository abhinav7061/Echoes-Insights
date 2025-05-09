import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/Inputs';
import TextArea from '../../../components/Inputs/TextArea';
import Button from '../../../components/Button'
import { useUserAuthentication } from '../../../context/userContext';
import contactSchema, { initialValue } from '../../../schemas/contact';
import { usePost } from '../../../hooks/usePost';
import { toast } from 'sonner';

const ContactTab = () => {
    const { user } = useUserAuthentication();
    const method = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: initialValue(user)
    });

    const { handleSubmit, control, reset } = method;

    const { post, loading } = usePost('/contact');
    const onSubmit = async (data) => {
        const response = await post(data);
        console.log(response);
        if (response.error)
            return toast.error(response?.error || "Server error. please try again later!")
        toast.success(response?.message || "Your message has been send!");
        reset();
    };

    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Contact Our Support Team</h2>
            <FormProvider {...method}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-4">
                        <Input
                            name="name"
                            inputClass='dark:bg-neutral-800'
                            control={control}
                            label="Your Name"
                            required
                        />
                        <Input
                            name="email"
                            inputClass='dark:bg-neutral-800'
                            control={control}
                            label="Email Address"
                            type="email"
                            required
                        />
                    </div>
                    <Input
                        name="subject"
                        inputClass='dark:bg-neutral-800'
                        control={control}
                        label="Subject"
                        required
                    />
                    <TextArea
                        name="message"
                        className='mb-6'
                        inputClass='dark:bg-neutral-800'
                        control={control}
                        label="Message"
                        required
                        rows={5}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        title={loading ? 'Sending...' : 'Send Message'}
                        className='rounded-md px-3 py-1'
                        icon={loading ? <span className='animate-spin mr-2'><ion-icon name="refresh-outline"></ion-icon></span> : <ion-icon name="paper-plane-outline"></ion-icon>}
                    />
                </form>
            </FormProvider>
        </div>
    );
};

export default ContactTab;
