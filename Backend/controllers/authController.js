const db = require('../db');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters'
        });
    }

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, result) => {

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)',
                [name, email, hashedPassword, role],
                (err, data) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: 'Signup failed'
                        });
                    }

                    res.json({
                        success: true,
                        message: 'Signup successful'
                    });
                }
            );
        }
    );
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, result) => {

            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const user = result[0];

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            res.json({
                success: true,
                message: 'Login successful',
                user
            });
        }
    );
};