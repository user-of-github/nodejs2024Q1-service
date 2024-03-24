-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritesAlbums" (
    "id" TEXT NOT NULL DEFAULT 'favorite-albums',
    "albums" TEXT[],

    CONSTRAINT "FavoritesAlbums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritesArtists" (
    "id" TEXT NOT NULL DEFAULT 'favorite-artists',
    "artists" TEXT[],

    CONSTRAINT "FavoritesArtists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritesTracks" (
    "id" TEXT NOT NULL DEFAULT 'favorite-tracks',
    "tracks" TEXT[],

    CONSTRAINT "FavoritesTracks_pkey" PRIMARY KEY ("id")
);
