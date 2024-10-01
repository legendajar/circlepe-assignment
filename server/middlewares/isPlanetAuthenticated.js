import jwt from 'jsonwebtoken'

const isPlanetAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.planetToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        req.id = decoded.planetId;
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default isPlanetAuthenticated