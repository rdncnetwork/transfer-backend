import mongoose from 'mongoose'
import { config } from './config'

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connection to MongoDB established')
        })
        mongoose.connection.on('error', (error) => {
            console.error(`Error: ${error.message}`)
        })

        await mongoose.connect(config.mongoURI as string)
    } catch (error) {
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB
