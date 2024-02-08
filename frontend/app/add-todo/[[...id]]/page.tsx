import CreateTodo from "@/components/todo/CreateTodo";
import React from "react";

export default function AddTodo({ params }: { params: { id: string[] } }) {
  return <CreateTodo params={params.id} />;
}
