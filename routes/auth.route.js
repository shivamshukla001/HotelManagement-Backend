import express from 'express';
import { LoginUser, registerUser } from '../controllers/auth.controller.js';



const router = express.Router();

// router.get('/user', LoginUser);

router.post('/login',LoginUser)
router.post('/register',registerUser)

// router.put('/user/:id', updateUser)

// router.delete('/user/:id', deleteUser)

export default router