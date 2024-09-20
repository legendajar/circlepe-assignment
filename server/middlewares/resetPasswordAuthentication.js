import jwt from 'jsonwebtoken'

const resetPasswordAuthentication = () => {
    try {
        const token = req.cookies.resetPasswordToken
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        req.id = decoded.userId;
        next(); 
    } catch (err) {
        console.log(err)
    }
}

export default resetPasswordAuthentication