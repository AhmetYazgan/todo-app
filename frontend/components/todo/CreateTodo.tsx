"use client";

import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { editTodo, getTodo, newTodo } from "./todos";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { revalidateTag } from 'next/cache';

export default function CreateTodo({
  params,
}: {
  params: string[] | undefined;
}) {
  const [todoValues, setTodoValues] = useState({
    task: "",
    description: "",
    completed: false,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (params && params.length > 1) {
      router.replace("/add-todo");
      toast.error("Couldn't find the todo");
    } else if (params) {
      getTodo(params[0])
        .then((result) => {
          if (result.success && result.data) {
            setTodoValues({
              task: result.data.task,
              description: result.data.description ?? "",
              completed: result.data.is_done,
            });
          } else {
            router.replace("/add-todo");
            toast.error(result.error ?? "");
          }
        })
        .catch((error) => {
          router.replace("/add-todo");
          toast.error(error);
        });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTodoValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoValues((prevValues) => ({
      ...prevValues,
      description: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoValues.task.trim() === "") {
      setError("This field can not be empty");
    } else if (!params) {
      newTodo(todoValues)
        .then((result) => {
          if (result.success) {
            setTodoValues({
              task: "",
              description: "",
              completed: false,
            });
            router.push("/todos");
            router.refresh();
            toast.success("Todo created successfully");
          } else {
            toast.error(result.error ?? "");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    } else if (params) {
      editTodo(params[0], todoValues)
        .then((result) => {
          if (result.success) {
            setTodoValues({
              task: "",
              description: "",
              completed: false,
            });
            router.push("/todos");
            router.refresh();
            toast.success("Todo updated successfully");
          } else {
            toast.error(result.error ?? "");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <section className="min-h-calc flex justify-center items-center">
      <form
        className="flex w-11/12 sm:w-[25rem] flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="task" value="Task" />
          </div>
          <TextInput
            id="task"
            type="text"
            name="task"
            color={error ? "failure" : ""}
            sizing="md"
            required
            onChange={handleInputChange}
            value={todoValues.task}
          />
          {!!error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            placeholder="Write a description..."
            name="description"
            rows={4}
            onChange={handleTextAreaChange}
            value={todoValues.description}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="completed"
            name="completed"
            onChange={handleInputChange}
            checked={todoValues.completed}
          />
          <Label htmlFor="completed">Completed</Label>
        </div>
        <Button type="submit">Add / Edit</Button>
      </form>
    </section>
  );
}
