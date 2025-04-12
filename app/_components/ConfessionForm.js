"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useReadContract, useAccount, useChainId } from "wagmi";
import { abi, contractAddress } from "../_lib/contract";
import { teaSepolia } from "../../wagmi.config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ConfessionForm() {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { address } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  // Read contract metadata
  const { data: contractName } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "name",
    chainId: teaSepolia.id
  });

  const { data: contractSymbol } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "symbol",
    chainId: teaSepolia.id
  });

  const { data: confessionCount } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "confessions",
    chainId: teaSepolia.id
  });

  const {
    writeContract,
    isPending,
    error: writeError,
    reset: resetWrite
  } = useWriteContract();

  const resetForm = () => {
    setMessage("");
    setErrorMessage("");
    setSuccessMessage("");
    resetWrite();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    resetForm();

    try {
      // Validasi
      if (!message.trim()) {
        throw new Error("Please enter a confession message");
      }

      if (!address) {
        throw new Error("Please connect your wallet");
      }

      if (chainId !== teaSepolia.id) {
        throw new Error(`Please switch to Tea Sepolia (Chain ID: ${teaSepolia.id})`);
      }

      const txHash = await writeContract({
        address: contractAddress,
        abi,
        functionName: "submitConfession",
        args: [message],
        account: address,
        chain: teaSepolia,
      });

      if (!txHash) {
        setSuccessMessage("Transaction is being processed");
        return;
      }
      // Jika berhasil
      setSuccessMessage(`✅ Transaction submitted!\nTx Hash: ${txHash}`);
      setMessage("");
      resetWrite();

    } catch (error) {
      console.error("Confession submission failed:", error);
      setErrorMessage(error.message || "Failed to submit confession");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-4">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {contractName || "Confession DApp"} ({contractSymbol || "CONF"})
          </h2>
          <p className="text-sm text-gray-600">
            {confessionCount !== undefined ? Number(confessionCount) : "..."} confessions submitted
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 rounded border border-gray-500 focus:border-accent-600 focus:ring-accent-600 transition text-black"
            placeholder="What's on your mind? (max 280 characters)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={280}
            required
            disabled={isPending || isProcessing}
          />

          <div className="flex justify-between items-center text-xs text-black">
            <span>{message.length}/280 characters</span>
            {writeError && (
              <span className="text-red-500">Error: {writeError.shortMessage || writeError.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-accent-400  text-white px-4 py-2 rounded hover:bg-accent-600 transition
              ${(isPending || isProcessing) ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={isPending || isProcessing || chainId !== teaSepolia.id || !message.trim()}
          >
            {(isPending || isProcessing) ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isPending ? "Confirm in wallet..." : "Processing..."}
              </span>
            ) : "Submit Confession"}
          </button>
        </form>
      </div>
    </>
  );
}