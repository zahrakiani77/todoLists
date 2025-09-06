import { useEffect, useState } from "react";
import useTaskStore from "../stores/useTaskStore";
import { ArrowDownToDotIcon } from "lucide-react";
import { TaskList } from "./TaskList";
import Header from "./Header";


const Container = () => {
  const { tasks, isLoading, GetAllTask ,CreateTask } = useTaskStore();
  const [task, setTask] = useState("");
  useEffect(() => {
  const controller = new AbortController();
  GetAllTask();
  return () => controller.abort();
}, [GetAllTask]);

    const addTask = () => {
         CreateTask(task);
          setTask(""); 
        };
  return (
    <div className="flex w-full justify-center shadow-2xl overflow-x-hidden">
      <div className="absolute top-1/5 z-50 flex w-10/12 flex-col gap-10 md:w-2/3 lg:w-1/2">
        <Header />
        <section className="input md:input-xl w-full shadow-2xl">
          <div className="size-6 rounded-4xl border-2 border-[#7C86FF]"></div>
          <input
            type="text"
            placeholder="create a new todo..."
            className="input input-primary md:input-lg"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <ArrowDownToDotIcon
            className="cursor-pointer text-[#69bf64]"
            onClick={addTask}
          />
        </section>
        {isLoading ? (
          <div className="flex h-[calc(100vh-25rem)] flex-col items-center justify-center gap-5">
            <span className="loading loading-infinity loading-xl text-primary"></span>
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  );
}


export default Container