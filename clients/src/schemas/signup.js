import { z } from "zod";

export const Step1Schema = z.object({
    name: z.string().min(3, "Name is required")
        .max(50, "Name must be less than 50 characters long")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string().email("Invalid email").max(100, "Email must be less than 100 characters long"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be less than 100 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    cpassword: z.string(),
}).refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Passwords do not match",
});

export const Step2Schema = z.object({
    phone: z
        .string()
        .optional()
        .refine(
            (val) =>
                !val || (/^\d+$/.test(val) && val.length >= 10 && val.length <= 15),
            { message: "Phone must be valid 10 to 15 digits long" }
        ),
    gender: z.enum(["Male", "Female", "Other", "Undisclosed"]).optional(),
    interests: z.array(z.string()).min(3, "Select at least three interests"),
});

export const Step3Schema = z.object({
    reciveUpdates: z.boolean().optional(),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and privacy policy" }),
    }),
});

export const initialValue = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    gender: "",
    profileImage: null
}