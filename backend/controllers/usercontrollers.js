import Users from "../models/usersmodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// **REGISTER**
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Cek apakah email sudah terdaftar
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru
        const user = await Users.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **LOGIN**
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Cek password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Simpan token di cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 hari
        });

        res.json({ message: "Login successful", userId: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **LOGOUT**
export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

// **GET ALL USERS (PROTECTED)**
export const getUser = async (req, res) => {
    try {
        const users = await Users.findAll({ attributes: ["id", "name", "email"] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **GET USER BY ID (PROTECTED)**
export const getUserById = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id, { attributes: ["id", "name", "email"] });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **UPDATE USER PROFILE (PROTECTED)**
export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const user = await Users.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **DELETE USER (PROTECTED)**
export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
        res.clearCookie("token");
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
