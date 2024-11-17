-- CreateTable
CREATE TABLE "tguestbook" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "message" VARCHAR(100) NOT NULL,
    "reaction" INTEGER NOT NULL,
    "created_at" DATE NOT NULL,

    CONSTRAINT "tguestbook_pkey" PRIMARY KEY ("id")
);

