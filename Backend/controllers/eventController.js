const db = require('../db');

exports.createEvent = (req, res) => {

    const { title, location, budget } = req.body;

    if (!title || !location || !budget) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    db.query(
        'INSERT INTO events(title,location,budget) VALUES(?,?,?)',
        [title, location, budget],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Event creation failed'
                });
            }

            res.json({
                success: true,
                message: 'Event created successfully'
            });
        }
    );
};