// Dotenv
import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;

export const JWT_SECRET = process.env.JWT_SECRET;

// Cloudinary
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

/*

  cloud_name,
  api_key,
  api_secret*/

// API Base URL
export const getUrl = (url: string) =>
  `/api/v1/${url.startsWith("/") ? url.slice(1) : url}`;
