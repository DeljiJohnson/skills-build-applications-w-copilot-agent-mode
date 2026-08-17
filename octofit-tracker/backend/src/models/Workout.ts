import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  focusArea: string[];
  equipment: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Cardio', 'Strength', 'Mobility', 'Recovery', 'HIIT'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 15 },
    focusArea: [{ type: String, trim: true }],
    equipment: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
