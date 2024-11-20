import mongoose from "mongoose"

const username = Bun.env.MONGO_DB_USERNAME || 'your user'
const password = Bun.env.MONGO_DB_PASSWORD || 'your password'
const db_name = Bun.env.MONGO_DBNAME || 'tinner_app'
const uri = `mongodb+srv://${username}:${password}@cluster0.8agjh.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log('Connected to MongoDB')

        } catch (error) {
            console.log('Error connecting to MongoDB')
            console.log(error)
        }
    }
}