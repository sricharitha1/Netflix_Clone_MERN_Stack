import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import API from "../utils/axios"; // ✅ custom axios instance

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			try {
				// ✅ use API instead of axios, and remove /api/v1 prefix
				const res = await API.get(`/${contentType}/trending`);
				setTrendingContent(res.data.content);
			} catch (error) {
				console.error("Error fetching trending content:", error);
				setTrendingContent([]);
			}
		};

		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};

export default useGetTrendingContent;
