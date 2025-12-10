import z from "zod";

export const updateAccountBodyValidator = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters long")
      .optional(),
    email: z.string().email("Invalid email format").optional()
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one field (name or email) must be provided for update"
  });

export const updateAccountIdValidator = z.object({
  accountId: z.string().uuid("Invalid account ID format")
});

export type UpdateAccountBodyValidator = z.infer<
  typeof updateAccountBodyValidator
>;
export type UpdateAccountIdValidator = z.infer<typeof updateAccountIdValidator>;
