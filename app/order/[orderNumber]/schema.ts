import z from "zod";

export const orderSchema = (qyt: number) =>
  z.object({
    quantity: z.coerce.number().gte(qyt, `Must be ${qyt} and above`),
    payment_method: z.number().min(1),
    title: z.string().min(1),
    manifestData: z.string(),
  });

const getOrderSchema = orderSchema(1);

export type OrderSchema = z.infer<typeof getOrderSchema>;
