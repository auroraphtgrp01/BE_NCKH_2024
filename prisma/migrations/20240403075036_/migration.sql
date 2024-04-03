/*
  Warnings:

  - You are about to drop the column `contractTypeId` on the `Parties` table. All the data in the column will be lost.
  - You are about to drop the `Constract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContractType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Parties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "contractStatus" AS ENUM ('PENDING', 'DEPLOYED', 'PROCESSING', 'CANCELED', 'COMPLETED', 'LATED', 'VIOLATED');

-- DropForeignKey
ALTER TABLE "Parties" DROP CONSTRAINT "Parties_contractTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Parties" DROP CONSTRAINT "Parties_paymentMethodId_fkey";

-- DropIndex
DROP INDEX "Parties_contractTypeId_key";

-- DropIndex
DROP INDEX "Parties_paymentMethodId_key";

-- AlterTable
ALTER TABLE "Parties" DROP COLUMN "contractTypeId",
ADD COLUMN     "contractId" UUID,
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "paymentMethodId" DROP NOT NULL;

-- DropTable
DROP TABLE "Constract";

-- DropTable
DROP TABLE "ContractType";

-- CreateTable
CREATE TABLE "Contract" (
    "id" UUID NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "blockAddress" TEXT NOT NULL,
    "gasPrice" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "executeDate" TIMESTAMP(3),
    "status" "contractStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" UUID NOT NULL,
    "idPartySend" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "contractId" UUID,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractAttribute" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "ContractAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractAttributeValue" (
    "id" UUID NOT NULL,
    "contractAttributeId" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "ContractAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_id_key" ON "Contract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_id_key" ON "Invitation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttribute_id_key" ON "ContractAttribute"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttributeValue_id_key" ON "ContractAttributeValue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttributeValue_contractAttributeId_key" ON "ContractAttributeValue"("contractAttributeId");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttributeValue_contractId_key" ON "ContractAttributeValue"("contractId");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttributeValue" ADD CONSTRAINT "ContractAttributeValue_contractAttributeId_fkey" FOREIGN KEY ("contractAttributeId") REFERENCES "ContractAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttributeValue" ADD CONSTRAINT "ContractAttributeValue_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parties" ADD CONSTRAINT "Parties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parties" ADD CONSTRAINT "Parties_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parties" ADD CONSTRAINT "Parties_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
