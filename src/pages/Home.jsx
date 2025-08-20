import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Star, Calendar, Clock, Tv } from 'lucide-react';
import MnavBar from '../components/MnavBar';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const animeData = [
    {
      id: 1,
      title: "Gachiakuta",
      spotlight: "#3 Spotlight",
      type: "TV",
      duration: "24m",
      releaseDate: "Jul 6, 2025",
      rating: "HD",
      tags: ["3", "3"],
      description: "Living in the slums of a wealthy town, Rudo and his foster father Regto try to coexist with the rest of the town's residents, but Rudo despises the wastefulness of the upper class. Ignoring the warnings from those around him, Rudo regularly rummages through the town's garbage in search of anything...",
      background: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/7090ec9557d74a18d25341a241ece786.jpg",
      image: "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/7090ec9557d74a18d25341a241ece786.jpg"
    },
    {
      id: 2,
      title: "Demon Slayer",
      spotlight: "#1 Spotlight",
      type: "TV",
      duration: "23m",
      releaseDate: "Apr 15, 2025",
      rating: "HD",
      tags: ["4.8", "5"],
      description: "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission...",
      background: "linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)",
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "Attack on Titan",
      spotlight: "#2 Spotlight",
      type: "TV",
      duration: "25m",
      releaseDate: "Mar 28, 2025",
      rating: "HD",
      tags: ["4.9", "5"],
      description: "When man-eating Titans first appeared 100 years ago, humans found safety behind massive walls that stopped the giants in their tracks. But the safety they have had for so long is threatened when a colossal Titan smashes through the barriers...",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      image: "/api/placeholder/800/400"
    },
    {
      id: 4,
      title: "Jujutsu Kaisen",
      spotlight: "#4 Spotlight",
      type: "TV",
      duration: "24m",
      releaseDate: "Oct 2, 2025",
      rating: "HD",
      tags: ["4.7", "4"],
      description: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul...",
      background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      image: "/api/placeholder/800/400"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
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

  const currentAnime = animeData[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {currentAnime.background.startsWith('http') ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentAnime.background})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </>
        ) : (
          <div style={{ background: currentAnime.background }}></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-8 flex items-center">
          {/* Left Content */}
          <div className="w-1/2 text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-purple-600 text-purple-100 text-sm font-medium rounded-full mb-2">
                {currentAnime.spotlight}
              </span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              {currentAnime.title}
            </h1>

            {/* Anime Info */}
            <div className="flex items-center space-x-6 mb-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Tv className="w-4 h-4" />
                <span className="text-sm">{currentAnime.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{currentAnime.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{currentAnime.releaseDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 bg-green-600 text-xs font-bold rounded">
                  {currentAnime.rating}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{currentAnime.tags[0]}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {currentAnime.description}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Now</span>
              </button>
              <button className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-gray-600 hover:border-gray-500">
                <Info className="w-5 h-5" />
                <span>Detail</span>
              </button>
            </div>
          </div>

          {/* Right Content - Character illustration area */}
          <div className="w-1/2 flex justify-end items-center">
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="text-white/60 text-8xl font-bold">
                  {currentAnime.title.charAt(0)}
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-blue-500/30 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Desktop (bottom right corner) */}
      <div className="hidden md:flex absolute bottom-8 right-8 z-20 space-x-3">
        <button 
          onClick={prevSlide}
          className="bg-blue  text-white p-3  transition-all duration-300 "
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="bg-blue  text-white p-3  transition-all duration-300 "
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators - Mobile/Tablet (right side) */}
      <div className="md:hidden absolute right-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3">
        {animeData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-purple-500 scale-125' 
                : 'bg-white bg-opacity-40 hover:bg-opacity-60'
            }`}
          />
        ))}
      </div>

      {/* Slide Indicators - Desktop (bottom center) */}
      {/* <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 space-x-3">
        {animeData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-purple-500 scale-125' 
                : 'bg-white bg-opacity-40 hover:bg-opacity-60'
            }`}
          />
        ))}
      </div> */}

      {/* Progress Bar */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30 z-20">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / animeData.length) * 100}%` }}
        />
      </div> */}
      
       <MnavBar/> 
    </div>
  );
};

export default Home;