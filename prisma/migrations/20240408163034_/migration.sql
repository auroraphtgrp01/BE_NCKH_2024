/*
  Warnings:

  - You are about to drop the column `agreement` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `gasPrice` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `indentifyNumber` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `parytyName` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `representativeName` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the column `taxCode` on the `Parties` table. All the data in the column will be lost.
  - Added the required column `addressWallet` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractTitle` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPartyInfo` to the `Parties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parties" DROP CONSTRAINT "Parties_userId_fkey";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "agreement",
DROP COLUMN "gasPrice",
ADD COLUMN     "addressWallet" TEXT NOT NULL,
ADD COLUMN     "agreements" TEXT[],
ADD COLUMN     "contractTitle" TEXT NOT NULL,
ADD COLUMN     "gasPrices" JSONB[],
ADD COLUMN     "parties" JSON[];

-- AlterTable
ALTER TABLE "ContractAttribute" ADD COLUMN     "contractId" UUID;

-- AlterTable
ALTER TABLE "Parties" DROP COLUMN "address",
DROP COLUMN "description",
DROP COLUMN "email",
DROP COLUMN "indentifyNumber",
DROP COLUMN "parytyName",
DROP COLUMN "phoneNumber",
DROP COLUMN "position",
DROP COLUMN "representativeName",
DROP COLUMN "taxCode",
ADD COLUMN     "idPartyInfo" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PartyInfo" (
    "id" UUID NOT NULL,
    "partyName" TEXT NOT NULL,
    "representativeName" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "taxCode" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "indentifyNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "PartyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartyInfo_id_key" ON "PartyInfo"("id");

-- AddForeignKey
ALTER TABLE "ContractAttribute" ADD CONSTRAINT "ContractAttribute_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parties" ADD CONSTRAINT "Parties_idPartyInfo_fkey" FOREIGN KEY ("idPartyInfo") REFERENCES "PartyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parties" ADD CONSTRAINT "Parties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyInfo" ADD CONSTRAINT "PartyInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
