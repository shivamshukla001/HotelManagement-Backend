import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/Connectdb.js';
import User from './models/user.model.js';
import userRouter from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cors from 'cors';
dotenv.config();
const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This handles FormData
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add both ports
  credentials: true
}));

app.use('/api/v1', userRouter)
app.use('/api/v1', authRoute)

app.get('/api/v1/getAllInfo',async(req,res)=>{
  const booking = await User.find();
  res.send(booking)
})
app.get('/api/v1/getAllInfo/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
// app.get('/',(req,res)=>{
//     res.send("Hello world")
// })


app.listen(PORT, () => {
    connectDB();
    console.log(`server is listing at port 8000`);

})