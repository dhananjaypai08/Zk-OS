"use client";

import { useEffect, useState } from "react";
import { AkaveService, MIN_FILE_SIZE } from "../../utils/akave";
import { notification } from "~~/utils/scaffold-eth";
import { Spinner } from "~~/components/Spinner";

type UploadResponse = {
  Name: string;
  RootCID: string;
  Size: number;
};

export default function UploadPage() {
  const [apiUrl, setApiUrl] = useState("");
  const [metadata, setMetadata] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeBucket = async () => {
      try {
        await AkaveService.ensureBucketExists();
      } catch (error) {
        console.error("Failed to initialize bucket:", error);
        notification.error("Failed to initialize storage. Please try again later.");
      } finally {
        setIsInitializing(false);
      }
    };

    initializeBucket();
  }, []);

  const createJsonFile = (apiUrl: string, metadata: string): File => {
    const data = {
      api_url: apiUrl,
      metadata: metadata,
      timestamp: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(data, null, 2);
    const currentSize = new Blob([jsonString]).size;
    const paddedJson =
      new Blob([jsonString]).size < MIN_FILE_SIZE
        ? { ...data, padding: "X".repeat(MIN_FILE_SIZE) }
        : data;

    const finalJsonString = JSON.stringify(paddedJson, null, 2);
    const filename = `subgraph_${Date.now()}.json`;

    return new File([finalJsonString], filename, {
      type: "application/json",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const file = createJsonFile(apiUrl, metadata);
      const response = await AkaveService.uploadFile(file);
      
      if (!response?.data) {
        throw new Error("Upload failed - no response data");
      }

      setUploadedFile(response.data);
      notification.success("Subgraph data uploaded successfully!");
      setApiUrl("");
      setMetadata("");
    } catch (error) {
      console.error("Upload error:", error);
      notification.error(
        error instanceof Error 
          ? error.message 
          : "Failed to upload subgraph data. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] p-8">
      {/* Main container with terminal styling */}
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Multiple Glow Layers */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff9d] to-[#4AA8FF] opacity-20 blur-2xl rounded-2xl"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff9d] via-[#4AA8FF] to-[#00ff9d] opacity-40 blur-xl rounded-2xl"></div>

        {/* Terminal Window */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#00ff9d]">
          {/* Terminal Header */}
          <div className="bg-[#1c1c1c] px-4 py-3 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-inner" />
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-inner" />
              <div className="w-3 h-3 bg-[#27c93f] rounded-full shadow-inner" />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
              Store Subgraph on Avake
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* API URL Input */}
              <div className="transform transition-all duration-200">
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">Subgraph Endpoint *</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-10 blur group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
                  <input
                    type="url"
                    value={apiUrl}
                    onChange={e => setApiUrl(e.target.value)}
                    className="relative w-full px-4 py-3 bg-black border border-[#8fffad]/30 rounded-lg focus:outline-none focus:border-[#8fffad] text-[#4AA8FF] placeholder-[#4AA8FF]/50 transition-all duration-200"
                    placeholder="Enter subgraph link"
                    required
                  />
                </div>
              </div>

              {/* Metadata Input */}
              <div className="transform transition-all duration-200">
                <label className="block text-[#8fffad] mb-2 text-sm font-medium">Metadata *</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8fffad] to-[#4AA8FF] opacity-10 blur group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
                  <textarea
                    value={metadata}
                    onChange={e => setMetadata(e.target.value)}
                    className="relative w-full h-48 px-4 py-3 bg-black border border-[#8fffad]/30 rounded-lg focus:outline-none focus:border-[#8fffad] text-[#4AA8FF] placeholder-[#4AA8FF]/50 transition-all duration-200 resize-none"
                    placeholder="Enter metadata"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#8fffad]/10 to-[#4AA8FF]/10 text-[#8fffad] rounded-lg border border-[#8fffad]/30 hover:bg-gradient-to-r hover:from-[#8fffad]/20 hover:to-[#4AA8FF]/20 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Subgraph"
                )}
              </button>
            </form>
          </div>

          {uploadedFile && (
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl w-full sm:w-auto">
              <h3 className="text-xl font-bold mb-4">Upload Successful!</h3>
              <div className="space-y-4 w-full">
                <div className="text-left">
                  <p className="text-sm text-base-content/70 mb-1">File Name:</p>
                  <p className="font-mono text-sm break-all">{uploadedFile.Name}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-base-content/70 mb-1">CID:</p>
                  <p className="font-mono text-sm break-all">{uploadedFile.RootCID}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-base-content/70 mb-1">Download Link:</p>
                  <a
                    href={getDownloadUrl(uploadedFile.Name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm w-full"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Open File</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}