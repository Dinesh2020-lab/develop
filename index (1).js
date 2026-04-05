import mongoose from 'mongoose'

export async function connectDB() {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`)

    mongoose.connection.on('disconnected', () =>
      console.warn('⚠️  MongoDB disconnected'))
    mongoose.connection.on('error', (err) =>
      console.error('❌ MongoDB error:', err.message))
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message)
    console.error('   Check your MONGODB_URI in .env')
    process.exit(1)
  }
}
