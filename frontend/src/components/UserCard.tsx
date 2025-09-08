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

  return (
    <tr className={className}>
      <td className="py-4 px-4 text-sm text-gray-900 border-b border-gray-200">
        <Link
          href={`/posts?userId=${user.id}&userName=${encodeURIComponent(
            user.name
          )}&userEmail=${encodeURIComponent(user.email)}`}
          className=" transition-colors font-medium"
        >
          {user.name}
        </Link>
      </td>
      <td className="py-4 px-4 text-sm text-gray-700 border-b border-gray-200">
        {user.email.toLowerCase()}
      </td>

      <td className="py-4 px-4 text-sm text-gray-700 border-b border-gray-200 w-[392px] max-w-[392px]">
        <div className="truncate">
          {address
            ? `${address.street}, ${address.state}, ${address.city}, ${address.zipcode}`
            : "No address"}
        </div>
      </td>
    </tr>
  );
}
