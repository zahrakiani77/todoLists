
import { ArrowDownToDotIcon, Check, Edit, Trash } from "lucide-react";
import type { taskModel } from "../types/task.model";
import useTaskStore from "../stores/useTaskStore";
import ChechedTask from "./ui/ChechedTask";
import { useState } from "react";


type TaskListProps = {
  tasks: taskModel[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
//  const[isEdit,setIsEdit]=useState(false);
   //const [task, setTask] = useState('');
      const { deleteTask ,updateTask } = useTaskStore();
     // const editTask=(id:string|number, task:string)=>{
       // updateTask(id,task);
       // setTask('');
      //}
      //const toggleEdit=(id:number|string)=>{
      //  const task = tasks.find((t) => t.id === id);
      //  setIsEdit(Boolean(task));
      //}
      
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const startEdit = (task) => {
    setEditTaskId(task.id);
    setEditedText(task.text);
  };

  const saveEdit = (id,task) => {
    // اینجا باید متن ویرایش شده رو ذخیره کنی (مثلا به سرور بفرستی یا state به روز بشه)
    updateTask(id, task);
    setEditTaskId(null); // خارج شدن از حالت ویرایش
  };

  return (
    <section>
      <ul className="list rounded-box shadow-md">
        {tasks?.map((todo: taskModel) => (
          <li key={todo.id} className="list-row relative flex flex-row items-center gap-4">
            <ChechedTask todo={todo} />
            {editTaskId === todo.id ? (
              <input
                type="text"
                placeholder="create a new todo..."
                className="input input-primary input-sm md:input-md"
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
                  className="mr-3 size-4 md:size-5 cursor-pointer text-[#69bf64]"
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
