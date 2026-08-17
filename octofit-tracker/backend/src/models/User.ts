import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  fitnessGoal: string;
  weeklyTargetMinutes: number;
  teamId?: Schema.Types.ObjectId | null;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fitnessGoal: {
      type: String,
      required: true,
      enum: ['Strength', 'Cardio', 'Endurance', 'Mobility', 'Weight Loss'],
    },
    weeklyTargetMinutes: { type: Number, default: 180 },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    location: { type: String, default: 'Seattle, WA' },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
