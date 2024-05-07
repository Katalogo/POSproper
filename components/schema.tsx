import { z } from "zod";

const FormValuesSchema = z.object({
  item: z.array(
    z.object({
      name: z.string({
        required_error: "Please select a item.",
      }),
      price: z.coerce.number(),
      quantity: z.coerce.number(),
    })
  ),
  payments: z.array(
    z.object({
      paid: z.coerce.number(),
    })
  ),
  name: z.coerce
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  phone: z.coerce.number(),
  // totaldue: z.coerce.number(),
});

export { FormValuesSchema };
