import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ TMDB fetch error:", error.response?.data || error.message);
    throw new Error(
      `Failed to fetch data from TMDB: ${error.response?.statusText || error.message}`
    );
  }
};
