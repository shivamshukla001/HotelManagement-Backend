import Auth from "../models/auth.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await Auth.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const checkpass = await bcrypt.compare(password, user.password)
        if (!checkpass) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        res.status(200).json(user)

    } catch (error) {
        console.log(error);

    }
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "Please fill all the fields" })
        }
        const user = await Auth.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Auth({ name, email, password: hashedPassword })
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const dammuser = {id: newUser._id,name, email, token}
        res.setHeader('Authorization', `Bearer ${token}`);
        // res.status(200).json({ token })
        res.status(200).json( dammuser)
    } catch (error) {
        console.log(error);

    }
}