import db from '../connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password, name } = req.body;
        // Check if the username or email already exists in the database
        const existingUser = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        // If user exists, send an error response
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user into the database
        await db.query('INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, name]);
        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const login = (req, res) => {
    const sql = 'SELECT * FROM users WHERE username=?'
    db.query(sql, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json('user not found')
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if (!checkPassword) return res.status(400).json('wrong password')
        const token = jwt.sign({ id: data[0].id }, "secretkey")
        const { password, ...others } = data[0]
        res.cookie('accessToken', token, {
            httpOnly: true
        }).status(200).json(others)
    })
};
export const logout = (req, res) => { };
