import { z } from "zod";

const onboardingSchema = z.object({
    channelName: z.string().min(3, "Channel name is too short").max(50, "Too long"),
    channelHandle: z.string()
        .min(3, "Handle too short")
        .max(30, "Too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Handle can only include letters, numbers, and underscores"),
    sampleWorkLinks: z.string().optional(),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    reasonToWrite: z.string().min(20, "Please write a bit more about why you want to write"),
    title: z.string().optional(),
    summary: z.string().optional(),
    content: z.string().optional(),
    cover: z
        .any()
        .refine((file) => {
            if (!file) return true;
            if (!(file instanceof File)) return false;
            return file.size <= 2 * 1024 * 1024;
        }, {
            message: "Max file size is 2MB"
        })
        .refine((file) => {
            if (!file) return true;
            if (!(file instanceof File)) return false;
            return file.type.startsWith("image/");
        }, {
            message: "Only images are allowed"
        }),
    acceptTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions." }),
    }),
})
    .refine(
        (data) =>
            !!data.sampleWorkLinks?.trim() || !!data.content?.trim(),
        {
            message:
                "Either sample blog or sample work links must be provided.",
            path: ["sampleWorkLinks"],
        }
    );

export const onboardingDefaultValues = {
    channelName: '',
    channelHandle: '',
    bio: '',
    twitter: '',
    linkedin: '',
    github: '',
    sampleWorkLinks: '',
    reasonToWrite: '',
    title: "",
    summary: "",
    content: "",
    cover: '',
    acceptTerms: false,
};

export default onboardingSchema;