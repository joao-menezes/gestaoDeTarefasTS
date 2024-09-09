import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksFromId
} from '../controllers/taskController';
import {
  createUser,
  deleteUser,
  getUser,
  getUsersFromId,
  updateUser
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authToken";
import HttpCodes from "http-status-codes";

const router = Router();

/**
 * @swagger
 *  /api/tasks:
 *   get:
 *     summary: Get All Tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: JWT
 *         required: true
 *         description: JWT of the account to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Task title
 *                   completed:
 *                     type: boolean
 *                     example: false
 */
router.get('/tasks', authenticateToken, getTasks);

/**
 * @swagger
 * /api/task/{taskId}:
 *   get:
 *     summary: Get Task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Task title
 *                 completed:
 *                   type: boolean
 *                   example: false
 */
router.get('/task/:taskId', getTasksFromId);

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a New Task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Task
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/task', createTask);

/**
 * @swagger
 * /api/task/{taskId}:
 *   put:
 *     summary: Update Task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put('/task/:taskId', updateTask);

/**
 * @swagger
 * /api/task/{taskId}:
 *   delete:
 *     summary: Delete Task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully
 */
router.delete('/task/:taskId', deleteTask);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get All Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 962241cf-d976-4eee-a2e6-28b480f4ea56
 *                   name:
 *                     type: string
 *                     example: Jon Doe
 *                   email:
 *                     type: string
 *                     example: jon.doe@gmail.com
 */
router.get('/users', getUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 962241cf-d976-4eee-a2e6-28b480f4ea56
 *                 name:
 *                   type: string
 *                   example: Jon Doe
 *                 email:
 *                   type: string
 *                   example: jon.doe@gmail.com
 */
router.get('/user/:userId', getUsersFromId);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a New User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jon Doe
 *               email:
 *                 type: string
 *                 example: jon.doe@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/user', createUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     summary: Update User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jon Doe
 *               email:
 *                 type: string
 *                 example: jon.doe@gmail.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/user/:userId', updateUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
router.delete('/user/:userId', deleteUser);

/**
 * @swagger
 * /api/health-check:
 *   get:
 *     summary: Health Check Endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server health status
 */
router.get('/health-check', (req, res) => {
  res.status(HttpCodes.OK).send('Server is healthy');
});

export default router;
