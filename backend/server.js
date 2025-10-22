import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const __dirname = path.resolve();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Allow both local and deployed frontends
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://netflix-clone-mern-stack-lyart.vercel.app", // your Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// ✅ Serve frontend (optional for production full-stack deploy on Render)
// Uncomment this only if you’re hosting frontend build on the same server
// if (ENV_VARS.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

const PORT = process.env.PORT || ENV_VARS.PORT || 9000;

// ✅ Connect to MongoDB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(✅ Server running on http://localhost:${PORT});
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });