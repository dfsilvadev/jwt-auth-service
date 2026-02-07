/*
  Warnings:

  - The `name` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'USER', 'MODERATOR', 'TESTER');

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "name",
ADD COLUMN     "name" "RoleName" NOT NULL DEFAULT 'TESTER';

-- CreateIndex
CREATE INDEX "roles_name_idx" ON "roles"("name");
