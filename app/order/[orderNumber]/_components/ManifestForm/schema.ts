import z from "zod";

export const manifestSchema = z.object({
  product_category: z.string(),
  nationality: z.string().min(1),
  name: z.string().min(1),
  personal_identifier_number: z.string().min(1),
  passport_number: z.string().min(1),
  personal_identifier_url: z.string().min(1),
  passport_url: z.string().min(1),
  personal_photo_url: z.string().min(1),
});

export type ManifestSchema = z.infer<typeof manifestSchema>;
