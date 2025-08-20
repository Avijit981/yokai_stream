import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const categories = ["Watching", "On Hold", "Planned", "Dropped", "Completed"];

const WatchList = () => {
  const [user] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchWatchlist = async () => {
      let userList = {};
      for (const cat of categories) {
        const q = query(
          collection(db, "users", user.uid, "watchlist"),
          where("status", "==", cat)
        );
        const snapshot = await getDocs(q);
        userList[cat] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
      setWatchlist(userList);
    };
    fetchWatchlist();
  }, [user]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">My Watchlist</h1>
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-xl mb-2">{cat}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {watchlist[cat]?.length ? (
              watchlist[cat].map((anime) => (
                <div key={anime.id} className="bg-zinc-800 p-2 rounded">
                  <img src={anime.poster} alt={anime.title} className="w-full h-48 object-cover rounded"/>
                  <p className="mt-2">{anime.title}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No anime in {cat}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchList;
