-- name: CreateUser :one
INSERT INTO "User" (
    name,
    email,
    password,
    imageUrl
)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: CreateOAuthUser :one
INSERT INTO "User" (
    name,
    email,
    imageUrl,
    provider,
    providerAccountId,
    emailVerified
)
VALUES ($1, $2, $3, $4, $5, true)
RETURNING *;

-- name: GetUserByEmail :one
SELECT *
FROM "User"
WHERE email = $1;

-- name: GetUserByProviderAccount :one
SELECT *
FROM "User"
WHERE provider = $1
  AND providerAccountId = $2;

-- name: UpdateUserEmailVerified :one
UPDATE "User"
SET emailVerified = true
WHERE id = $1
RETURNING *;

-- name: GetUserById :one
SELECT *
FROM "User"
WHERE id = $1;

-- name: UpdateUserLastLogin :one
UPDATE "User"
SET lastLogin = now()
WHERE id = $1
RETURNING lastLogin;
