import { Router } from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTasksFromId
} from '../controllers/taskController';
import {createUser, deleteUser, getUser, getUsersFromId, updateUser} from "../controllers/userController";
import {authenticateToken} from "../../middleware/authToken";

const router = Router();

router.get('/tasks', authenticateToken , getTasks);
router.get('/task/:taskId', getTasksFromId);
router.post('/task', createTask);
router.put('/task/:taskId', updateTask);
router.delete('/task/:taskId', deleteTask);

router.get('/users', getUser);
router.get('/user/:userId', getUsersFromId);
router.post('/user', createUser);
router.put('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);

export default router;
