import dotenv from "dotenv";
import path from "path";

// ✅ explicitly load backend/.env file
dotenv.config({ path: path.resolve("backend/.env") });

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 9000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
