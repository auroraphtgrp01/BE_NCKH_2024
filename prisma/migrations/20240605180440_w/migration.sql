/*
  Warnings:

  - You are about to drop the column `isWinnner` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "isWinnner",
ADD COLUMN     "winnerAddressWallet" TEXT;
