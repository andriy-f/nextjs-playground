-- CreateTable
CREATE TABLE "UserTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToUserTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserTag_AB_unique" ON "_UserToUserTag"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserTag_B_index" ON "_UserToUserTag"("B");

-- AddForeignKey
ALTER TABLE "_UserToUserTag" ADD CONSTRAINT "_UserToUserTag_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserTag" ADD CONSTRAINT "_UserToUserTag_B_fkey" FOREIGN KEY ("B") REFERENCES "UserTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
