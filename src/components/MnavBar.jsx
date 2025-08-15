import React from 'react'

function MnavBar() {
    return (
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/50 to-transparent">
            <div className="container mx-auto px-8 py-6 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-bold text-white">h!anime</div>
                    <div className="hidden md:flex items-center space-x-6 text-white">
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Watch2gether</span>
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Random</span>
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Anime Name</span>
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">News</span>
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Community</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">EN</div>
                        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">JP</div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MnavBar