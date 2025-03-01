import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
export const Createc = () => {
    const [formData, setFormData] = useState({
        nickname: '',
        character: '',
        anime: '',
        description: ''
      });
    
      const [message, setMessage] = useState('');
    
      // Handle input change
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Handle form submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/api/nicknames", formData);
          setMessage("Nickname added successfully!");
          setFormData({ nickname: '', character: '', anime: '', description: '' }); // Clear form after submission
        } catch (error) {
          setMessage("Error adding nickname!");
          console.error("Error:", error);
        }
      };
    
      return (
        <div className="p-6 bg-black/40 rounded-lg z-10  text-white">
          <h2 className="text-xl font-bold mb-4 text-[#FF7B00]">Add a Nickname</h2>
    
          {message && <p className="text-green-500">{message}</p>}
    
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input 
              type="text" 
              name="nickname" 
              value={formData.nickname} 
              onChange={handleChange} 
              placeholder="Enter Nickname" 
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
    
            <input 
              type="text" 
              name="character" 
              value={formData.character} 
              onChange={handleChange} 
              placeholder="Enter Character Name" 
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
    
            <input 
              type="text" 
              name="anime" 
              value={formData.anime} 
              onChange={handleChange} 
              placeholder="Enter Anime Name" 
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
    
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Enter Description" 
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
    
            <button 
              type="submit" 
              className="bg-[#FF7B00] hover:bg-[#d66a00] text-white font-bold py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      );
}
