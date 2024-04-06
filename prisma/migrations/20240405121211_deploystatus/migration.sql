-- CreateEnum
CREATE TYPE "DeployingStatus" AS ENUM ('PENDING', 'DEPLOYED', 'PROCESSING', 'FAILED');

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
CREATE UNIQUE INDEX "DeployStatus_id_key" ON "DeployStatus"("id");
