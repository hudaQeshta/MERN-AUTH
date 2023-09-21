import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await connect(process?.env?.MONGO_URI || '')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) errorMessage = error?.message
    console.error(`Error: ${errorMessage}`)
    process.exit(1)
  }
}

export default connectDB
