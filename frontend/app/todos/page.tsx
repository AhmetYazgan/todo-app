import TodoList from "@/components/todo/TodoList";
import React from "react";

export const revalidate = 0;

export default function Todos( { searchParams }: { searchParams: { sort?: string } }) {
  return <TodoList searchParams={searchParams} />
}
