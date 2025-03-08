-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "floors" INTEGER,
ADD COLUMN     "squareFootage" DOUBLE PRECISION,
ADD COLUMN     "yearBuilt" INTEGER;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "minLeaseTerm" INTEGER,
ADD COLUMN     "monthlyRent" DOUBLE PRECISION;
