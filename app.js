


import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/Connectdb.js';  // ← Move UP
import User from './models/user.model.js';
import userRouter from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cors from 'cors';

dotenv.config();
const app = express();

// CONNECT DB FIRST
connectDB();  // ← Move HERE (before listen)

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: ['http://localhost:5173', 'https://hotel-management-frontend-omega.vercel.app'], 
  credentials: true
}));

app.use('/api/v1', userRouter);
app.use('/api/v1', authRoute);

app.get('/api/v1/getAllInfo', async(req,res)=>{
  const booking = await User.find();
  res.send(booking);
});


app.get('/api/v1/getAllInfo/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
// ... other routes

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
