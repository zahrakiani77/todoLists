
import { ArrowDownToDotIcon, Edit, Trash } from "lucide-react";
import type { taskModel } from "../types/task.model";
import useTaskStore from "../stores/useTaskStore";
import ChechedTask from "./ui/ChechedTask";
import { useState } from "react";


type TaskListProps = {
  tasks: taskModel[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [editTaskId, setEditTaskId] = useState<string|number>(0);
  const [editedText, setEditedText] = useState("");

  const startEdit = (task: taskModel) => {
    setEditTaskId(task.id);
    setEditedText(task.task);
  };

  const saveEdit = (id:number|string,task:string) => {
    updateTask(id, task);
    setEditTaskId(''); 
  };

  return (
    <section>
      <ul className="list rounded-box shadow-md">
        {tasks?.map((todo: taskModel) => (
          <li
            key={todo.id}
            className="list-row relative flex flex-row items-center gap-4"
          >
            <ChechedTask todo={todo} />
            {editTaskId === todo.id ? (
              <input
                type="text"
                placeholder="create a new todo..."
                className="input input-ghost input-sm md:input-md"
                onChange={(e) => setEditedText(e.target.value)}
                defaultValue={todo.task}
              />
            ) : (
              <p className={`${todo.isDone && "line-through"}`}>{todo.task}</p>
            )}

            <button className="absolute right-0 flex flex-row gap-4">
              <Trash
                onClick={() => {
                  deleteTask(todo.id);
                }}
                className="mr-3 size-4 cursor-pointer md:size-5"
              />
              {editTaskId === todo.id ? (
                <ArrowDownToDotIcon
                  className="mr-3 size-4 cursor-pointer text-[#69bf64] md:size-5"
                  onClick={() => saveEdit(todo.id, editedText)}
                />
              ) : (
                <Edit
                  onClick={() => {
                    startEdit(todo);
                  }}
                  className="mr-3 size-4 cursor-pointer md:size-5"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
