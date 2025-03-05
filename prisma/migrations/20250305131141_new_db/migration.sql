/*
  Warnings:

  - The `jsonMockResp` column on the `MockInterviewAnswer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MockInterviewAnswer" DROP COLUMN "jsonMockResp",
ADD COLUMN     "jsonMockResp" JSONB[];
