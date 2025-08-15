import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Hnav() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    
    useEffect(() => {
        if (!isDropdownOpen) return;
        const handleClick = (e) => !dropdownRef.current?.contains(e.target) && setIsDropdownOpen(false);
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isDropdownOpen]);
 
    return (
        <div className="navbar bg-base-100 shadow-sm relative z-50 justify-center">
            {/* MOBILE DROPDOWN */}
            <div className="absolute left-4 top-2 lg:hidden" ref={dropdownRef}>
                <button
                    className={`btn btn-ghost flex items-center gap-2 ${
                        isDropdownOpen ? "text-yellow-500" : ""
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${isDropdownOpen ? "text-yellow-500" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    <span className={`text-sm font-medium ${isDropdownOpen ? "text-yellow-500" : ""}`}>Menu</span>
                </button>
                
                {/* DROPDOWN CONTENT - Styled like your image */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[95vw] max-w-sm bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden z-50">
                        <div className="py-3">
                            <Link 
                                to="/home" 
                                className="block px-6 py-4 text-white text-base font-medium text-center hover:bg-gray-800 hover:bg-opacity-70 transition-colors duration-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/movies" 
                                className="block px-6 py-4 text-white text-base font-medium text-center hover:bg-gray-800 hover:bg-opacity-70 transition-colors duration-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Movies
                            </Link>
                            <Link 
                                to="/tv-series" 
                                className="block px-6 py-4 text-white text-base font-medium text-center hover:bg-gray-800 hover:bg-opacity-70 transition-colors duration-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                TV Series
                            </Link>
                            <Link 
                                to="/most-popular" 
                                className="block px-6 py-4 text-white text-base font-medium text-center hover:bg-gray-800 hover:bg-opacity-70 transition-colors duration-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Most Popular
                            </Link>
                            <Link 
                                to="/top-airing" 
                                className="block px-6 py-4 text-white text-base font-medium text-center hover:bg-gray-800 hover:bg-opacity-70 transition-colors duration-200"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Top Airing
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            
            {/* DESKTOP NAV CENTERED */}
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/movies">Movies</NavLink></li>
                    <li><NavLink to="/tv-series">TV Series</NavLink></li>
                    <li><NavLink to="/most-popular">Most Popular</NavLink></li>
                    <li><NavLink to="/top-airing">Top Airing</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Hnav