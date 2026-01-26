-- CreateEnum
CREATE TYPE "account_roles" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "role" "account_roles" NOT NULL DEFAULT 'USER';
