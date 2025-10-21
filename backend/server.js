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

// ✅ 1. Correct CORS placement (before routes)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://netflix-clone-mern-stack-lyart.vercel.app",
    ],
    credentials: true, // ✅ allows cookies to be sent
  })
);

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// ✅ 2. Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ 3. Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// ✅ 4. Static frontend serving (only in production)
if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
