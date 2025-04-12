"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../_lib/contract";
import { teaSepolia } from "../../wagmi.config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function ConfessionCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Jumlah item per halaman

  // Read all confessions from contract
  const {
    data: confessions,
    isLoading,
    error
  } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getAllConfessions",
    chainId: teaSepolia.id,
  });

  // Pagination logic
  const totalItems = confessions?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConfessions = confessions?.slice(startIndex, endIndex) || [];

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  if (!confessions || confessions.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No confessions found. Be the first to share!
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption>List of Confessions (Total: {totalItems})</TableCaption>
        <TableHeader className="bg-accent-300">
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentConfessions.map((confession, index) => (
            <TableRow key={startIndex + index}>
              <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
              <TableCell className="truncate max-w-[100px]">
                {`${confession.sender.slice(0, 6)}...${confession.sender.slice(-4)}`}
              </TableCell>
              <TableCell>{confession.message}</TableCell>
              <TableCell className="text-right">
                {new Date(Number(confession.timestamp) * 1000).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-accent-300 border-t">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-accent-400'}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-md ${currentPage === page ? 'bg-accent-600 text-white' : 'text-gray-700 hover:bg-accent-400'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}