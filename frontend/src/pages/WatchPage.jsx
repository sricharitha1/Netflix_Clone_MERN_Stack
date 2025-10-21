import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import API from "../utils/axios"; 
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});
	const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();
	const sliderRef = useRef(null);

	// ✅ Add console log here to debug
	console.log("contentType:", contentType, "id:", id);

	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await API.get(`/${contentType}/${id}/trailers`);
				setTrailers(res.data.trailers);
			} catch (error) {
				console.log("Trailer fetch error:", error.message);
				if (error.message.includes("404")) setTrailers([]);
			}
		};
		getTrailers();
	}, [contentType, id]);

	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await API.get(`/${contentType}/${id}/similar`);
				setSimilarContent(res.data.similar);
			} catch (error) {
				console.log("Similar fetch error:", error.message);
				if (error.message.includes("404")) setSimilarContent([]);
			}
		};
		getSimilarContent();
	}, [contentType, id]);

	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await API.get(`/${contentType}/${id}/details`);
				setContent(res.data.content);
			} catch (error) {
				console.log("Details fetch error:", error.message);
				if (error.message.includes("404")) setContent(null);
			} finally {
				setLoading(false);
			}
		};
		getContentDetails();
	}, [contentType, id]);

	// For now, show basic info to confirm
	if (loading) return <WatchPageSkeleton />;

	return (
		<div className="watch-page">
			<Navbar />
			<div className="video-section">
				{trailers?.length > 0 ? (
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx]?.key}`}
						controls
						width="100%"
						height="70vh"
					/>
				) : (
					<p className="text-center mt-10 text-gray-400">
						No trailer available for this content.
					</p>
				)}
			</div>
		</div>
	);
};

export default WatchPage;
