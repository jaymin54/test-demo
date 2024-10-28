-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNo" TEXT,
    "email" TEXT,
    "address" TEXT,
    "type" TEXT,
    "pixel" TEXT,
    "height" TEXT,
    "length" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
