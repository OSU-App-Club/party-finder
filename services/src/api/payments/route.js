import { Router } from 'express'
import paymentsController from './controller.js'

const router = Router()

router.post('/payment-sheet', paymentsController.createPaymentSheet)

export default router