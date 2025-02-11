import db from '../config/db.js';
import {
    GET_ALL_USERS,
    GET_USER_BY_ID,
    INSERT_USER,
    UPDATE_USER,
    DELETE_USER
} from '../queries/userQueries.js';

const { pool } = db;

// Get all users
export const fetchUsers = async () => {
    const result = await pool.query(GET_ALL_USERS);
    return result.rows;
};

// Get user by ID
export const findUserById = async (id) => {
    const result = await pool.query(GET_USER_BY_ID, [id]);
    return result.rows[0];
};

// Insert a new user
export const insertUser = async (data) => {
    const { userid, name, email, phone, status, employee_type, project } = data;

    if (!userid) {
        throw new Error("User ID is required and cannot be null.");
    }

    await pool.query(INSERT_USER, [
        userid, name, email, phone, status, employee_type, project
    ]);

    return { message: "User inserted successfully" };
};

// Update an existing user
export const updateUser = async (id, data) => {
    const { name, email, phone, status, employee_type, project } = data;

    const result = await pool.query(UPDATE_USER, [
        name, email, phone, status, employee_type, project, id
    ]);

    if (result.rowCount === 0) {
        throw new Error("User not found or not updated");
    }

    return { message: "User updated successfully" };
};

// Delete a user
export const deleteUser = async (id) => {
    const result = await pool.query(DELETE_USER, [id]);

    if (result.rowCount === 0) {
        throw new Error("User not found or already deleted");
    }

    return { message: "User deleted successfully" };
};
