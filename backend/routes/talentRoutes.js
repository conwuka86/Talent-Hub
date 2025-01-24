const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Talent = require('../models/Talent');

// Create Talent
router.post('/', authMiddleware, async (req, res) => {
    const { name, skills, experience_years, availability, contact_info } = req.body;
    try {
        const newTalent = new Talent({
            name,
            skills,
            experience_years,
            availability,
            contact_info,
        });
        const talent = await newTalent.save();
        res.status(201).json(talent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating talent', error });
    }
});

// Read All Talents
router.get('/', authMiddleware, async (req, res) => {
    try {
        const talents = await Talent.find();
        res.status(200).json(talents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching talents', error });
    }
});

// Update Talent
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, skills, experience_years, availability, contact_info } = req.body;
    try {
        const updatedTalent = await Talent.findByIdAndUpdate(
            id,
            { name, skills, experience_years, availability, contact_info },
            { new: true }
        );
        res.status(200).json(updatedTalent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating talent', error });
    }
});

// Delete Talent
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await Talent.findByIdAndDelete(id);
        res.status(200).json({ message: 'Talent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting talent', error });
    }
});

module.exports = router;