"use client";

import { useState, useMemo, useCallback } from "react";
import { useUsers, useUsersCount } from "@/hooks/useUsers";
import { User } from "@/types";
import { calculatePagination, getPaginationIndices } from "@/utils/pagination";
import { ErrorState } from "@/components/ErrorState";
import { UserCard } from "@/components/UserCard";
import { Pagination } from "@/components/Pagination";
import Loader from "@/components/Loader";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const { data: countData } = useUsersCount();
  const { isPending, error, data: allUsers = [] } = useUsers();
  const paginationData = useMemo(() => {
    const totalCount = countData?.count || 0;
    const pagination = calculatePagination(
      currentPage,
      totalCount,
      usersPerPage
    );
    const { startIndex, endIndex } = getPaginationIndices(
      currentPage,
      usersPerPage
    );
    const currentUsers = allUsers.slice(startIndex, endIndex);

    return {
      totalCount,
      pagination,
      startIndex,
      endIndex,
      currentUsers,
    };
  }, [currentPage, countData?.count, allUsers, usersPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  if (error) {
    return (
      <ErrorState
        title="Error loading users"
        message={error.message}
        onRetry={handleRetry}
      />
    );
  }

  const { totalCount, pagination, startIndex, endIndex, currentUsers } =
    paginationData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
      <div className="flex justify-center">
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Users
              </h1>
              <p className="text-sm text-gray-700">
                A list of all users with their details and contact information.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left text-sm font-medium text-gray-900 w-1/4"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left text-sm font-medium text-gray-900 w-1/3"
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left text-sm font-medium text-gray-900 w-5/12"
                    >
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isPending ? (
                    <tr>
                      <td colSpan={3} className="py-12">
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
                onPageChange={handlePageChange}
                isLoading={isPending}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
