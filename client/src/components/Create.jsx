import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";
import { searchAnime, searchCharacters, getAnimeCharacters } from "../api/jikan";

export const Createc = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nickname: "",
    character: "",
    anime: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [animeSuggestions, setAnimeSuggestions] = useState([]);
  const [animeLoading, setAnimeLoading] = useState(false);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [characterSuggestions, setCharacterSuggestions] = useState([]);
  const [characterLoading, setCharacterLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/nicknames/${id}`)
        .then((response) => setFormData(response.data))
        .catch((err) => console.error("Error fetching nickname:", err));
    }
  }, [id, isEdit]);

  useEffect(() => {
    if (location.state?.refresh) {
      window.location.reload();
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'anime') {
      setSelectedAnimeId(null);
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  useEffect(() => {
    const query = formData.anime?.trim();
    if (!query || query.length < 2) {
      setAnimeSuggestions([]);
      setSelectedAnimeId(null);
      return;
    }

    const timer = setTimeout(async () => {
      setAnimeLoading(true);
      try {
        const results = await searchAnime(query, 5);
        setAnimeSuggestions(results);
      } catch {
        setAnimeSuggestions([]);
      } finally {
        setAnimeLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [formData.anime]);

  const selectAnimeSuggestion = (anime) => {
    setFormData((prev) => ({ ...prev, anime: anime.title }));
    setSelectedAnimeId(anime.mal_id || null);
    setAnimeSuggestions([]);
  };

  useEffect(() => {
    const query = formData.character?.trim();
    if (!query || query.length < 2) {
      setCharacterSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setCharacterLoading(true);
      try {
        if (selectedAnimeId) {
          const animeCharacters = await getAnimeCharacters(selectedAnimeId);
          const filtered = animeCharacters
            .filter((entry) => entry?.character?.name?.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 8);
          setCharacterSuggestions(filtered.map((entry) => ({
            mal_id: entry.character.mal_id,
            name: entry.character.name,
            image: entry.character.images?.jpg?.image_url || entry.character.images?.webp?.image_url || null,
          })));
        } else {
          const results = await searchCharacters(query, 8);
          setCharacterSuggestions(results.map((entry) => ({
            mal_id: entry.mal_id,
            name: entry.name,
            image: entry.images?.jpg?.image_url || entry.images?.webp?.image_url || null,
          })));
        }
      } catch {
        setCharacterSuggestions([]);
      } finally {
        setCharacterLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [formData.character, selectedAnimeId]);

  const selectCharacterSuggestion = (characterName) => {
    setFormData((prev) => ({ ...prev, character: characterName }));
    setCharacterSuggestions([]);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.nickname?.trim()) {
      newErrors.nickname = 'Nickname is required'; isValid = false;
    } else if (formData.nickname.length < 3 || formData.nickname.length > 50) {
      newErrors.nickname = 'Nickname must be between 3 and 50 characters'; isValid = false;
    }
    if (!formData.character?.trim()) {
      newErrors.character = 'Character name is required'; isValid = false;
    } else if (formData.character.length < 3 || formData.character.length > 50) {
      newErrors.character = 'Character name must be between 3 and 50 characters'; isValid = false;
    }
    if (!formData.anime?.trim()) {
      newErrors.anime = 'Anime name is required'; isValid = false;
    } else if (formData.anime.length < 3 || formData.anime.length > 100) {
      newErrors.anime = 'Anime name must be between 3 and 100 characters'; isValid = false;
    }
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required'; isValid = false;
    } else if (formData.description.length < 10 || formData.description.length > 500) {
      newErrors.description = 'Description must be between 10 and 500 characters'; isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!currentUser) {
      setMessage('You must be logged in to submit nicknames');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!validateForm()) {
      setMessage('Please correct all validation errors');
      return;
    }

    try {
      setIsSubmitting(true);
      const cleanedData = {
        nickname: String(formData.nickname).trim(),
        character: String(formData.character).trim(),
        anime: String(formData.anime).trim(),
        description: String(formData.description).trim(),
      };

      // api client automatically attaches the Firebase ID token header
      if (isEdit) {
        await api.put(`/nicknames/${id}`, cleanedData);
        alert('Nickname updated successfully!');
      } else {
        await api.post('/nicknames', cleanedData);
        setMessage('Nickname added successfully!');
        setFormData({ nickname: '', character: '', anime: '', description: '' });
      }

      navigate('/explore', { state: { refresh: true } });
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.message || 'Error saving nickname. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const requiredFields = ['nickname', 'character', 'anime', 'description'];
  const completedFields = requiredFields.filter((field) => String(formData[field] || '').trim().length > 0).length;
  const completionPercent = Math.round((completedFields / requiredFields.length) * 100);

  return (
    <div className="p-4 md:p-6 bg-black/40 rounded-2xl z-10 text-white border border-gray-700/30 shadow-xl">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-2xl font-bold text-[#FF7B00]">
            {isEdit ? 'Edit Nickname' : 'Submit a Nickname'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Use anime + character suggestions to submit cleaner entries.</p>
        </div>
        <div className="text-right min-w-20">
          <p className="text-xs text-gray-400">Completion</p>
          <p className="text-lg font-bold text-[#FF7B00]">{completionPercent}%</p>
        </div>
      </div>

      <div className="h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#FF7B00] transition-all duration-300"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      {message && (
        <p className={message.includes('successfully') ? 'text-green-400 mb-4' : 'text-red-400 mb-4'}>
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <form onSubmit={handleSubmit} className="xl:col-span-3 flex flex-col space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Nickname</label>
            <input
              type="text" name="nickname" value={formData.nickname} onChange={handleChange}
              placeholder="Ex: King of Hell"
              className={`p-3 rounded-lg w-full bg-gray-800 text-white border ${
                errors.nickname ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/60`}
            />
            <div className="flex justify-between mt-1">
              {errors.nickname ? <p className="text-red-400 text-xs">{errors.nickname}</p> : <span />}
              <p className="text-xs text-gray-500">{formData.nickname.length}/50</p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Anime</label>
            <input
              type="text" name="anime" value={formData.anime} onChange={handleChange}
              placeholder="Type anime name"
              className={`p-3 rounded-lg w-full bg-gray-800 text-white border ${
                errors.anime ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/60`}
            />
            {animeLoading && <p className="text-gray-400 text-xs mt-1">Searching anime...</p>}
            {animeSuggestions.length > 0 && (
              <div className="mt-2 bg-gray-900 border border-gray-700 rounded-lg max-h-52 overflow-y-auto">
                {animeSuggestions.map((item) => (
                  <button
                    key={item.mal_id}
                    type="button"
                    onClick={() => selectAnimeSuggestion(item)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-800 text-sm text-gray-200 flex items-center gap-3"
                  >
                    {item.images?.jpg?.small_image_url && (
                      <img src={item.images.jpg.small_image_url} alt={item.title} className="w-8 h-10 object-cover rounded" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
            {errors.anime && <p className="text-red-400 text-xs mt-1">{errors.anime}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Character</label>
            <input
              type="text" name="character" value={formData.character} onChange={handleChange}
              placeholder="Type character name"
              className={`p-3 rounded-lg w-full bg-gray-800 text-white border ${
                errors.character ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/60`}
            />
            {selectedAnimeId && <p className="text-xs text-[#FF7B00] mt-1">Character suggestions are scoped to selected anime.</p>}
            {characterLoading && <p className="text-gray-400 text-xs mt-1">Searching characters...</p>}
            {characterSuggestions.length > 0 && (
              <div className="mt-2 bg-gray-900 border border-gray-700 rounded-lg max-h-52 overflow-y-auto">
                {characterSuggestions.map((item) => (
                  <button
                    key={item.mal_id}
                    type="button"
                    onClick={() => selectCharacterSuggestion(item.name)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-800 text-sm text-gray-200 flex items-center gap-3"
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-8 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-8 h-10 rounded bg-gray-800" />
                    )}
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
            {errors.character && <p className="text-red-400 text-xs mt-1">{errors.character}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              name="description" value={formData.description} onChange={handleChange}
              placeholder="Why this nickname fits this character..."
              className={`p-3 rounded-lg w-full bg-gray-800 text-white border ${
                errors.description ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/60`}
              rows={5}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? <p className="text-red-400 text-xs">{errors.description}</p> : <span />}
              <p className="text-xs text-gray-500">{formData.description.length}/500</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FF7B00] hover:bg-[#d66a00] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Nickname'}
          </button>
        </form>

        <div className="xl:col-span-2">
          <div className="bg-[#171742]/80 border border-gray-700/30 rounded-xl p-4 sticky top-24">
            <p className="text-sm text-gray-400 mb-2">Live Preview</p>
            <div className="bg-black/50 border border-gray-700/30 rounded-xl p-4">
              <h3 className="text-2xl font-bold text-[#FF7B00] break-words">{formData.nickname || 'Your Nickname'}</h3>
              <p className="text-gray-300 mt-2"><span className="text-gray-500">Character:</span> {formData.character || '—'}</p>
              <p className="text-gray-300"><span className="text-gray-500">Anime:</span> {formData.anime || '—'}</p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed break-words">
                {formData.description || 'Your description preview appears here.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createc;
