const express = require("express");
const loginschema = require("../models/auth/authModel");
const jwt = require("jsonwebtoken")
const studentschema = require("../models/student/studentModel");

// ==================== admin login ====================
login = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { email, password, } = req.body;
    // Check if the request body contains only 'email' and 'password'
    const hasAdditionalData = Object.keys(req.body).some(key => key !== 'email' && key !== 'password');
    if (hasAdditionalData) {
        return res.status(400).json({ success: false, errorMsg: 'Invalid request. Only email and password are allowed.' });
    }
    if (!email || email.trim() === '') {
        res.json({ errorMsg: "email is required" });
    } else if (!password || password.trim() === '') {
        res.json({ errorMsg: "password is required" });
    } else {
        try {
            // Check if the user exists
            const user = await loginschema.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if the provided password matches the stored password
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token with expiration time
            const payload = {
                user: {
                    id: user.id,
                    email: user.email,
                },
            };

            const expiresIn = process.env.JWT_EXPIRY || 86400; // Default to one day if not provided

            jwt.sign(payload, process.env.SECRET_KEY, { expiresIn }, (err, token) => {
                if (err) throw err;

                res.json({ token });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
}
// ==================== create student ====================
createStudent = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { name, address, phone } = req.body;

    if (!name || name.trim() === '') {
        res.json({ errorMsg: "name is required" });
    } else {

        try {
            // Check if the user with the provided email exists
            const user = await studentschema.find({ name });

            if (user.length >= 1) {
                return res.status(401).json({ message: 'This user already exits' });
            }
            const registrationInfo = new studentschema({
                name: name,
                phone: phone,
                address: address
            });
            const saveUser = await registrationInfo.save();
            if (saveUser) {
                res.json({
                    success: true,
                    data: saveUser,
                    message: "Registration successful."
                });
            } else {
                console.log("Failed to save registration information.");
                res.json({
                    success: false,
                    errorMsg: "Failed to save registration information."
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }
}

allStudent = async (req, res) => {
    try {
        const users = await studentschema.find();

        if (users.length > 0) {
            res.json({
                success: true,
                data: users,
                message: "All student information retrieved successfully."
            });
        } else {
            res.json({
                success: false,
                errorMsg: "No users found."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
deleteStudent = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { id } = req.params;

    try {
        const user = await studentschema.findByIdAndDelete(id);

        if (user) {
            res.json({
                success: true,
                message: "Delete successful."
            });
        } else {
            res.json({
                success: false,
                errorMsg: "Failed to delete student information. User not found."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
editStudent = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone, january, february, march, april, may, june, july, august, september, october, november, december } = req.body;

    try {
        const updateFields = {};
        // Check if a document with the same name exists
        const existingDocument = await studentschema.findOne({ name, _id: { $ne: id } });

        if (existingDocument) {
            // Document exists, return an error
            return res.status(400).json({ success: false, errorMsg: 'Name already exists.' });
        }
        // Update basic info
        if (name !== undefined) updateFields.name = name;
        if (address !== undefined) updateFields.address = address;
        if (phone !== undefined) updateFields.phone = phone;

        // Update the specified month fields
        if (january !== undefined) updateFields['month.january'] = january;
        if (february !== undefined) updateFields['month.february'] = february;
        if (march !== undefined) updateFields['month.march'] = march;
        if (april !== undefined) updateFields['month.april'] = april;
        if (may !== undefined) updateFields['month.may'] = may;
        if (june !== undefined) updateFields['month.june'] = june;
        if (july !== undefined) updateFields['month.july'] = july;
        if (august !== undefined) updateFields['month.august'] = august;
        if (september !== undefined) updateFields['month.september'] = september;
        if (october !== undefined) updateFields['month.october'] = october;
        if (november !== undefined) updateFields['month.november'] = november;
        if (december !== undefined) updateFields['month.december'] = december;
        console.log('updateFields', updateFields);
        const updatedStudent = await studentschema.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // Return the modified document rather than the original
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, errorMsg: 'Student not found' });
        }

        res.json({
            success: true,
            data: updatedStudent,
            message: 'Student information updated successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errorMsg: 'Internal server error' });
    }
}
searchStudent = async (req, res) => {
    const { name } = req.params;
    try {
        // Use a regular expression for case-insensitive search
        const students = await studentschema.find({ name: { $regex: new RegExp(name, 'i') } });

        return res.json({ success: true, data: students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errorMsg: 'Internal server error' });
    }
}
module.exports = {
    login,
    createStudent,
    allStudent,
    deleteStudent,
    editStudent,
    searchStudent
};