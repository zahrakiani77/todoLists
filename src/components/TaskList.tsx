
import { Check, Trash } from "lucide-react";
import type { taskModel } from "../types/task.model";
import useTaskStore from "../stores/useTaskStore";


type TaskListProps = {
  tasks: taskModel[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
      const { completeTask, deleteTask } = useTaskStore();

  return (
    <section>
      <ul className="list rounded-box shadow-md">
        {tasks?.map((todo: taskModel) => (
          <li key={todo.id} className="list-row relative flex flex-row gap-4">
            <div className="size-6 rounded-4xl">
              <div
                onClick={() => completeTask(todo.id, !todo.isDone)}
                className={`${todo.isDone ? `bg-gradient-to-r from-[#7C86FF] to-[#8C4BD2]` : `border-2 border-[#7C86FF]`} size-6 cursor-pointer rounded-4xl`}
              >
                {todo.isDone ? <Check className="text-white" /> : ""}
              </div>
            </div>

            <p className={`${todo.isDone && "line-through"}`}>{todo.task}</p>

            <button className="absolute right-0 flex flex-row gap-4">
              <Trash
                onClick={() => {
                  deleteTask(todo.id);
                }}
                className="cursor-pointer mr-3"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
