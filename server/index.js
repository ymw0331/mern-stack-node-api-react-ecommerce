import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import morgan from 'morgan'

dotenv.config() // to use config from .env

const app = express()

//db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => (
        console.log("MongoDB Error => ", err))
    )

// middlewares
app.use(morgan("dev"))
app.use(express.json())

// router middlewares
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`)
})

