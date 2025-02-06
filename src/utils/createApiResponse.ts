import { Response } from 'express'

const createApiResponse = (data: { [key: string]: any }, res: Response) => {
    return res.json(data)
}

export default createApiResponse
