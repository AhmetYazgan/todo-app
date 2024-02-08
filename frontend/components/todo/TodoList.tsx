import React from 'react'
import TodoItem from './TodoItem'
import { Accordion } from 'flowbite-react'
import Link from 'next/link';
import { getAllTodos } from './todos';
import { Todo } from '@/lib/todo/types';

export const revalidate = 0;

const RenderTodos = ({ todos }: { todos: Todo[] | undefined }) => {
  if (todos) {
    return (
      <Accordion>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </Accordion>
    )
  }
}

export default async function TodoList({ searchParams }: { searchParams: { sort?: string } }) {
  let todos = await getAllTodos();

  const sortedByCreatedDate = todos.data?.slice().sort((a, b) => {
    return new Date(searchParams.sort?.includes("-") ? b.created_date : a.created_date).getTime() - new Date(searchParams.sort?.includes("-") ? a.created_date : b.created_date).getTime();
  });

  const sortedByUpdatedDate = todos.data?.slice().sort((a, b) => {
    return new Date(searchParams.sort?.includes("-") ? b.updated_date : a.updated_date).getTime() - new Date(searchParams.sort?.includes("-") ? a.updated_date : b.updated_date).getTime();
  });

  function createSortQuery(sort: string | undefined) {
    if (!sort || sort.includes("updated_date")) {
      return "created_date";
    } else if (sort.includes("created_date") && !sort.includes("-")) {
      return "-created_date";
    } else {
      return "created_date";
    }
  }

  function updateSortQuery(sort: string | undefined) {
    if (!sort || sort.includes("created_date")) {
      return "updated_date";
    } else if (sort.includes("updated_date") && !sort.includes("-")) {
      return "-updated_date";
    } else {
      return "updated_date";
    }
  }


  if (!todos.data) {
    return (
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='text-center'>
          <p className='font-medium text-gray-800'>
            {`${todos.error} Please try again later.`}
          </p>
        </div>
      </div>
    )
  } else if (todos.data.length === 0) {
    return (
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='text-center'>
          <p className='mb-6 font-medium text-gray-800'>Looks like you don't have any tasks right now</p>
          <Link href={"/add-todo"} className='bg-blue-600 text-white px-5 py-2 rounded-2xl cursor-pointer hover:bg-blue-600/90'>Create Todos</Link>
        </div>
      </div>
    )
  } else {
    return (
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <main className='flex flex-col gap-4'>
          <div className='flex justify-between gap-2 sm:gap-4 items-center px-2'>
            <p className='text-xs sm:text-sm'>Sort By</p>
            <div className='flex gap-4'>
              <Link href={`/todos?sort=${createSortQuery(searchParams.sort)}`} className="text-xs font-light hover:underline">Created Date</Link>
              <Link href={`/todos?sort=${updateSortQuery(searchParams.sort)}`} className="text-xs font-light hover:underline">Updated Date</Link>
            </div>
          </div>
          <hr />
          {searchParams.sort ? (
            searchParams.sort.includes("created_date") ?
              <RenderTodos todos={sortedByCreatedDate} /> :
              <RenderTodos todos={sortedByUpdatedDate} />
          ) :
            <RenderTodos todos={todos.data} />
          }
        </main>
      </div>
    )
  }
}