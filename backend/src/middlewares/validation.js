const validation = (req, res, next) => {
    const { name, age } = req.query;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Validation Error: 'name' query parameter is required and must be a non-empty string."
        });
    }

    if (!age || isNaN(age) || Number(age) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Validation Error: 'age' query parameter is required and must be a valid positive number."
        });
    }

    next();
};

module.exports = validation;
