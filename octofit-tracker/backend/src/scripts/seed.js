"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
/**
 * Seed the octofit-tracker database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('✓ Connected to octofit-tracker database');
        // TODO: Add seed data for users, teams, activities, leaderboard, and workouts
        console.log('✓ Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('✗ Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map