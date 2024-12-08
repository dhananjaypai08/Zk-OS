"use client";

import { useEffect, useState } from "react";
import { AkaveService, MIN_FILE_SIZE } from "../../utils/akave";
import { BugAntIcon, DocumentArrowUpIcon, LinkIcon } from "@heroicons/react/24/outline";
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

    // Convert to JSON string with formatting
    const jsonString = JSON.stringify(data, null, 2);

    // Add padding if needed to meet minimum size
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

  const getDownloadUrl = (fileName: string) => {
    return `http://localhost:8000/buckets/zkos-subgraphs/files/${fileName}/download`;
  };

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-lg">Initializing storage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">Upload Subgraph</span>
          <span className="block text-2xl mb-2">Submit your subgraph metadata</span>
        </h1>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-start gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl w-full sm:w-auto">
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
                  disabled={isUploading}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="metadata" className="text-left text-lg">
                  Metadata
                </label>
                <textarea
                  id="metadata"
                  className="textarea textarea-bordered w-full min-h-[120px]"
                  placeholder="Enter subgraph metadata..."
                  value={metadata}
                  onChange={e => setMetadata(e.target.value)}
                  required
                  disabled={isUploading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <DocumentArrowUpIcon className="h-5 w-5" />
                    <span>Submit</span>
                  </>
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