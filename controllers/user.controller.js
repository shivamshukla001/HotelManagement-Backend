import express from 'express';
import User from '../models/user.model.js';

export const getAlluser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}


export const createUser = async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body); 
        console.log("FILE RECEIVED:", req.file); // Debug file upload
        
        const {
            check_in_date,
            check_out_date,
            number_of_guest,
            adults,
            children,
            room_type,
            number_of_rooms,
            full_name,
            email,
            phone_number,
            country,
            city,
            address,
            message
        } = req.body;

        // Convert string numbers to actual numbers (FormData sends strings)
        const numGuests = parseInt(number_of_guest) || 0;
        const numAdults = parseInt(adults) || 0;
        const numChildren = parseInt(children) || 0;
        const numRooms = parseInt(number_of_rooms) || 0;

        // RELAXED VALIDATION (only required fields)
        if (
            !check_in_date ||
            !check_out_date ||
            !full_name ||
            !email ||
            !phone_number
        ) {
            return res.status(400).json({ message: "Please fill required fields: check-in date, check-out date, full name, email, phone" });
        }

        const userData = {
            check_in_date,
            check_out_date,
            number_of_guest: numGuests,
            adults: numAdults,
            children: numChildren,
            room_type: room_type || "",
            number_of_rooms: numRooms,
            full_name,
            email,
            phone_number,
            country: country || "",
            city: city || "",
            address: address || "",
            message: message || "",
        };

        // ADD FILE PATH if uploaded
        if (req.file) {
            userData.id_proof_path = req.file.path; // Save file path in DB
            console.log("File saved at:", req.file.path);
        }

        const user = new User(userData);
        await user.save();

        console.log("User created with ID:", user._id);
        return res.status(201).json({ 
            message: "User created successfully",
            userId: user._id,
            idProofUploaded: !!req.file
        });

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error);

    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.log(error);

    }
}