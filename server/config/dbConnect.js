import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', false);

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    console.log(`MongoDB connected to ${connected.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // You can throw the error for the calling code to handle
    throw error;
  }
};

export default dbConnect;
