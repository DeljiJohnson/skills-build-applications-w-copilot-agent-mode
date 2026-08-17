import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/*
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('✓ Connected to MongoDB at', connectionString);

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Momentum Crew',
        sport: 'Hybrid Fitness',
        location: 'Seattle, WA',
        coach: 'Coach Ramirez',
        goal: 'Build consistency and accountability',
        memberIds: [],
      },
      {
        name: 'Trail Blazers',
        sport: 'Endurance',
        location: 'Portland, OR',
        coach: 'Coach Nguyen',
        goal: 'Improve long-distance performance',
        memberIds: [],
      },
    ]);

    const users = await User.insertMany([
      {
        firstName: 'Ava',
        lastName: 'Johnson',
        email: 'ava.johnson@example.com',
        fitnessGoal: 'Strength',
        weeklyTargetMinutes: 240,
        location: 'Seattle, WA',
        teamId: teams[0]._id,
      },
      {
        firstName: 'Noah',
        lastName: 'Smith',
        email: 'noah.smith@example.com',
        fitnessGoal: 'Cardio',
        weeklyTargetMinutes: 210,
        location: 'Seattle, WA',
        teamId: teams[0]._id,
      },
      {
        firstName: 'Mila',
        lastName: 'Chen',
        email: 'mila.chen@example.com',
        fitnessGoal: 'Endurance',
        weeklyTargetMinutes: 260,
        location: 'Portland, OR',
        teamId: teams[1]._id,
      },
      {
        firstName: 'Leo',
        lastName: 'Martinez',
        email: 'leo.martinez@example.com',
        fitnessGoal: 'Mobility',
        weeklyTargetMinutes: 180,
        location: 'Portland, OR',
        teamId: teams[1]._id,
      },
    ]);

    for (const team of teams) {
      const memberIds = users
        .filter((user) => user.teamId?.toString() === team._id.toString())
        .map((user) => user._id);

      await Team.findByIdAndUpdate(team._id, { memberIds });
    }

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Strength',
        durationMinutes: 45,
        caloriesBurned: 420,
        distanceKm: 0,
        date: new Date('2026-08-15T06:30:00.000Z'),
        notes: 'Upper body and core circuit',
      },
      {
        userId: users[1]._id,
        type: 'Running',
        durationMinutes: 38,
        caloriesBurned: 510,
        distanceKm: 6.1,
        date: new Date('2026-08-16T07:00:00.000Z'),
        notes: 'Tempo run around Lake Union',
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 52,
        caloriesBurned: 640,
        distanceKm: 18.4,
        date: new Date('2026-08-14T18:15:00.000Z'),
        notes: 'Hill intervals and cadence work',
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        distanceKm: 0,
        date: new Date('2026-08-12T08:00:00.000Z'),
        notes: 'Mobility and recovery flow',
      },
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        rank: 1,
        points: 980,
        streak: 12,
        workoutsCompleted: 18,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        rank: 2,
        points: 940,
        streak: 9,
        workoutsCompleted: 16,
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        rank: 3,
        points: 910,
        streak: 10,
        workoutsCompleted: 15,
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        rank: 4,
        points: 870,
        streak: 7,
        workoutsCompleted: 13,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Circuit',
        category: 'HIIT',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        focusArea: ['Cardio', 'Legs', 'Core'],
        equipment: ['Jump rope', 'Mat', 'Dumbbells'],
        description: 'Fast-paced intervals with strength and conditioning work.',
      },
      {
        name: 'Mobility Flow',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        focusArea: ['Hips', 'Back', 'Shoulders'],
        equipment: ['Yoga mat'],
        description: 'A recovery-focused session to improve flexibility and reduce tightness.',
      },
      {
        name: 'Trail Endurance Builder',
        category: 'Cardio',
        difficulty: 'Advanced',
        durationMinutes: 45,
        focusArea: ['Endurance', 'Stamina'],
        equipment: ['Trail shoes'],
        description: 'Progressive aerobic intervals designed for longer outdoor efforts.',
      },
    ]);

    console.log('✓ Seed complete: inserted users, teams, activities, leaderboard, workouts');
    console.log('Created users:', users.length);
    console.log('Created teams:', teams.length);
    console.log('Created activities:', activities.length);
    console.log('Created leaderboard entries:', leaderboardEntries.length);

    await mongoose.disconnect();
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
