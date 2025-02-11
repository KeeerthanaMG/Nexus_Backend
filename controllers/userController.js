import {
    fetchUsers,
    findUserById,
    insertUser,
    updateUser,
    deleteUser
} from '../services/userServices.js';
import { handleError, handleSuccess } from '../errorHandler/errorHandler.js';

// Get all users
export async function getUsers(req, res) {
    try {
        const users = await fetchUsers();
        handleSuccess(res, users, 200, "Users retrieved successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Get user by ID
export async function getUserById(req, res) {
    const userId = req.params.id;

    if (!userId) {
        return handleError(res, new Error("User ID is required"), 400, "User ID is required");
    }

    try {
        const user = await findUserById(userId);
        if (!user) {
            return handleError(res, new Error("User not found"), 404, "User not found");
        }
        res.json(user);
    } catch (err) {
        handleError(res, err);
    }
}

// Create a new user
export async function createUser(req, res) {
    try {
        const newUser = await insertUser(req.body);
        handleSuccess(res, newUser, 201, "User added successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Update a user
export async function updateUserById(req, res) {
    const userId = req.params.id;

    try {
        const updatedUser = await updateUser(userId, req.body);
        handleSuccess(res, updatedUser, 200, "User updated successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Delete a user
export async function deleteUserById(req, res) {
    const userId = req.params.id;

    try {
        const deletedUser = await deleteUser(userId);
        handleSuccess(res, deletedUser, 200, "User deleted successfully");
    } catch (err) {
        handleError(res, err);
    }
}
