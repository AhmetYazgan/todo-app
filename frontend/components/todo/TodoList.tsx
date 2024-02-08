import React from "react";
import TodoItem from "./TodoItem";
import { Accordion } from "flowbite-react";
import Link from "next/link";
import { getAllTodos } from "./todos";

export const revalidate = 0;

export default async function TodoList() {
  const todos = await getAllTodos();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {todos.data ? (
        todos.data.length > 0 ? (
          <Accordion>
            {todos.data.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Accordion>
        ) : (
          <div className="text-center">
            <p className="mb-6 font-medium text-gray-800">
              Looks like you don't have any tasks right now
            </p>
            <Link
              href={"/add-todo"}
              className="bg-blue-600 text-white px-5 py-2 rounded-2xl cursor-pointer hover:bg-blue-600/90"
            >
              Create Todos
            </Link>
          </div>
        )
      ) : (
        <div className="text-center">
          <p className="font-medium text-gray-800">
            {`${todos.error} Please try again later.`}
          </p>
        </div>
      )}
    </div>
  );
}
