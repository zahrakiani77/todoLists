export type taskModel = {
  id: string | number;
  task: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

export type taskPayload = {
  task: string;
};

export type UpdateTaskPayload = {
  task?: string;
  isDone?: boolean;
};