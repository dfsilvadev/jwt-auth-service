import z from "zod";

export const getAccountValidator = z.object({
  accountId: z.string().uuid("Invalid account ID format")
});

export type GetAccountValidator = z.infer<typeof getAccountValidator>;
