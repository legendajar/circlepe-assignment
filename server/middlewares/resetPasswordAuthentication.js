import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()
const resetPasswordAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.resetPasswordToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            });
        }

        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            });
        }


        req.id = decoded.userId; // Attach the userId to the request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export default resetPasswordAuthentication;
