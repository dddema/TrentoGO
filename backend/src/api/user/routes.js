import express from 'express'
import { authenticateToken } from '../auth/middleware.js'
import {
    userInfo,
    updatePreferences,
    updateCreditCardInfo,
    addFavouritePlace,
    deleteFavouritePlace,
    getCreditsCardInfo,
    updatePassword
} from './controller.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', userInfo)
router.patch('/preferences', updatePreferences)
router.get('/credit-card-info', getCreditsCardInfo)
router.put('/credit-card-info', updateCreditCardInfo)
router.patch('/password', updatePassword)

router.post('/favourites', addFavouritePlace)
router.delete('/favourites/:id', deleteFavouritePlace)

export default router