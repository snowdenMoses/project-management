/*
  Warnings:

  - You are about to drop the column `price` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `phone_number` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories_projects" DROP CONSTRAINT "categories_projects_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categories_projects" DROP CONSTRAINT "categories_projects_project_id_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_project_id_fkey";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "price",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "categories_projects";

-- DropTable
DROP TABLE "images";
