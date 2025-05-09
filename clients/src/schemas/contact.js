import * as z from 'zod';

const contactSchema = z.object({
    name: z.string().trim().min(3, "valid name is required!")
        .max(50, 'Name must be at most 50 characters long.')
        .refine((val) => val.split(' ').every(word => word.length <= 25), {
            message: 'Each word in Name must be under 25 characters.',
        }),
    email: z.string().trim().min(5, "valid email is required!")
        .email('Invalid email address.'),
    subject: z.string().trim().min(10, "subject should be minimum 10 character long!")
        .max(100, 'Subject must be at most 100 characters long.')
        .refine((val) => val.split(' ').every(word => word.length <= 25), {
            message: 'Each word in Subject must be under 25 characters.',
        }),
    message: z.string().trim().min(25, "message should be minimum 25 character long!")
        .max(500, 'Message must be at most 500 characters long.')
        .refine((val) => val.split(' ').every(word => word.length <= 25), {
            message: 'Each word in Message must be under 25 characters.',
        }),
});

export default contactSchema;

export const initialValue = (user) => {
    return {
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: ''
    }
}