import { Todo } from "@/lib/todo/types";
import {
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import React from "react";

export default function TodoItem({ todo }: { todo: Todo }): JSX.Element {
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
          <div className="todo-container flex flex-col items-center justify-center text-center py-1.5 w-[135px]">
            <p
              className={`todo-btn effect01 ${
                todo.is_done ? "hover:bg-[#F44336]" : "hover:bg-[#4CAF50]"
              }`}
            >
              <span>{todo.is_done ? "Not Completed" : "Completed"}</span>
            </p>
          </div>
          <div className="todo-container flex flex-col items-center justify-center text-center py-1.5 w-[135px]">
            <p className="todo-btn effect01 hover:bg-blue-600">
              <span>Edit</span>
            </p>
          </div>
          <div className="todo-container flex flex-col items-center justify-center text-center py-1.5 w-[135px]">
            <p className="todo-btn effect01 hover:bg-zinc-950">
              <span>Delete</span>
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  );
}
