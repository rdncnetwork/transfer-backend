import { NextFunction } from 'express'
import createHttpError from 'http-errors'

const createApiError = (
    status: number,
    message: string,
    next: NextFunction
) => {
    const error = createHttpError(status, message)
    return next(error)
}

export default createApiError
