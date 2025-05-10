import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const Createc = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    nickname: "",
    character: "",
    anime: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Use the production URL instead of localhost
  const API_BASE_URL = "https://s76-ani-nick-1.onrender.com";

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_BASE_URL}/api/nicknames/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
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
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Check all required fields with length validations
    if (!formData.nickname?.trim()) {
      newErrors.nickname = 'Nickname is required';
      isValid = false;
    } else if (formData.nickname.length < 3 || formData.nickname.length > 50) {
      newErrors.nickname = 'Nickname must be between 3 and 50 characters';
      isValid = false;
    }
    
    if (!formData.character?.trim()) {
      newErrors.character = 'Character name is required';
      isValid = false;
    } else if (formData.character.length < 3 || formData.character.length > 50) {
      newErrors.character = 'Character name must be between 3 and 50 characters';
      isValid = false;
    }
    
    if (!formData.anime?.trim()) {
      newErrors.anime = 'Anime name is required';
      isValid = false;
    } else if (formData.anime.length < 3 || formData.anime.length > 100) {
      newErrors.anime = 'Anime name must be between 3 and 100 characters';
      isValid = false;
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.length < 10 || formData.description.length > 500) {
      newErrors.description = 'Description must be between 10 and 500 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    // Validate form before submission
    if (!validateForm()) {
      setMessage("Please correct all validation errors");
      return;
    }
    
    try {
      // Get the current user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user || !user.isLoggedIn) {
        setMessage("You must be logged in to submit nicknames");
        // Redirect to login page after 2 seconds
        setTimeout(() => navigate("/login"), 2000);
        return;
      }
      
      const apiUrl = isEdit 
        ? `${API_BASE_URL}/api/nicknames/${id}`
        : `${API_BASE_URL}/api/nicknames`;
      
      console.log("Sending request to:", apiUrl);
      console.log("Form data:", formData);
      
      // Clean the form data to ensure all fields are strings
      const cleanedFormData = {
        nickname: String(formData.nickname).trim(),
        character: String(formData.character).trim(),
        anime: String(formData.anime).trim(),
        description: String(formData.description).trim(),
      };
      
      const method = isEdit ? axios.put : axios.post;
      
      // Log the final request that will be sent
      console.log("Headers:", {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.username}`
      });
      console.log("Cleaned form data:", cleanedFormData);
      
      const response = await method(apiUrl, cleanedFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.username}`
        }
      });
      
      console.log("Server response:", response);
      
      if (isEdit) {
        alert("Nickname updated successfully!");
      } else {
        setMessage("Nickname added successfully!");
        setFormData({ nickname: "", character: "", anime: "", description: "" });
      }
      
      navigate("/explore", { state: { refresh: true } });
    } catch (error) {
      console.error("Error:", error);
      
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error saving nickname. Please try again later.");
      }
    }
  };

  return (
    <div className="p-6 bg-black/40 rounded-lg z-10 text-white">
      <h2 className="text-xl font-bold mb-4 text-[#FF7B00]">
        {isEdit ? "Edit Nickname" : "Add a Nickname"}
      </h2>

      {message && <p className={message.includes("successfully") ? "text-green-500 mb-4" : "text-red-500 mb-4"}>{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <input 
            type="text" 
            name="nickname" 
            value={formData.nickname} 
            onChange={handleChange} 
            placeholder="Enter Nickname" 
            className={`p-2 rounded w-full bg-gray-800 text-white ${errors.nickname ? 'border-red-500 border-2' : 'border-gray-700'}`}
          />
          {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
        </div>
        
        <div>
          <input 
            type="text" 
            name="character" 
            value={formData.character} 
            onChange={handleChange} 
            placeholder="Enter Character Name" 
            className={`p-2 rounded w-full bg-gray-800 text-white ${errors.character ? 'border-red-500 border-2' : 'border-gray-700'}`}
          />
          {errors.character && <p className="text-red-500 text-sm mt-1">{errors.character}</p>}
        </div>
        
        <div>
          <input 
            type="text" 
            name="anime" 
            value={formData.anime} 
            onChange={handleChange} 
            placeholder="Enter Anime Name" 
            className={`p-2 rounded w-full bg-gray-800 text-white ${errors.anime ? 'border-red-500 border-2' : 'border-gray-700'}`}
          />
          {errors.anime && <p className="text-red-500 text-sm mt-1">{errors.anime}</p>}
        </div>
        
        <div>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Enter Description" 
            className={`p-2 rounded w-full bg-gray-800 text-white ${errors.description ? 'border-red-500 border-2' : 'border-gray-700'}`}
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        
        <button 
          type="submit" 
          className="bg-[#FF7B00] hover:bg-[#d66a00] text-white font-bold py-2 rounded"
        >
          {isEdit ? "Save Changes" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Createc;
