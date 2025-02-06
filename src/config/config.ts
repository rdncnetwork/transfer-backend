import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const _config = {
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGO_URI,
    env: process.env.NODE_ENV || 'production',
    version: process.env.API_VERSION || 'v1',
    message: process.env.MESSAGE || '',
    privateKey: process.env.PRIVATE_KEY || '',
    providerUrl: process.env.PROVIDER_URL || '',
    contractAddress: process.env.CONTRACT_ADDRESS || '',
}

export const config = Object.freeze(_config)
