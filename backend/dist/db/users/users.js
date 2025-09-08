"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersWithAddresses = exports.getAddressesByUserId = exports.getUserById = exports.getUsers = exports.getUsersCount = void 0;
const connection_1 = require("../connection");
const query_templates_1 = require("./query-templates");
const getUsersCount = () => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectCountOfUsersTemplate, (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results.count);
    });
});
exports.getUsersCount = getUsersCount;
const getUsers = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUsersTemplate, [pageNumber * pageSize, pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getUsers = getUsers;
const getUserById = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.get(query_templates_1.selectUserByIdTemplate, [userId], (error, result) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(result || null);
        }
    });
});
exports.getUserById = getUserById;
const getAddressesByUserId = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectAddressesByUserIdTemplate, [userId], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results || []);
    });
});
exports.getAddressesByUserId = getAddressesByUserId;
const getUsersWithAddresses = (pageNumber, pageSize) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_templates_1.selectUsersWithAddressesTemplate, [pageNumber * pageSize, pageSize], (error, results) => {
        if (error) {
            reject(error);
        }
        // Group the results by user
        const usersMap = new Map();
        results.forEach((row) => {
            const userId = row.user_id;
            if (!usersMap.has(userId)) {
                usersMap.set(userId, {
                    id: userId,
                    name: row.name,
                    username: row.username,
                    email: row.email,
                    phone: row.phone,
                    addresses: [],
                });
            }
            // Add address if it exists
            if (row.address_id) {
                const user = usersMap.get(userId);
                user.addresses.push({
                    id: row.address_id,
                    user_id: userId,
                    street: row.street,
                    state: row.state,
                    city: row.city,
                    zipcode: row.zipcode,
                });
            }
        });
        resolve(Array.from(usersMap.values()));
    });
});
exports.getUsersWithAddresses = getUsersWithAddresses;
