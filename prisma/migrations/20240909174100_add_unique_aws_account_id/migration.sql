/*
  Warnings:

  - A unique constraint covering the columns `[awsAccountId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_awsAccountId_key" ON "Customer"("awsAccountId");
