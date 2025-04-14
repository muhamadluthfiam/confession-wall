"use client";

import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../_lib/contract";
import { teaSepolia } from "../../wagmi.config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function ConfessionCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: confessions,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getAllConfessions",
    chainId: teaSepolia.id,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15000);
    return () => clearInterval(interval);
  }, [refetch]);

  const sortedConfessions = [...(confessions || [])].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  const totalItems = sortedConfessions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConfessions = sortedConfessions.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded">
        Error loading confessions: {error.message}
      </div>
    );
  }

  if (confessions?.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No confessions found. Be the first to share!
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md border overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-2 sm:px-4 py-3 bg-accent-300 border-b">
        <span className="text-sm font-semibold text-primary-700">
          List of Confessions (Total: {totalItems})
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <button
            onClick={async () => {
              setIsRefreshing(true);
              await refetch();
              setIsRefreshing(false);
            }}
            disabled={isRefreshing}
            className={`text-sm px-4 py-1.5 rounded-md ${isRefreshing
                ? "bg-gray-400 text-white"
                : "bg-accent-600 hover:bg-accent-700 text-white"
              }`}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
          <span className="text-xs text-gray-500 italic text-end sm:text-left">
            Auto-refresh every 15s
          </span>
        </div>
      </div>

      {/* Grid */}
      <div
        className="grid gap-4 p-2 sm:p-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {currentConfessions.map((confession, index) => (
          <Card
            key={startIndex + index}
            className="shadow-md hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle className="text-base">
                🧑 {`${confession.sender.slice(0, 6)}...${confession.sender.slice(-5)}`}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
                #{startIndex + index + 1} •{" "}
                {new Date(Number(confession.timestamp) * 1000).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{confession.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-3 bg-accent-300 border-t">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
          {totalItems} entries
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {/* First */}
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-md text-sm ${currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-accent-400"
              }`}
          >
            First
          </button>

          {/* Prev */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-accent-400"
              }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dynamic Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return true;
              }
              return false;
            })
            .map((page, idx, arr) => {
              const prev = arr[idx - 1];
              const showEllipsis = prev && page - prev > 1;

              return (
                <React.Fragment key={page}>
                  {showEllipsis && <span className="px-1">...</span>}
                  <button
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-md text-sm ${currentPage === page
                        ? "bg-accent-600 text-white"
                        : "text-gray-700 hover:bg-accent-400"
                      }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          {/* Next */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-accent-400"
              }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Last */}
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-md text-sm ${currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-accent-400"
              }`}
          >
            Last
          </button>
        </div>
      </div>
    </div>

  );
}
