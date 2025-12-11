import z from "zod";

export const deleteAccountValidator = z.object({
  accountId: z.string().uuid("Invalid account ID format")
});

export type DeleteAccountValidator = z.infer<typeof deleteAccountValidator>;
