-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "position" VARCHAR,
    "aboutMe" VARCHAR,
    "works" JSONB[],
    "education" JSONB[],
    "projects" JSONB[],
    "contact" JSONB[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
