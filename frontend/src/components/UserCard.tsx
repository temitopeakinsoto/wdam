import React from "react";
import { User } from "@/types";
import Link from "next/link";

interface UserCardProps {
  user: User;
  postsCount?: number;
  className?: string;
}

export function UserCard({ user, postsCount, className = "" }: UserCardProps) {
  const address = user.addresses?.[0];
  const userPostsUrl = `/posts?userId=${user.id}&userName=${encodeURIComponent(
    user.name
  )}&userEmail=${encodeURIComponent(user.email)}`;

  return (
    <tr
      className={`hover:bg-gray-50 transition-colors cursor-pointer ${className}`}
    >
      <td className="py-4 px-4">
        <Link
          href={userPostsUrl}
          className="block text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          {user.name}
        </Link>
      </td>
      <td className="py-4 px-4">
        <Link
          href={userPostsUrl}
          className="block text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          {user.email.toLowerCase()}
        </Link>
      </td>
      <td className="py-4 px-4 w-[392px] max-w-[392px]">
        <Link
          href={userPostsUrl}
          className="block text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          <div className="truncate">
            {address
              ? `${address.street}, ${address.state}, ${address.city}, ${address.zipcode}`
              : "No address"}
          </div>
        </Link>
      </td>
    </tr>
  );
}
