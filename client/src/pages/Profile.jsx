import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [nicknames, setNicknames] = useState([]);
  const [loadingNicknames, setLoadingNicknames] = useState(true);

  // Display name editing
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameSaving, setNameSaving] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  const avatarUrl = currentUser?.photoURL;
  const displayName = currentUser?.displayName || 'Anonymous';
  const email = currentUser?.email || '';
  const joinDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'Unknown';

  // Initial / avatar fallback
  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const fetchMyNicknames = async () => {
      try {
        const res = await api.get(`/nicknames/user/${currentUser.uid}`);
        setNicknames(res.data);
      } catch {
        setNicknames([]);
      } finally {
        setLoadingNicknames(false);
      }
    };
    if (currentUser) fetchMyNicknames();
  }, [currentUser]);

  const handleSaveName = async () => {
    if (!newName.trim()) return setNameError('Name cannot be empty');
    if (newName.trim().length < 2) return setNameError('Name must be at least 2 characters');
    setNameSaving(true);
    setNameError('');
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      await auth.currentUser.reload();
      setEditingName(false);
      setNameSuccess(true);
      setTimeout(() => setNameSuccess(false), 3000);
    } catch (err) {
      setNameError(err.message || 'Failed to update name');
    } finally {
      setNameSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this nickname?')) return;
    try {
      await api.delete(`/nicknames/${id}`);
      setNicknames((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-[#171742] overflow-x-hidden">
      <Navbar />
      <img src="/Ellipse 2.png" className="w-full h-50 backdrop-blur pointer-events-none select-none" alt="" />

      <div className="max-w-5xl mx-auto px-4 pt-20 md:pt-24 pb-16 relative z-10">

        {/* ── Profile Card ─────────────────────────────────────── */}
        <motion.div
          className="bg-black/65 backdrop-blur-sm rounded-2xl border border-gray-700/40 shadow-xl p-6 md:p-10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-24 h-24 rounded-full border-4 border-[#FF7B00] object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-[#FF7B00] bg-[#FF7B00]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#FF7B00] text-4xl font-bold">{initial}</span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Display Name */}
              {editingName ? (
                <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start mb-2">
                  <input
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                    placeholder="New display name"
                    className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FF7B00] w-full sm:w-auto"
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveName}
                      disabled={nameSaving}
                      className="bg-[#FF7B00] text-white px-4 py-1.5 rounded-md hover:bg-orange-600 disabled:opacity-50 text-sm"
                    >
                      {nameSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => { setEditingName(false); setNameError(''); }}
                      className="bg-gray-700 text-white px-4 py-1.5 rounded-md hover:bg-gray-600 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                  <h1 className="text-white text-2xl md:text-3xl font-bold">{displayName}</h1>
                  <button
                    onClick={() => { setNewName(displayName); setEditingName(true); }}
                    className="text-gray-400 hover:text-[#FF7B00] transition-colors text-sm ml-1"
                    title="Edit display name"
                  >
                    ✏️
                  </button>
                </div>
              )}
              {nameError && <p className="text-red-400 text-sm mb-1">{nameError}</p>}
              {nameSuccess && <p className="text-green-400 text-sm mb-1">✓ Display name updated!</p>}

              <p className="text-gray-400 text-sm">{email}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-4 justify-center sm:justify-start">
                <div className="text-center">
                  <p className="text-[#FF7B00] text-2xl font-bold">{nicknames.length}</p>
                  <p className="text-gray-400 text-xs mt-0.5">Submissions</p>
                </div>
                <div className="text-center">
                  <p className="text-[#FF7B00] text-2xl font-bold">
                    {nicknames.reduce((sum, n) => sum + (n.likes?.length || 0), 0)}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">Total Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-medium">{joinDate}</p>
                  <p className="text-gray-400 text-xs mt-0.5">Joined</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── My Submissions ───────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-white text-xl font-bold">My Submissions</h2>
          <Link
            to="/create"
            className="bg-[#FF7B00] text-white text-sm px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            + Submit New
          </Link>
        </div>

        {loadingNicknames ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-700/40 rounded-2xl h-40" />
            ))}
          </div>
        ) : nicknames.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-black/40 rounded-2xl border border-gray-700/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg">You haven't submitted any nicknames yet.</p>
            <Link
              to="/create"
              className="inline-block mt-4 bg-[#FF7B00] text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Submit Your First Nickname
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nicknames.map((item, idx) => (
              <motion.div
                key={item._id}
                className="bg-black/65 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-5 shadow-lg hover:shadow-orange-500/10 hover:border-[#FF7B00]/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#FF7B00] text-xl font-bold mb-1">{item.nickname}</h3>
                    <p className="text-white text-sm">
                      <span className="text-gray-400">Character: </span>{item.character}
                    </p>
                    <p className="text-white text-sm">
                      <span className="text-gray-400">Anime: </span>{item.anime}
                    </p>
                    <p className="text-gray-300 text-xs mt-2 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex flex-col gap-1 ml-3 flex-shrink-0 items-end">
                    <span className="text-gray-500 text-xs">
                      ❤️ {item.likes?.length || 0}
                    </span>
                    <span className="text-gray-500 text-xs">
                      💬 {item.comments?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/nickname/${item._id}`}
                    className="flex-1 text-center text-white text-sm px-3 py-1.5 rounded-md bg-gray-700/60 hover:bg-gray-600 transition-colors"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => navigate(`/create/${item._id}`)}
                    className="flex-1 text-white text-sm px-3 py-1.5 rounded-md bg-neutral-700/60 hover:bg-neutral-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 text-white text-sm px-3 py-1.5 rounded-md bg-red-700/60 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
