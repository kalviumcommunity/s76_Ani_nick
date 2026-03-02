import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";
import { searchCharacters } from "../api/jikan";

const CHARACTER_IMAGE_CACHE_KEY = 'aninick_character_image_cache_v1';

const readImageCache = () => {
  try {
    const raw = localStorage.getItem(CHARACTER_IMAGE_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeImageCache = (data) => {
  try {
    localStorage.setItem(CHARACTER_IMAGE_CACHE_KEY, JSON.stringify(data));
  } catch {
  }
};

const GridComponent = ({ searchQuery = '' }) => {
  const [nicknames, setNicknames] = useState([]);
  const [filteredNicknames, setFilteredNicknames] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [likingId, setLikingId] = useState(null);
  const [characterImages, setCharacterImages] = useState(() => readImageCache());
  const [loadedImages, setLoadedImages] = useState({});
  const requestedCharactersRef = useRef(new Set());
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Fetch nicknames
  useEffect(() => {
    const fetchNicknames = async () => {
      setLoading(true);
      try {
        const response = selectedUserId
          ? await api.get(`/nicknames/user/${selectedUserId}`)
          : await api.get('/nicknames');
        setNicknames(response.data);
      } catch (error) {
        console.error('Error fetching nicknames:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNicknames();
  }, [selectedUserId]);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setFilteredNicknames(nicknames);
      return;
    }

    const filtered = nicknames.filter((item) => {
      const nickname = item.nickname?.toLowerCase() || '';
      const character = item.character?.toLowerCase() || '';
      const anime = item.anime?.toLowerCase() || '';
      return nickname.includes(query) || character.includes(query) || anime.includes(query);
    });

    setFilteredNicknames(filtered);
  }, [nicknames, searchQuery]);

  useEffect(() => {
    const fetchCharacterImages = async () => {
      const pendingCharacters = Array.from(
        new Set(
          filteredNicknames
            .slice(0, visibleItems)
            .map((item) => item.character)
            .filter(Boolean)
            .filter((name) => characterImages[name] === undefined)
            .filter((name) => !requestedCharactersRef.current.has(name))
        )
      );

      if (pendingCharacters.length === 0) return;

      pendingCharacters.forEach((name) => requestedCharactersRef.current.add(name));

      const updates = {};

      for (const name of pendingCharacters) {
        try {
          const results = await searchCharacters(name, 1);
          const image = results[0]?.images?.jpg?.image_url || results[0]?.images?.webp?.image_url || null;
          updates[name] = image;
        } catch {
          updates[name] = null;
        }
      }

      if (Object.keys(updates).length > 0) {
        setCharacterImages((prev) => {
          const next = { ...prev, ...updates };
          writeImageCache(next);
          return next;
        });
      }
    };

    fetchCharacterImages();
  }, [filteredNicknames, visibleItems, characterImages]);

  // Build unique user list from created_by / created_by_name fields
  const uniqueUsers = React.useMemo(() => {
    const userMap = {};
    nicknames.forEach((n) => {
      if (n.created_by && !userMap[n.created_by]) {
        userMap[n.created_by] = n.created_by_name || 'Unknown';
      }
    });
    return Object.entries(userMap).map(([uid, name]) => ({ uid, name }));
  }, [nicknames]);

  const handleEdit = (id) => navigate(`/create/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this nickname?')) return;
    try {
      await api.delete(`/nicknames/${id}`);
      setNicknames((prev) => prev.filter((n) => (n._id || n.id) !== id));
    } catch (err) {
      console.error('Error deleting nickname:', err);
      alert(err.response?.data?.message || 'Failed to delete nickname.');
    }
  };

  const handleLike = async (id) => {
    if (!currentUser) return;
    setLikingId(id);
    try {
      const res = await api.post(`/nicknames/${id}/like`);
      const updatedLikes = res.data.likes;
      setNicknames((prev) => prev.map((n) => (n._id === id ? { ...n, likes: updatedLikes } : n)));
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setLikingId(null);
    }
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/nickname/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div>
      {/* Filter Dropdown */}
      <div className="px-4 md:px-6 pb-2">
        <label className="text-white text-sm md:text-base">Filter by User:</label>
        <select
          className="ml-2 px-3 py-1.5 bg-black/70 border border-gray-700 text-white rounded-md text-sm"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value || '')}
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user.uid} value={user.uid}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-gray-700/40 rounded-2xl h-52" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid z-10 grid-cols-1 md:grid-cols-2 gap-5 p-4 md:p-6">
          {filteredNicknames.slice(0, visibleItems).map((item) => {
            const id = item._id || item.id;
            const isOwner = currentUser && item.created_by === currentUser.uid;
            const isLiked = currentUser && (item.likes || []).includes(currentUser.uid);
            const likeCount = item.likes?.length || 0;
            const commentCount = item.comments?.length || 0;

            return (
              <div
                key={id}
                className="bg-black/65 backdrop-blur-sm z-10 rounded-2xl text-white shadow-lg hover:shadow-[#FF7B00]/20 hover:border-[#FF7B00]/40 border border-gray-700/30 transition-all duration-300 flex flex-col md:flex-row overflow-hidden"
              >
                <div className="w-full md:w-42 lg:w-52 h-56 md:h-auto bg-gray-900/60 border-b md:border-b-0 md:border-r border-gray-700/30 shrink-0">
                  {characterImages[item.character] ? (
                    <>
                      {!loadedImages[item.character] && (
                        <div className="w-full h-full animate-pulse bg-gray-800/70" />
                      )}
                      <img
                        src={characterImages[item.character]}
                        alt={item.character}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          loadedImages[item.character] ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        onLoad={() =>
                          setLoadedImages((prev) => ({ ...prev, [item.character]: true }))
                        }
                        onError={() =>
                          setCharacterImages((prev) => {
                            const next = { ...prev, [item.character]: null };
                            writeImageCache(next);
                            return next;
                          })
                        }
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm text-center px-3">
                      {item.character}
                    </div>
                  )}
                </div>

                <div className="flex-1 p-5 md:p-6 flex flex-col">
                  <div className="text-left mb-3">
                    <h2 className="text-xl md:text-2xl font-bold text-[#FF7B00] mb-2 break-words">{item.nickname}</h2>
                    <hr className="border-[#FF7B00]/50" />
                  </div>

                  <div className="flex-1 text-sm md:text-base space-y-1 text-left">
                    <p><span className="font-bold">Character: </span>{item.character}</p>
                    <p><span className="font-bold">Anime: </span>{item.anime}</p>
                    <p className="text-gray-300 text-sm line-clamp-3 pt-1 leading-relaxed">{item.description}</p>
                    <p className="text-xs italic text-gray-400 pt-2">
                      By {item.created_by_name || 'Unknown'} · {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-700/40 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleLike(id)}
                      disabled={likingId === id || !currentUser}
                      className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-all ${
                        isLiked
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-gray-700/40 text-gray-400 border border-gray-600/40 hover:bg-gray-600/40'
                      } disabled:opacity-50`}
                    >
                      {isLiked ? '❤️' : '🤍'} {likeCount}
                    </button>

                    <Link
                      to={`/nickname/${id}`}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-gray-700/40 text-gray-400 border border-gray-600/40 hover:bg-gray-600/40 transition-colors"
                    >
                      💬 {commentCount}
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleShare(id)}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-gray-700/40 text-gray-400 border border-gray-600/40 hover:bg-gray-600/40 transition-colors"
                    >
                      {copiedId === id ? '✅' : '🔗'}
                    </button>

                    <Link
                      to={`/nickname/${id}`}
                      className="text-sm text-[#FF7B00] hover:underline px-2 py-1.5 ml-auto"
                    >
                      View →
                    </Link>
                  </div>

                  {isOwner && (
                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        className="flex-1 text-white text-sm px-3 py-2 rounded-md bg-neutral-800/60 cursor-pointer hover:bg-neutral-700 transition duration-300"
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        className="flex-1 text-white text-sm px-3 py-2 cursor-pointer rounded-md bg-red-600/60 hover:bg-red-500 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && visibleItems < filteredNicknames.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleItems(visibleItems + 6)}
            className="bg-[#FF7B00] hover:scale-110 cursor-pointer mb-10 text-white px-4 py-2 rounded-md hover:bg-black transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GridComponent;
