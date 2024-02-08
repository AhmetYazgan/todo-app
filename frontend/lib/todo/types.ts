export interface Todo {
  id: number;
  user: number;
  task: string;
  description: string | null;
  is_done: boolean;
  updated_date: string;
  created_date: string;
}

export interface NewTodo {
  task: string;
  description: string | null | undefined;
  completed: boolean;
}