-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "contractStatus" AS ENUM ('PENDING', 'DEPLOYED', 'PROCESSING', 'CANCELED', 'COMPLETED', 'LATED', 'VIOLATED');

-- CreateEnum
CREATE TYPE "DeployingStatus" AS ENUM ('PENDING', 'DEPLOYED', 'PROCESSING', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "indentifyNumber" TEXT NOT NULL,
    "addressWallet" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "PIN" TEXT,
    "emailVerifyToken" TEXT,
    "forgotPasswordToken" TEXT,
    "refreshToken" TEXT,
    "userStatus" "UserStatus" DEFAULT 'UNVERIFIED',
    "roleId" UUID,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" UUID NOT NULL,
    "contractTitle" TEXT NOT NULL,
    "addressWallet" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "blockAddress" TEXT NOT NULL,
    "gasPrices" JSON[],
    "parties" JSON[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "executeDate" TIMESTAMP(3),
    "agreements" TEXT[],
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
    "idUserSender" UUID NOT NULL,
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
    "contractId" UUID,

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

-- CreateTable
CREATE TABLE "Parties" (
    "id" UUID NOT NULL,
    "partyName" TEXT NOT NULL,
    "taxCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "paymentMethodId" UUID,

    CONSTRAINT "Parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyInfo" (
    "id" UUID NOT NULL,
    "representativeName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "contractId" UUID,
    "partiesId" UUID NOT NULL,

    CONSTRAINT "PartyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncludePermission" (
    "id" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "IncludePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "idBankId" UUID,
    "idCryptoId" UUID,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banking" (
    "id" UUID NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Banking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crypto" (
    "id" UUID NOT NULL,
    "addressWallet" TEXT NOT NULL,
    "chainName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeployStatus" (
    "id" UUID NOT NULL,
    "status" "DeployingStatus" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "DeployStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_indentifyNumber_key" ON "User"("indentifyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressWallet_key" ON "User"("addressWallet");

-- CreateIndex
CREATE UNIQUE INDEX "User_roleId_key" ON "User"("roleId");

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

-- CreateIndex
CREATE UNIQUE INDEX "Parties_id_key" ON "Parties"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Parties_partyName_key" ON "Parties"("partyName");

-- CreateIndex
CREATE UNIQUE INDEX "Parties_taxCode_key" ON "Parties"("taxCode");

-- CreateIndex
CREATE UNIQUE INDEX "Parties_email_key" ON "Parties"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parties_phoneNumber_key" ON "Parties"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PartyInfo_id_key" ON "PartyInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PartyInfo_phoneNumber_key" ON "PartyInfo"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PartyInfo_partiesId_key" ON "PartyInfo"("partiesId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_id_key" ON "Permission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IncludePermission_id_key" ON "IncludePermission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IncludePermission_roleId_key" ON "IncludePermission"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "IncludePermission_permissionId_key" ON "IncludePermission"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_id_key" ON "PaymentMethod"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_idBankId_key" ON "PaymentMethod"("idBankId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_idCryptoId_key" ON "PaymentMethod"("idCryptoId");

-- CreateIndex
CREATE UNIQUE INDEX "Banking_id_key" ON "Banking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Crypto_id_key" ON "Crypto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeployStatus_id_key" ON "DeployStatus"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttribute" ADD CONSTRAINT "ContractAttribute_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttributeValue" ADD CONSTRAINT "ContractAttributeValue_contractAttributeId_fkey" FOREIGN KEY ("contractAttributeId") REFERENCES "ContractAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttributeValue" ADD CONSTRAINT "ContractAttributeValue_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parties" ADD CONSTRAINT "Parties_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyInfo" ADD CONSTRAINT "PartyInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyInfo" ADD CONSTRAINT "PartyInfo_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyInfo" ADD CONSTRAINT "PartyInfo_partiesId_fkey" FOREIGN KEY ("partiesId") REFERENCES "Parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludePermission" ADD CONSTRAINT "IncludePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludePermission" ADD CONSTRAINT "IncludePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_idBankId_fkey" FOREIGN KEY ("idBankId") REFERENCES "Banking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_idCryptoId_fkey" FOREIGN KEY ("idCryptoId") REFERENCES "Crypto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
