import React from 'react'
import TodoItem from './TodoItem'
import { Accordion } from 'flowbite-react'
import Link from 'next/link';
import { getAllTodos } from './todos';

export const revalidate = 0;

export default async function TodoList() {
  const todos = await getAllTodos();

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {todos.data ?
        (todos.data.length > 0 ?
          <Accordion>
            {todos.data.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </Accordion> :
          <div>
            <p>Looks like you don't have any task right now</p>
            <Link href={"/add-todo"}>Create Todos</Link>
          </div>
        ) :
        <div>
          <p>
            {`${todos.error} Please try again later.`}
          </p>
        </div>      
      }
    </div>
  )
}