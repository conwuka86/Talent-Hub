import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import TalentForm from './TalentForm';

const TalentList = () => {
    const [talents, setTalents] = useState([]);

    useEffect(() => {
        const fetchTalents = async () => {
            try {
                const response = await axios.get('/talents');
                setTalents(response.data);
            } catch (error) {
                console.error('Error fetching talents:', error);
            }
        };

        fetchTalents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/talents/${id}`);
            setTalents(talents.filter((talent) => talent.id !== id));
        } catch (error) {
            console.error('Error deleting talent:', error);
        }
    };

    const handleTalentAdded = (newTalent) => {
        setTalents([...talents, newTalent]);
    };

    return (
        <div>
            <h1>Talent List</h1>
            <TalentForm onTalentAdded={handleTalentAdded} />
            <ul>
                {talents.map((talent) => (
                    <li key={talent.id}>
                        <h3>{talent.name}</h3>
                        <p>Skills: {talent.skills.join(', ')}</p>
                        <p>Experience: {talent.experience_years} years</p>
                        <p>Contact: {talent.contact_info}</p>
                        <button onClick={() => handleDelete(talent.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TalentList;
