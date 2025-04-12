"use client";

import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../_lib/contract";
import { teaSepolia } from "../../wagmi.config";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function ConfessionCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data dari smart contract
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

  // Auto-refresh setiap 15 detik
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 15000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Urutkan data terbaru di atas (asumsi ada properti timestamp)
  const sortedConfessions = [...(confessions || [])].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  // Pagination logic
  const totalItems = sortedConfessions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConfessions = sortedConfessions.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

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
    <div className="border rounded-lg overflow-hidden">
      {/* Header + Tombol Refresh */}
      <div className="flex justify-between items-center px-4 py-3 bg-accent-300 border-b">
        <span className="text-sm font-semibold text-primary-700">
          List of Confessions (Total: {totalItems})
        </span>
        <div className="flex flex-col items-end gap-1">
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
          <span className="text-xs text-gray-500 italic">
            Auto-refresh every 15s
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {currentConfessions.map((confession, index) => (
          <Card key={startIndex + index} className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-base">
                🧑 {`${confession.sender.slice(0, 6)}...${confession.sender.slice(-5)}`}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
                #{startIndex + index + 1} • {new Date(Number(confession.timestamp) * 1000).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{confession.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-accent-300 border-t">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
        <div className="flex space-x-2">
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-md ${currentPage === page
                ? "bg-accent-600 text-white"
                : "text-gray-700 hover:bg-accent-400"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-200"
              }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
