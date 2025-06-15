import { z } from "zod";

const getBlogSchema = (isCoverRequired) =>
    z.object({
        title: z.string().min(1, "Title is required"),
        summary: z.string().min(1, "Summary is required").max(500, "Summary must be less than 500 characters"),
        content: z.string().min(1, "Content is required"),
        cover: z.any()
            .refine((file) => {
                if (!file) return !isCoverRequired;
                if (!(file instanceof File)) return false;
                return file.size <= 2 * 1024 * 1024;
            }, {
                message: isCoverRequired ? "Cover image is required and max 2MB" : "Max file size is 2MB"
            })
            .refine((file) => {
                if (!file) return !isCoverRequired;
                if (!(file instanceof File)) return false;
                return file.type.startsWith("image/");
            }, {
                message: "Only image files are allowed"
            }),
    });

export default getBlogSchema;