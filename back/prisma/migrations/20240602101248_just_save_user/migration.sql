/*
  Warnings:

  - You are about to drop the column `email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `seriesId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedMovies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedSeries` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_genresId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_genresId_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedMovies" DROP CONSTRAINT "_UserLikedMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedMovies" DROP CONSTRAINT "_UserLikedMovies_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedSeries" DROP CONSTRAINT "_UserLikedSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedSeries" DROP CONSTRAINT "_UserLikedSeries_B_fkey";

-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "email",
DROP COLUMN "lastName",
DROP COLUMN "name",
DROP COLUMN "seriesId",
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Genres";

-- DropTable
DROP TABLE "Movies";

-- DropTable
DROP TABLE "Series";

-- DropTable
DROP TABLE "_UserLikedMovies";

-- DropTable
DROP TABLE "_UserLikedSeries";

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
