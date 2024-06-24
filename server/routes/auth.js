import express from 'express'

const router = express.Router()

// controllers
import { register, login } from '../controllers/auth.js'

// router.get('/users', users) //user controller
router.post('/register', register) //user controller
router.post('/login', login)

export default router