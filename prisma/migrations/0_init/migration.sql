-- CreateTable
CREATE TABLE "tguestbook" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "message" VARCHAR(100) NOT NULL,
    "reaction" INTEGER NOT NULL,
    "created_at" DATE NOT NULL,

    CONSTRAINT "tguestbook_pkey" PRIMARY KEY ("id")
);
-- insert dummy data

INSERT INTO public.tguestbook
("name", message, reaction, created_at)
VALUES('Abby', 'WOOOOOOOOOOOOOOOOOOOOOOO AHAHAHAHAHAHAHAAAAAAA', 0, '1992-02-11');
INSERT INTO public.tguestbook
("name", message, reaction, created_at)
VALUES('stinky', 'shit sucks', 2, '2008-02-11');
INSERT INTO public.tguestbook
("name", message, reaction, created_at)
VALUES('Is it working?', 'Postgre?', 1, '2024-11-17');
INSERT INTO public.tguestbook
("name", message, reaction, created_at)
VALUES('dummy data', 'this data is for dummies', 1, '2024-11-17');
