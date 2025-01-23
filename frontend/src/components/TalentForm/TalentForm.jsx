import React, { useState } from 'react';
import axios from '../utils/api';

const TalentForm = ({ onTalentAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        experience_years: 0,
        availability: true,
        contact_info: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/talents', formData);
            onTalentAdded(response.data);
            setFormData({ name: '', skills: '', experience_years: 0, availability: true, contact_info: '' });
        } catch (error) {
            console.error('Error creating talent:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills (comma-separated)"
                required
            />
            <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                placeholder="Years of Experience"
                required
            />
            <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
            >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
            </select>
            <input
                type="text"
                name="contact_info"
                value={formData.contact_info}
                onChange={handleChange}
                placeholder="Contact Info"
                required
            />
            <button type="submit">Add Talent</button>
        </form>
    );
};

export default TalentForm;