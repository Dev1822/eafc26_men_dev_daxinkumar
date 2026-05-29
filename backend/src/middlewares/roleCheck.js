const roleCheck = (req, res, next) => {
    const role = req.headers['x-role'];

    if (role && role.toLowerCase() === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Forbidden: You do not have the required admin role to access this route."
        });
    }
};

module.exports = roleCheck;
