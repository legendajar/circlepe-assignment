import jwt from 'jsonwebtoken'

const isAuthenticated = async(req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }

    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        })
    }

    req.id = decoded.userId;
    next();
  } catch (err) {
    console.log(err)
    return res.status(501).json({
        success: false,
        message: "Authentication Failed"
    })
  }
}

export default isAuthenticated