
import { Check, Trash } from "lucide-react";
import type { taskModel } from "../types/task.model";
import useTaskStore from "../stores/useTaskStore";
import ChechedTask from "./ui/ChechedTask";


type TaskListProps = {
  tasks: taskModel[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
      const { deleteTask } = useTaskStore();

  return (
    <section>
      <ul className="list rounded-box shadow-md">
        {tasks?.map((todo: taskModel) => (
          <li key={todo.id} className="list-row relative flex flex-row gap-4">
            <ChechedTask todo={todo}/>

            <p className={`${todo.isDone && "line-through"}`}>{todo.task}</p>

            <button className="absolute right-0 flex flex-row gap-4">
              <Trash
                onClick={() => {
                  deleteTask(todo.id);
                }}
                className="mr-3 size-4 cursor-pointer md:size-5"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
