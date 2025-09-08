// Shared type definitions for the application

export interface Address {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Post {
  id: string;
  title: string;
  body: string;
  user_id: string;
  created_at: string;
}

export interface NewPost {
  title: string;
  content: string;
}

export interface UsersCount {
  count: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
