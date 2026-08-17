import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

/**
 * Seed the octofit-tracker database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('✓ Connected to octofit-tracker database');

    // TODO: Add seed data for users, teams, activities, leaderboard, and workouts

    console.log('✓ Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
