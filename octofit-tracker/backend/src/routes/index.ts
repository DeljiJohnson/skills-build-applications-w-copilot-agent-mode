import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

const router = Router();

const modelMap: Record<string, Model<any>> = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
};

const createResourceHandler = (resource: keyof typeof modelMap) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await modelMap[resource].find({}).lean();

      res.json({
        message: `${resource.charAt(0).toUpperCase()}${resource.slice(1)} route is ready`,
        resource,
        data,
        count: data.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Failed to load ${resource}`,
        error: error.message,
      });
    }
  };
};

router.get('/users/', createResourceHandler('users'));
router.get('/teams/', createResourceHandler('teams'));
router.get('/activities/', createResourceHandler('activities'));
router.get('/leaderboard/', createResourceHandler('leaderboard'));
router.get('/workouts/', createResourceHandler('workouts'));

router.get('/users', createResourceHandler('users'));
router.get('/teams', createResourceHandler('teams'));
router.get('/activities', createResourceHandler('activities'));
router.get('/leaderboard', createResourceHandler('leaderboard'));
router.get('/workouts', createResourceHandler('workouts'));

export default router;
