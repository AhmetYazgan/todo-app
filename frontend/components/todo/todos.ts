"use server";

import { NewTodo, Todo } from "@/lib/todo/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getAllTodos = async () => {
  const token = cookies().get("token");
  if (token) {
    const url = "http://127.0.0.1:8000/api/todos/";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.value}`,
        },
      });
      if (response.status === 200) {
        const data: Todo[] = response.data;
        return data;
      } else {
        const errorData = response.data;
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export const newTodo = async (todo: NewTodo) => {
  const token = cookies().get("token");
  if (token) {
    const url = "http://127.0.0.1:8000/api/todos/";
    try {
      const response = await axios.post(
        url,
        {
          task: todo.task,
          description: todo.description,
          is_done: todo.completed,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token.value}`,
          },
        }
      );
      if (response.status === 201) {
        const data: Todo = response.data;
        return { success: true, data: data };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log(error);
      }
      return { success: false, error: "An error occurred" };
    }
  } else {
    return { success: false, error: "An authentication error occured" };
  }
};

export const updateTodoStatus = async (
  id: FormDataEntryValue,
  status: FormDataEntryValue
) => {
  const token = cookies().get("token");
  if (token) {
    const url = `http://127.0.0.1:8000/api/todos/${id}/`;
    try {
      const response = await axios.patch(
        url,
        {
          is_done: !JSON.parse(status.toString()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token.value}`,
          },
        }
      );
      if (response.status === 200) {
        const data: Todo = response.data;
        return { success: true, data: data };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log(error);
      }
      return { success: false, error: "An error occurred" };
    }
  } else {
    return { success: false, error: "An authentication error occured" };
  }
};

export const editTodo = async (id: string, todo: NewTodo) => {
  const token = cookies().get("token");
  if (token) {
    const url = `http://127.0.0.1:8000/api/todos/${id}/`;
    try {
      const response = await axios.put(
        url,
        {
          task: todo.task,
          description: todo.description,
          is_done: todo.completed,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token.value}`,
          },
        }
      );

      if (response.status === 200) {
        const data: Todo = response.data;
        return { success: true };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log(error);
      }
      return { success: false, error: "An error occurred" };
    }
  } else {
    return { success: false, error: "An authentication error occured" };
  }
};

export const getTodo = async (id: string) => {
  const token = cookies().get("token");
  if (token) {
    const url = `http://127.0.0.1:8000/api/todos/${id}/`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.value}`,
        },
      });

      if (response.status === 200) {
        const data: Todo = response.data;
        return { success: true, data: data };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log(error);
      }
      return { success: false, error: "An error occurred" };
    }
  } else {
    return { success: false, error: "An authentication error occured" };
  }
};

export const deleteTodo = async (id: FormDataEntryValue) => {
  const token = cookies().get("token");
  if (token) {
    const url = `http://127.0.0.1:8000/api/todos/${id}/`;
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.value}`,
        },
      });
      if (response.status === 204) {
        return { success: true };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log(error);
      }
      return { success: false, error: "An error occurred" };
    }
  } else {
    return { success: false, error: "An authentication error occured" };
  }
};
