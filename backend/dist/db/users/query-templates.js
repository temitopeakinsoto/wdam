"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAddressesByUserIdTemplate = exports.selectUsersWithAddressesTemplate = exports.selectUserByIdTemplate = exports.createUserTemplate = exports.selectCountOfUsersTemplate = exports.selectUsersTemplate = void 0;
exports.selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;
exports.selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;
exports.createUserTemplate = `
INSERT INTO users (id, name, username, email, phone)
VALUES (?, ?, ?, ?, ?)
`;
exports.selectUserByIdTemplate = `
SELECT *
FROM users
WHERE id = ?
LIMIT 1
`;
exports.selectUsersWithAddressesTemplate = `
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
exports.selectAddressesByUserIdTemplate = `
SELECT *
FROM addresses
WHERE user_id = ?
ORDER BY id
`;
