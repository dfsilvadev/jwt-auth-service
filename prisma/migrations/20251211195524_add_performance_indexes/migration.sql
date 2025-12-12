-- CreateIndex
CREATE INDEX "idx_accounts_email_deleted" ON "accounts"("email", "deletedAt");

-- CreateIndex
CREATE INDEX "idx_accounts_status_deleted" ON "accounts"("status", "deletedAt");

-- CreateIndex
CREATE INDEX "idx_accounts_deleted" ON "accounts"("deletedAt");
