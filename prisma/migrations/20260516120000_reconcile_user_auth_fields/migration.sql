-- Align migration history with existing User auth fields in DB.
ALTER TABLE "User"
ADD COLUMN "login" TEXT,
ADD COLUMN "password_hash" TEXT;

CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
