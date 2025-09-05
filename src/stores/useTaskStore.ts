import { create } from "zustand";
import type { taskModel } from "../types/task.model";
import tasksService from "../lib/tasks-service";
import toast from "react-hot-toast";


type taskStoreModel = {
  tasks: taskModel[];
  isLoading: boolean;
  error: string | null;
  GetAllTask: (controller?: AbortController) => Promise<void>;
  CreateTask: (newTask: string) => Promise<void>;
  completeTask: (id: number | string, isDone: boolean) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
};


const useTaskStore = create<taskStoreModel>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  GetAllTask: async () => {
    set({ isLoading: true, error: null });
    const controller = new AbortController();

    try {
      const res = await tasksService.getAll(controller);
      set({ tasks: res.data, isLoading: false });
    } catch (err: any) {
      toast.error("Oops, something went wrong!");
      set({ error: err.message , isLoading: false });
    }
  },
  CreateTask: async (newTask: string) => {
    if (!newTask) return;
    set((state) => ({
      tasks: [
        {
          id: 0,
          task: newTask,
          isDone: false,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
        },
        ...state.tasks,
      ],
    }));

    try {
      const res = await tasksService.create({ task: newTask });
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === 0 ? res.data : t)),
      }));
      toast.success("Done :)");
    } catch (error) {
      toast.error("Oops, something went wrong :(");
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== 0),
      }));
    }
  },
  completeTask: async (id: number|string, isDoneTask: boolean) => {
    const { tasks } = get();
    const initialState = [...tasks];

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isDone: isDoneTask } : t,
      ),
    }));

    try {
      const res = await tasksService.patch(id, { isDone: isDoneTask });
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? res.data : t)),
      }
    ));
    toast.success("Done :)");
    } catch (error) {
     toast.error("Oops, something went wrong!");
      set({ tasks: initialState });
    }
  },
  deleteTask: async (id: number | string) => {
    const { tasks } = get();
    const initialState = [...tasks];

    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));

    try {
      await tasksService.delete(id);
      toast.success("Done :)");
    } catch (error) {
      toast.error("Oops, something went wrong!");
      set({ tasks: initialState });
    }
  },
}));

export default useTaskStore;