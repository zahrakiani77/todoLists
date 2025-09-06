import { Check } from "lucide-react";
import useTaskStore from "../../stores/useTaskStore";
import type { taskModel } from "../../types/task.model";

type checkedProp={
    todo:taskModel;
}
const ChechedTask = ({ todo }: checkedProp) => {
  const { completeTask } = useTaskStore();
  return (
    <div className="size-4 rounded-4xl md:size-6">
      <div
        onClick={() => completeTask(todo.id, !todo.isDone)}
        className={`${todo.isDone ? `bg-gradient-to-r from-[#7C86FF] to-[#8C4BD2]` : `border-2 border-[#7C86FF]`} size-4 cursor-pointer rounded-4xl md:size-6`}
      >
        {todo.isDone ? <Check className="size-4 text-white md:size-6" /> : ""}
      </div>
    </div>
  );
};

export default ChechedTask