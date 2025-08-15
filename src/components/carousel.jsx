import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Star, Calendar, Clock, Tv } from 'lucide-react';
import MnavBar from '../components/MnavBar';

// Fetch AniList Banner
async function getAniListBanner(title) {
    const query = `
        query ($search: String) {
            Media(search: $search, type: ANIME) {
                bannerImage
            }
        }
    `;
    const variables = { search: title };

    const res = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    });

    const data = await res.json();
    return data.data?.Media?.bannerImage || null;
}

const Carousel = () => {
    const [animeData, setAnimeData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Fetch data from Jikan + AniList banners
    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=5');
                const data = await res.json();

                const enriched = await Promise.all(
                    data.data.map(async (anime) => {
                        const banner = await getAniListBanner(anime.title);
                        return { ...anime, bannerImage: banner };
                    })
                );

                setAnimeData(enriched);
            } catch (err) {
                console.error("Error fetching anime:", err);
            }
        };
        fetchAnime();
    }, []);

    // Auto-play effect
    useEffect(() => {
        if (!isAutoPlaying || animeData.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % animeData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, animeData.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % animeData.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + animeData.length) % animeData.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    if (animeData.length === 0) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    const currentAnime = animeData[currentSlide];

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                <img
                    src={currentAnime.bannerImage || currentAnime.images.jpg.large_image_url}
                    alt={currentAnime.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center h-full">
                <div className="container mx-auto px-8 flex flex-col md:flex-row items-center">
                    {/* Left Content */}
                    <div className="md:w-1/2 text-white">
                        <span className="inline-block px-3 py-1 bg-purple-600 text-purple-100 text-sm font-medium rounded-full mb-4">
                            #{currentSlide + 1} Spotlight
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">{currentAnime.title}</h1>

                        {/* Anime Info */}
                        <div className="flex flex-wrap gap-4 mb-6 text-gray-300">
                            <div className="flex items-center space-x-2">
                                <Tv className="w-4 h-4" />
                                <span className="text-sm">{currentAnime.type}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{currentAnime.duration || 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{currentAnime.aired?.string || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{currentAnime.score || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
                            {currentAnime.synopsis?.slice(0, 250) + '...'}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button className="flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
                                <Play className="w-5 h-5" />
                                <span>Watch Now</span>
                            </button>
                            <button className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
                                <Info className="w-5 h-5" />
                                <span>Detail</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Poster */}
                    <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
                        <img
                            src={currentAnime.images.jpg.large_image_url}
                            alt={currentAnime.title}
                            className="max-h-[90vh] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 z-20 flex space-x-3">
                <button onClick={prevSlide} className="bg-black bg-opacity-50 text-white p-3 rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="bg-black bg-opacity-50 text-white p-3 rounded-full">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                {animeData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-purple-500 scale-125' : 'bg-white bg-opacity-40'}`}
                    />
                ))}
            </div>

            <MnavBar />
        </div>
    );
};

export default Carousel;
