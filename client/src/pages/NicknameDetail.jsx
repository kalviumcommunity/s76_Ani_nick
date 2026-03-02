import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { getAnimeByTitle } from '../api/jikan';
import Navbar from '../components/Navbar';

const NicknameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Like state
  const [likes, setLikes] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);

  // Comment state
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');
  const [showComments, setShowComments] = useState(true);

  // Share state
  const [copied, setCopied] = useState(false);
  const [animeMeta, setAnimeMeta] = useState(null);
  const [animeMetaLoading, setAnimeMetaLoading] = useState(false);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await api.get(`/nicknames/${id}`);
        setNickname(res.data);
        setLikes(res.data.likes || []);
        setComments(res.data.comments || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Nickname not found');
      } finally {
        setLoading(false);
      }
    };
    fetchNickname();
  }, [id]);

  useEffect(() => {
    const fetchAnimeMeta = async () => {
      if (!nickname?.anime) return;
      setAnimeMetaLoading(true);
      try {
        const meta = await getAnimeByTitle(nickname.anime);
        setAnimeMeta(meta);
      } catch {
        setAnimeMeta(null);
      } finally {
        setAnimeMetaLoading(false);
      }
    };

    fetchAnimeMeta();
  }, [nickname?.anime]);

  const isLiked = currentUser && likes.includes(currentUser.uid);
  const isOwner = currentUser && nickname?.created_by === currentUser.uid;

  const handleLike = async () => {
    if (!currentUser) return;
    setLikeLoading(true);
    try {
      const res = await api.post(`/nicknames/${id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    setCommentError('');
    try {
      const res = await api.post(`/nicknames/${id}/comment`, { text: commentText.trim() });
      setComments(res.data.comments);
      setCommentText('');
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await api.delete(`/nicknames/${id}/comment/${commentId}`);
      setComments(res.data.comments);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171742] flex items-center justify-center">
        <Navbar />
        <div className="animate-pulse text-[#FF7B00] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#171742] flex flex-col items-center justify-center gap-4">
        <Navbar />
        <p className="text-red-400 text-lg">{error}</p>
        <button onClick={() => navigate('/explore')} className="text-[#FF7B00] hover:underline">
          ← Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171742] overflow-x-hidden">
      <Navbar />
      <img src="/Ellipse 2.png" className="w-full h-50 backdrop-blur pointer-events-none select-none" alt="" />

      <div className="max-w-3xl mx-auto px-4 pt-20 md:pt-24 pb-16 relative z-10">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-[#FF7B00] text-sm mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>

        {/* ── Main Card ────────────────────────────────────────── */}
        <motion.div
          className="bg-black/65 backdrop-blur-sm rounded-2xl border border-gray-700/40 shadow-xl p-6 md:p-10 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
            <h1 className="text-[#FF7B00] text-3xl md:text-5xl font-bold break-words">
              {nickname.nickname}
            </h1>
            {isOwner && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/create/${id}`)}
                  className="text-sm bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-white">
              <span className="text-gray-400 text-sm">Character: </span>
              <span className="font-medium">{nickname.character}</span>
            </p>
            <p className="text-white">
              <span className="text-gray-400 text-sm">Anime: </span>
              <span className="font-medium">{nickname.anime}</span>
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">{nickname.description}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-700/40 pt-4">
            <p className="text-gray-500 text-sm">
              By <span className="text-gray-300">{nickname.created_by_name}</span>
              {nickname.createdAt && (
                <span> · {formatDate(nickname.createdAt)}</span>
              )}
            </p>
          </div>

          {/* ── Action Buttons ─────────────────────────────────── */}
          <div className="flex gap-3 mt-5 flex-wrap">
            {/* Like */}
            <button
              type="button"
              onClick={handleLike}
              disabled={likeLoading || !currentUser}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isLiked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                  : 'bg-gray-700/60 text-gray-300 border border-gray-600/40 hover:bg-gray-600/60'
              } disabled:opacity-50`}
            >
              {isLiked ? '❤️' : '🤍'} {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
            </button>

            {/* Comments toggle */}
            <button
              type="button"
              onClick={() => setShowComments((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-700/60 text-gray-300 border border-gray-600/40 hover:bg-gray-600/60 transition-colors"
            >
              💬 {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-700/60 text-gray-300 border border-gray-600/40 hover:bg-gray-600/60 transition-colors"
            >
              {copied ? '✅ Copied!' : '🔗 Share'}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="bg-black/65 backdrop-blur-sm rounded-2xl border border-gray-700/40 shadow-xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Anime Details (Jikan)</h2>

          {animeMetaLoading && <p className="text-gray-400 text-sm">Loading anime metadata...</p>}

          {!animeMetaLoading && !animeMeta && (
            <p className="text-gray-500 text-sm">No extra data found for this anime.</p>
          )}

          {!animeMetaLoading && animeMeta && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <img
                  src={animeMeta.images?.jpg?.image_url || animeMeta.images?.webp?.image_url}
                  alt={animeMeta.title}
                  className="w-full max-w-[220px] rounded-lg border border-gray-700/40 object-cover"
                />
              </div>

              <div className="md:col-span-2 space-y-2 text-sm">
                <p className="text-white font-semibold text-base">{animeMeta.title}</p>
                <p className="text-gray-300">
                  ⭐ {animeMeta.score || 'N/A'} · 🎬 {animeMeta.episodes || 'N/A'} eps · 📺 {animeMeta.status || 'N/A'}
                </p>
                <p className="text-gray-300">Year: {animeMeta.year || 'N/A'}</p>
                <p className="text-gray-400 leading-relaxed">
                  {(animeMeta.synopsis || 'No synopsis available.').slice(0, 280)}
                  {animeMeta.synopsis && animeMeta.synopsis.length > 280 ? '...' : ''}
                </p>
                {animeMeta.url && (
                  <a
                    href={animeMeta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[#FF7B00] hover:underline"
                  >
                    View on MyAnimeList ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Comments Section ──────────────────────────────────── */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              key="comments"
              className="bg-black/60 rounded-2xl border border-gray-700/40 shadow-xl p-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-white font-bold text-lg mb-5">Comments</h2>

              {/* Comment input */}
              {currentUser ? (
                <form onSubmit={handleComment} className="flex gap-2 mb-6 flex-col sm:flex-row">
                  <input
                    value={commentText}
                    onChange={(e) => { setCommentText(e.target.value); setCommentError(''); }}
                    placeholder="Write a comment..."
                    maxLength={300}
                    className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7B00]"
                  />
                  <button
                    type="submit"
                    disabled={commentLoading || !commentText.trim()}
                    className="bg-[#FF7B00] text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 disabled:opacity-50 transition-colors"
                  >
                    {commentLoading ? '...' : 'Post'}
                  </button>
                </form>
              ) : (
                <p className="text-gray-400 text-sm mb-6">
                  <Link to="/login" className="text-[#FF7B00] hover:underline">Sign in</Link> to leave a comment.
                </p>
              )}
              {commentError && <p className="text-red-400 text-sm mb-4">{commentError}</p>}

              {/* Comment list */}
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">No comments yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {[...comments].reverse().map((c) => (
                    <motion.div
                      key={c._id}
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* Avatar initial */}
                      <div className="w-8 h-8 rounded-full bg-[#FF7B00]/20 border border-[#FF7B00]/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#FF7B00] text-sm font-bold">
                          {(c.name || '?').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white text-sm font-medium">{c.name || 'Anonymous'}</span>
                          <span className="text-gray-500 text-xs">{formatDate(c.createdAt)}</span>
                          {currentUser?.uid === c.uid && (
                            <button
                              onClick={() => handleDeleteComment(c._id)}
                              className="text-red-400 hover:text-red-300 text-xs ml-auto transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mt-0.5 break-words">{c.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NicknameDetail;
