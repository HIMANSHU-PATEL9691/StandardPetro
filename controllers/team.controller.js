// controllers/team.controller.js
import TeamMember from "../models/TeamMember.js"; // Corrected from team.model.js

// Fetch all team members
export const getTeamMembers = async (req, res) => {
    try {
        const team = await TeamMember.find().sort({ order: 1 });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error fetching team members", error });
    }
};

// Create a new team member
export const createTeamMember = async (req, res) => {
    try {
        const newMember = new TeamMember(req.body);
        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ message: "Error creating team member", error });
    }
};

// Update a team member
export const updateTeamMember = async (req, res) => {
    try {
        const updatedMember = await TeamMember.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(400).json({ message: "Error updating team member", error });
    }
};

// Delete a team member
export const deleteTeamMember = async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting team member", error });
    }
};