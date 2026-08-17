import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: Schema.Types.ObjectId;
  teamId?: Schema.Types.ObjectId | null;
  rank: number;
  points: number;
  streak: number;
  workoutsCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    streak: { type: Number, default: 0 },
    workoutsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'leaderboard' },
);

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
