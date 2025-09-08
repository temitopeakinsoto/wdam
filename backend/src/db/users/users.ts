import { connection } from "../connection";


import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
  createUserTemplate,
  selectUserByIdTemplate,
  selectUsersWithAddressesTemplate,
  selectAddressesByUserIdTemplate,
} from "./query-templates";
import { User, Address } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });



export const getUserById = (userId: string): Promise<User | null> =>
  new Promise((resolve, reject) => {
    connection.get<User>(
      selectUserByIdTemplate,
      [userId],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result || null);
        }
      }
    );
  });

export const getAddressesByUserId = (userId: string): Promise<Address[]> =>
  new Promise((resolve, reject) => {
    connection.all<Address>(
      selectAddressesByUserIdTemplate,
      [userId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results || []);
      }
    );
  });

export const getUsersWithAddresses = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<any>(
      selectUsersWithAddressesTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }

        // Group the results by user
        const usersMap = new Map<string, User>();
        
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
            const user = usersMap.get(userId)!;
            user.addresses!.push({
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
      }
    );
  });
