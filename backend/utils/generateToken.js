import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-netflix", token, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === "production", // ✅ true only in production
    sameSite: ENV_VARS.NODE_ENV === "production" ? "none" : "lax", // ✅ allows dev cookies
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: "/", // ✅ optional but safer
  });

  return token;
};
