import {Router} from 'express';
import {courseController} from '../app/controller/CourseController.js';

const courseRouter = Router();

courseRouter.get('/create', courseController.create);
courseRouter.post('/store', courseController.store);
courseRouter.get('/:id/edit', courseController.edit);
courseRouter.put('/:id', courseController.update);
courseRouter.patch('/:id/restore', courseController.restore);
courseRouter.delete('/:id', courseController.destroy);
courseRouter.delete('/:id/force', courseController.forceDestroy);
courseRouter.get('/:slug', courseController.show);

export default courseRouter;