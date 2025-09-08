export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

export const createUserTemplate = `
INSERT INTO users (id, name, username, email, phone)
VALUES (?, ?, ?, ?, ?)
`;

export const selectUserByIdTemplate = `
SELECT *
FROM users
WHERE id = ?
LIMIT 1
`;

export const selectUsersWithAddressesTemplate = `
SELECT 
  u.id as user_id,
  u.name,
  u.username,
  u.email,
  u.phone,
  a.id as address_id,
  a.street,
  a.state,
  a.city,
  a.zipcode
FROM users u
LEFT JOIN addresses a ON u.id = a.user_id
ORDER BY u.name, a.id
LIMIT ?, ?
`;

export const selectAddressesByUserIdTemplate = `
SELECT *
FROM addresses
WHERE user_id = ?
ORDER BY id
`;

