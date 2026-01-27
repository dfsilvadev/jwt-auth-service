-- CreateTable
CREATE TABLE "roles_permissions" (
    "roleId" UUID NOT NULL,
    "permissionCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_permissions_pkey" PRIMARY KEY ("roleId","permissionCode")
);

-- CreateIndex
CREATE INDEX "roles_permissions_roleId_idx" ON "roles_permissions"("roleId");

-- CreateIndex
CREATE INDEX "roles_permissions_permissionCode_idx" ON "roles_permissions"("permissionCode");
