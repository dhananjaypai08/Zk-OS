// utils/akave.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_AKAVE_API_URL || "http://localhost:8000";
const BUCKET_NAME = "zkos-subgraphs";

export class AkaveService {
  static async ensureBucketExists() {
    try {
      // First try to get the bucket
      const response = await axios.get(`${API_BASE_URL}/buckets/${BUCKET_NAME}`);
      if (response.status === 200) {
        console.log("Bucket already exists");
        return true;
      }
    } catch (error) {
      // If bucket doesn't exist, create it
      try {
        await axios.post(`${API_BASE_URL}/buckets`, { bucketName: BUCKET_NAME });
        console.log("Bucket created successfully");
        return true;
      } catch (createError) {
        console.error("Error creating bucket:", createError);
        throw createError;
      }
    }
  }

  static async uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_BASE_URL}/buckets/${BUCKET_NAME}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }
}

export const MIN_FILE_SIZE = 127; // bytes
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
