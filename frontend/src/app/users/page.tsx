"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUsers, useUsersCount } from "@/hooks/useUsers";
import { User } from "@/types";
import { calculatePagination, getPaginationIndices } from "@/utils/pagination";
import { ErrorState } from "@/components/ErrorState";
import { UserCard } from "@/components/UserCard";
import { Pagination } from "@/components/Pagination";
import Loader from "@/components/Loader";

const queryClient = new QueryClient();

export default function UsersPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersTable />
    </QueryClientProvider>
  );
}

function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const { data: countData } = useUsersCount();
  const { isPending, error, data: allUsers = [] } = useUsers();

  if (error) {
    return (
      <ErrorState
        title="Error loading users"
        message={error.message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const totalCount = countData?.count || 0;
  const pagination = calculatePagination(currentPage, totalCount, usersPerPage);
  const { startIndex, endIndex } = getPaginationIndices(
    currentPage,
    usersPerPage
  );
  const currentUsers = allUsers.slice(startIndex, endIndex);

  return (
    <div className="flex justify-center">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-semibold text-gray-900 text-3xl">Users</h1>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-sm text-gray-700 border-gray-200 w-1/4 font-normal"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-sm text-gray-700 border-gray-200 w-1/3 font-normal"
                  >
                    Email Address
                  </th>

                  <th
                    scope="col"
                    className="py-4 px-4 text-left text-sm text-gray-700 border-gray-200 w-1/6 font-normal"
                  >
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {isPending ? (
                  <tr>
                    <td colSpan={5} className="py-12">
                      <div className="flex justify-center">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {countData && countData.count > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              totalItems={totalCount}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={setCurrentPage}
              isLoading={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
