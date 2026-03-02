import { Client, Databases, Account, Storage, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export { Query };

// Types
export interface Component {
  $id: string;
  title: string;
  slug: string;
  code: string;
  instructions: string;
  images: string[];
  previewImage?: string;
  category: string;
  createdAt: string;
}

// Database constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;