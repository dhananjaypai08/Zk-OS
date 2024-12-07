"use client";

import { useEffect, useState } from "react";
import { AkaveService, MIN_FILE_SIZE } from "../../utils/akave";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { notification } from "~~/utils/scaffold-eth";

export default function UploadPage() {
  const [apiUrl, setApiUrl] = useState("");
  const [metadata, setMetadata] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Run this only once when the component mounts
  useEffect(() => {
    const initializeBucket = async () => {
      try {
        await AkaveService.ensureBucketExists();
      } catch (error) {
        console.error("Failed to initialize bucket:", error);
        notification.error("Failed to initialize storage. Please try again later.");
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

    // Convert to JSON string with formatting
    const jsonString = JSON.stringify(data, null, 2);

    // Add padding if needed to meet minimum size
    const currentSize = new Blob([jsonString]).size;
    const paddedJson =
      currentSize < MIN_FILE_SIZE ? { ...data, padding: "X".repeat(MIN_FILE_SIZE - currentSize + 10) } : data;

    const finalJsonString = JSON.stringify(paddedJson, null, 2);
    const filename = `subgraph-${Date.now()}.json`;

    return new File([finalJsonString], filename, {
      type: "application/json",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const file = createJsonFile(apiUrl, metadata);
      await AkaveService.uploadFile(file);

      notification.success("Subgraph data uploaded successfully!");
      setApiUrl("");
      setMetadata("");
    } catch (error) {
      console.error("Upload error:", error);
      notification.error("Failed to upload subgraph data. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">Upload Subgraph</span>
          <span className="block text-2xl mb-2">Submit your subgraph metadata</span>
        </h1>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md">
              <div className="flex flex-col gap-2">
                <label htmlFor="apiUrl" className="text-left text-lg">
                  API URL
                </label>
                <input
                  id="apiUrl"
                  type="url"
                  className="input input-bordered w-full"
                  placeholder="https://api.thegraph.com/subgraphs/name/..."
                  value={apiUrl}
                  onChange={e => setApiUrl(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="metadata" className="text-left text-lg">
                  Metadata
                </label>
                <textarea
                  id="metadata"
                  className="textarea w-full min-h-[200px]"
                  placeholder="Enter subgraph metadata..."
                  value={metadata}
                  onChange={e => setMetadata(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary w-full ${isUploading ? "loading" : ""}`}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
