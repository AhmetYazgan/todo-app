import React from "react";
import TodoItem from "./TodoItem";
import { Accordion } from "flowbite-react";
import { getAllTodos } from "./todos";
import Link from "next/link";

export default async function TodoList() {
  const todos = await getAllTodos();
  console.log(todos);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {todos ? (
        <Accordion>
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </Accordion>
      ) : (
        <div>
          <p>Looks like you don't have any task right now</p>
          <Link href={"/add-todo"}>Create Todos</Link>
        </div>
      )}
    </div>
  );
}
