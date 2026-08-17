import { Schema, model, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  location: string;
  coach: string;
  goal: string;
  memberIds: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    sport: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);
