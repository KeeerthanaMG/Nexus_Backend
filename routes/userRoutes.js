import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} from '../controllers/userController.js';

const router = express.Router();

// Routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
