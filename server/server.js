import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import AdminRoute from './routes/admin.route.js'
import PlanetRoute from './routes/planet.route.js'
import SpaceStationRoute from './routes/spaceStation.route.js'
import OrderRoute from './routes/order.route.js'
import ProductRoute from './routes/product.route.js'
import TransactionRoute from './routes/transaction.route.js'
import { connectDB } from './db/db.config.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT;

// Database Connection
connectDB();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173', 'https://circlepe-assignment-frontend.vercel.app']
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true
};
app.use(cors(corsOptions))


// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Integaltic Trade Network"
    })
})

app.use('/api/admin', AdminRoute)
app.use('/api/planet', PlanetRoute)
app.use('/api/spaceStation', SpaceStationRoute)
app.use('/api/order', OrderRoute)
app.use('/api/product', ProductRoute)
app.use('/api/transaction', TransactionRoute)


// Server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})