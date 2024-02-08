import { Todo } from "@/lib/todo/types";
import {
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import React from "react";
import { deleteTodo, updateTodoStatus } from "./todos";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function TodoItem({ todo }: { todo: Todo }): JSX.Element {
  const handleComplete = async (data: FormData) => {
    "use server";
    const id = data.get("id");
    const status = data.get("status");
    if (id && status) {
      const result = await updateTodoStatus(id, status);
      if (result.success) {
        revalidatePath("/todos");
      } else {
        console.log(result.error);
      }
    }
  };

  const handleDelete = async (data: FormData) => {
    "use server";
    const id = data.get("todoId");
    if (id) {
      const result = await deleteTodo(id);
      if (result.success) {
        revalidatePath("/todos");
      } else {
        console.log(result.error);
      }
    }
  };

  return (
    <AccordionPanel>
      <AccordionTitle
        className={`text-white ${
          todo.is_done
            ? "bg-[#4CAF50] hover:bg-[#4CAF50]/90"
            : "bg-[#F44336] hover:bg-[#F44336]/90"
        }`}
      >
        {todo.task}
      </AccordionTitle>
      <AccordionContent
        className={`${todo.is_done ? "bg-[#4CAF50]/25" : "bg-[#F44336]/25"}`}
      >
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          {todo?.description ||
            "No description. Click to edit and add description."}
        </p>
        <div className="todo-buttons flex flex-wrap text-center justify-center w-full h-full sm:justify-start">
          <form
            action={handleComplete}
            className="todo-container flex flex-col items-center justify-center text-center py-1.5 w-[135px]"
          >
            <input name="id" className="hidden" value={todo.id} readOnly />
            <input
              name="status"
              className="hidden"
              value={`${todo.is_done}`}
              readOnly
            />
            <button
              className={`todo-btn effect01 ${
                todo.is_done ? "hover:bg-[#F44336]" : "hover:bg-[#4CAF50]"
              }`}
            >
              <span>{todo.is_done ? "Not Completed" : "Completed"}</span>
            </button>
          </form>
          <div className="todo-container flex flex-col items-center justify-center text-center py-1.5 w-[135px]">
            <Link
              href={`/add-todo/${todo.id}`}
              className="todo-btn effect01 hover:bg-blue-600"
            >
              <span>Edit</span>
            </Link>
          </div>
          <form
            action={handleDelete}
            className="todo-container flex flex-col items-center justify-center text-center py-1.5 w-[135px]"
          >
            <input name="todoId" className="hidden" value={todo.id} readOnly />
            <button
              className="todo-btn effect01 hover:bg-zinc-950"
              type="submit"
            >
              <span>Delete</span>
            </button>
          </form>
        </div>
      </AccordionContent>
    </AccordionPanel>
  );
}
