import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

    await mongoose.connect(mongoURI);
    console.log('✓ MongoDB connected successfully on port 27017 to octofit_db');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
