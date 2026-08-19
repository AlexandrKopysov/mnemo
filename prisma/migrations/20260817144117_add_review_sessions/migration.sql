-- CreateEnum
CREATE TYPE "ReviewSessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "ReviewAnswer" AS ENUM ('HARD', 'NORMAL', 'EASY');

-- CreateTable
CREATE TABLE "ReviewSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalCards" INTEGER NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    "hardCount" INTEGER NOT NULL DEFAULT 0,
    "normalCount" INTEGER NOT NULL DEFAULT 0,
    "easyCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ReviewSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ReviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewSessionItem" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "cardId" TEXT,
    "deckId" TEXT,
    "position" INTEGER NOT NULL,
    "answer" "ReviewAnswer",
    "answeredAt" TIMESTAMP(3),
    "cardFront" TEXT NOT NULL,
    "cardBack" TEXT NOT NULL,
    "deckTitle" TEXT NOT NULL,

    CONSTRAINT "ReviewSessionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewSession_userId_status_idx" ON "ReviewSession"("userId", "status");

-- CreateIndex
CREATE INDEX "ReviewSession_userId_startedAt_idx" ON "ReviewSession"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "ReviewSessionItem_cardId_idx" ON "ReviewSessionItem"("cardId");

-- CreateIndex
CREATE INDEX "ReviewSessionItem_deckId_idx" ON "ReviewSessionItem"("deckId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewSessionItem_sessionId_position_key" ON "ReviewSessionItem"("sessionId", "position");

-- AddForeignKey
ALTER TABLE "ReviewSession" ADD CONSTRAINT "ReviewSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSessionItem" ADD CONSTRAINT "ReviewSessionItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ReviewSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSessionItem" ADD CONSTRAINT "ReviewSessionItem_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewSessionItem" ADD CONSTRAINT "ReviewSessionItem_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
