import express from 'express'
import { signup, auth } from '../Controllers/UsersController'

const router = express.Router()

router.post('/', signup)
router.post('/auth', auth)

export default router
