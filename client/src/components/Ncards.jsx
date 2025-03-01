import React, { useEffect, useState } from "react";
import axios from "axios";

const GridComponent = () => {
  const [nicknames, setNicknames] = useState([]);
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    // Fetch nicknames from the backend
    const fetchNicknames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/nicknames");
        setNicknames(response.data);
      } catch (error) {
        console.error("Error fetching nicknames:", error);
      }
    };

    fetchNicknames();
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  return (
    <div>
    <div className="grid grid-rows-2 gap-6 p-6  md:grid-cols-2">
      {nicknames.slice(0, visibleItems).map((item) => (
        <div 
          key={item._id} 
          className="bg-black/60 py-10 z-1 rounded-2xl text-white text-center flex-col shadow-lg p-6 hover:scale-105 hover:animate-pulse  hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold text-center text-[#FF7B00] mb-2">{item.nickname}</h2>
          <hr className="text-[#FF7B00]"/>
          <p className="text-white py-3"> <span className="font-bold">Character: </span>{item.character}</p>
          <p className=" py-3"><span className="font-bold">Anime: </span>{item.anime}</p>
          <p className=" py-3">{item.description}</p>
        </div>
      ))}
    </div>
    {visibleItems < nicknames.length && (
        <div className="text-center mt-6 z-10 flex pl-[45%] font-bold">
          <button
            onClick={loadMore}
            className="bg-[#FF7B00] mb-10 z-10 text-white px-4 py-2 rounded-md hover:bg-black cursor-pointer transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GridComponent;
