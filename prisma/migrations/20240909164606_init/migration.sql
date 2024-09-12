-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "awsAccountId" TEXT NOT NULL,
    "awsRootEmail" TEXT NOT NULL,
    "awsAccountType" TEXT NOT NULL,
    "awsServices" TEXT[],
    "onboardDate" TIMESTAMP(3) NOT NULL,
    "offboardDate" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
