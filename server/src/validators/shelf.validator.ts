import { z } from "zod";

export const CHAT_MODELS = ["gpt_4o_mini", "gpt_4o"] as const;

export const createShelfSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is Required")
        .max(120, "Title cannot exced 120 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .nullable()
        .optional(),

    icon: z
        .string()
        .trim()
        .max(8, "Icon cannot exceed 8 characters")
        .nullable()
        .optional(),

    selectModel: z
        .enum(CHAT_MODELS)
})

export const updateShelfSchema = createShelfSchema
    .omit({
        selectModel: true
    })
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field is required" },
    );

export type CreateShelfInput = z.infer<typeof createShelfSchema>;
export type UpdateShelfInput = z.infer<typeof updateShelfSchema>;

export const shelfIdParamSchema = z.object({
    shelfId: z
        .string()
        .trim()
        .min(1)
})