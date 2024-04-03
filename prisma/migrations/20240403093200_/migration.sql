/*
  Warnings:

  - Added the required column `agreement` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Made the column `gasPrice` on table `Contract` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "agreement" TEXT NOT NULL,
ALTER COLUMN "gasPrice" SET NOT NULL;
