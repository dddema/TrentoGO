import express from 'express'
import { authenticateToken } from '../auth/middleware.js'
import { userInfo, updatePreferences, updateCreditCardInfo, addFavouritePlace, getCreditsCardInfo } from './controller.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', userInfo)
router.put('/preferences', updatePreferences)
router.get('/credit-card-info', getCreditsCardInfo)
router.patch('/credit-card-info', updateCreditCardInfo)

router.post('/favourites', addFavouritePlace)
router.delete('/favourites/:id', addFavouritePlace)

export default router