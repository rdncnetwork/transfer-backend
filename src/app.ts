import express, { Request, Response } from 'express'
import { config } from './config/config'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import tokenRouter from './token/tokenRouter'
import createApiResponse from './utils/createApiResponse'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    return createApiResponse(
        {
            message: 'Welcome to the API',
        },
        res
    )
})

app.use(`/api/${config.version}/tokens`, tokenRouter)

// This is the global error handler middleware
app.use(globalErrorHandler)

export default app
