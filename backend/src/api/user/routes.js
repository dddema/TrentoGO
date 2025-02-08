import express from 'express'
import { authenticateToken } from '../auth/middleware.js'
import { updatePreferences, updateCreditCardInfo, userInfo } from './controller.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', userInfo)
router.patch('/preferences', updatePreferences)
router.patch('/credit-card-info', updateCreditCardInfo)

export default router