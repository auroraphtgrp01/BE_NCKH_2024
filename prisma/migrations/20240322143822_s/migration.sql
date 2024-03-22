/*
  Warnings:

  - A unique constraint covering the columns `[indentifyNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressWallet]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_indentifyNumber_key" ON "User"("indentifyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressWallet_key" ON "User"("addressWallet");
