import express from 'express';

import { createUser, deleteUser, getAlluser, updateUser } from '../controllers/user.controller.js';

import upload from '../middleware/multer.js';
const router = express.Router();

router.get('/user', getAlluser);

router.post('/user',upload.single('idProof'), createUser)

router.put('/user/:id', updateUser)

router.delete('/user/:id', deleteUser)

export default router