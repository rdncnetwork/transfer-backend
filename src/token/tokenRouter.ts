import express from 'express'
import { tokenTransfer } from './tokenController'

const tokenRouter = express.Router()

tokenRouter.post('/transfer', tokenTransfer)

export default tokenRouter
