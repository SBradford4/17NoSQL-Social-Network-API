import { Router } from 'express';
// import { courseRouter } from './courseRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

// router.use('/courses', courseRouter);
router.use('/users', userRouter);

export default router;
