/*
  Warnings:

  - You are about to drop the `_CategoryToproject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToproject" DROP CONSTRAINT "_CategoryToproject_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToproject" DROP CONSTRAINT "_CategoryToproject_B_fkey";

-- DropTable
DROP TABLE "_CategoryToproject";

-- CreateTable
CREATE TABLE "categories_projects" (
    "category_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "categories_projects_pkey" PRIMARY KEY ("category_id","project_id")
);

-- AddForeignKey
ALTER TABLE "categories_projects" ADD CONSTRAINT "categories_projects_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_projects" ADD CONSTRAINT "categories_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
