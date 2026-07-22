import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const taskController = new TaskController();

router.use(authMiddleware);

router.get('/', taskController.getAll);
router.get('/summary', taskController.getSummary);
router.get('/:id', taskController.getOne);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;
