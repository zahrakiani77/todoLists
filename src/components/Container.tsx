import { ArrowDownToDotIcon, Moon, Sun, Check, Edit, Trash } from "lucide-react";
import { useTheme } from "../stores/ThemeProvider";
import { useEffect, useState } from "react";
import { axiosInstance } from "./lib/utils";
import type { taskModel } from "../types/task.model";


const Container = () => {
      const { darkMode, toggleTheme} = useTheme();
      const [tasks, setTasks]=useState<taskModel[]>([]);
      const [task, setTask]=useState('');
      useEffect(()=>{
        axiosInstance
          .get<taskModel[]>("/todo-lists")
          .then((res) => setTasks(res.data));
      },[])

      console.log(tasks)
      const createTask=()=>{
        if(task){axiosInstance.post(
          "/todo-lists",
          { task },
          { headers: { "Content-Type": "application/json" } },
        ).then((res)=>{setTasks([res.data,...tasks])});            
        }
        setTask('')
      }
      const completeTest=(id:string|number)=>{
        const initialState={...tasks};

        setTasks(
          tasks.map((task) =>
            task.id === id ? {...task,isDone:!task.isDone } : task,
          ),
        );

        axiosInstance.patch(`todo-lists/${id}`,{isDone:true},{headers:{'Content-Type':'application/json'}})
        .then((res)=>setTasks(res.data))
        .catch(()=>setTasks(initialState));

      }
  return (
    <div className="flex w-full justify-center">
      <div className="absolute top-1/5 z-50 flex w-10/12 flex-col gap-10 md:w-2/3 lg:w-1/2">
        <header className="flex w-full flex-row content-between justify-between">
          <h1 className="text-3xl text-white text-shadow-lg/30 md:text-3xl lg:text-5xl">
            ToDo
          </h1>
          <div className="my-2 cursor-pointer" onClick={toggleTheme}>
            {darkMode ? (
              <Sun className="text-white md:size-8" />
            ) : (
              <Moon className="text-white md:size-8" />
            )}
          </div>
        </header>
        <section>
          <label className="input md:input-xl w-full">
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
              onClick={createTask}
            />
          </label>
        </section>
        <section>
          <ul className="list rounded-box shadow-md">
            {tasks.map((todo) => (
              <li className="list-row">
                <div className="flex flex-row gap-4">
                  <div
                    className="size-6 rounded-4xl"
                    onClick={() => completeTest(todo.id)}
                  >
                    <div
                      className={`${todo.isDone ? `bg-gradient-to-r from-[#7C86FF] to-[#8C4BD2]` : `border-2 border-[#7C86FF]`} size-6 cursor-pointer rounded-4xl`}
                    >
                      {todo.isDone && <Check className="text-white" />}
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-between text-lg">
                    <p
                      key={todo.id}
                      className={`${todo.isDone && "line-through"}`}
                    >
                      {todo.task}
                    </p>

                    <div className="flex flex-row">
                      <Edit />
                      <Trash />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Container