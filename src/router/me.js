import express from 'express';
import {meController} from '../app/controller/MeController.js';

const meRouter = express.Router();

meRouter.get('/stored/courses', meController.storedCourses);
meRouter.get('/trash/courses', meController.trashCourses);

export default meRouter;