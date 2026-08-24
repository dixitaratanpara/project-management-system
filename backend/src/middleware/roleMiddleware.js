const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission.",
            });
        }
        next();
    };
};

export default roleMiddleware;