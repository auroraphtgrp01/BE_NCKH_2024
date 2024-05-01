-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "contractStatus" AS ENUM ('PENDING', 'PARTICIPATED', 'SIGNED', 'ENFORCE', 'COMPLETED', 'FAILED');

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
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "email" TEXT NOT NULL,
    "permission" JSONB NOT NULL,
    "contractId" UUID NOT NULL,
    "status" "ParticipantStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" UUID NOT NULL,
    "contractTitle" TEXT NOT NULL,
    "addressWallet" TEXT NOT NULL,
    "contractAddress" TEXT,
    "blockAddress" TEXT,
    "gasPrices" JSON[],
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "executeDate" TIMESTAMP(3),
    "agreements" TEXT[],
    "status" "contractStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateContract" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "TemplateContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractAttribute" (
    "id" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "index" INTEGER,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "contractId" UUID,
    "templateContractId" UUID,

    CONSTRAINT "ContractAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractAttributeValue" (
    "id" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "contractAttributeId" UUID NOT NULL,

    CONSTRAINT "ContractAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
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
    "updatedAt" TIMESTAMP(3),
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
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "IncludePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "taxCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "userId" UUID NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "suppliersId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" UUID NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" JSONB,
    "updatedBy" JSONB,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" JSONB,
    "suppliersId" UUID,
    "productsId" UUID,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Participant_id_key" ON "Participant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_key" ON "Participant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_id_key" ON "Contract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateContract_id_key" ON "TemplateContract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttribute_id_key" ON "ContractAttribute"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttributeValue_id_key" ON "ContractAttributeValue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContractAttributeValue_contractAttributeId_key" ON "ContractAttributeValue"("contractAttributeId");

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
CREATE UNIQUE INDEX "Suppliers_id_key" ON "Suppliers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_taxCode_key" ON "Suppliers"("taxCode");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_email_key" ON "Suppliers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_phoneNumber_key" ON "Suppliers"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Images_id_key" ON "Images"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttribute" ADD CONSTRAINT "ContractAttribute_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttribute" ADD CONSTRAINT "ContractAttribute_templateContractId_fkey" FOREIGN KEY ("templateContractId") REFERENCES "TemplateContract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractAttributeValue" ADD CONSTRAINT "ContractAttributeValue_contractAttributeId_fkey" FOREIGN KEY ("contractAttributeId") REFERENCES "ContractAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludePermission" ADD CONSTRAINT "IncludePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludePermission" ADD CONSTRAINT "IncludePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_suppliersId_fkey" FOREIGN KEY ("suppliersId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_suppliersId_fkey" FOREIGN KEY ("suppliersId") REFERENCES "Suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
