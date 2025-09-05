import type { taskModel } from "../types/task.model";
import tasksAPI from "./tasksAPI";

export default new tasksAPI<taskModel>("/todo-lists");