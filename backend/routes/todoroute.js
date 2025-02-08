import express from 'express';
import { addTodo, deleteTodo, getTodos, todoCompleted, updateTodo } from '../controller/todoController.js';
// import isAuth from '../midleware/isAuth.js';


const todoRouter = express.Router();
todoRouter.route("/getTodo").get(getTodos);
todoRouter.route("/addTodo").post(addTodo);
todoRouter.route("/updateTodo/:id").put(updateTodo);
todoRouter.route("/deleteTodo/:id").delete(deleteTodo);
todoRouter.route("/todo/:id").patch(todoCompleted);
export default todoRouter;