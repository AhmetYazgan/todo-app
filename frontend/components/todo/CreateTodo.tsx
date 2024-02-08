'use client';

import { Button, Checkbox, Label, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { newTodo } from './todos';
import { useRouter } from 'next/navigation';

export default function CreateTodo() {
  const [todoValues, setTodoValues] = useState({
    task: "",
    description: "",
    completed: false
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTodoValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));    
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoValues(prevValues => ({
      ...prevValues,
      description: e.target.value
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todoValues.task.trim() === "") {
      setError("This field can not be empty");
    } else {
      newTodo(todoValues).then(result => {
        if(result.success) {
          setTodoValues({
            task: "",
            description: "",
            completed: false
          });
          router.push('/todos');
        } else {
          console.log(result.error);
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  } 

  return (
    <section className='min-h-screen flex justify-center items-center'>
      <form className="flex w-11/12 sm:w-[25rem] flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="task" value="Task" />
          </div>
          <TextInput id="task" type="text" name='task' color={error ? "failure" : ""} sizing="md" required onChange={handleInputChange} />
          {!!error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea id="description" placeholder="Write a description..." name='description' rows={4} onChange={handleTextAreaChange} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="completed" name='completed' onChange={handleInputChange} />
          <Label htmlFor="completed">Completed</Label>
        </div>
        <Button type="submit">Add / Edit</Button>
      </form>
    </section>
  );
}