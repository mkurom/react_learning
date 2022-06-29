import { useQuery } from 'react-query';

// import axios, { AxiosResponse } from 'axios';

export type TodoType = {
  userId: Number,
  id: Number,
  title: String,
  completed: boolean,
}

// const fetchTodosQueryFnWithAxios = async () =>
//   await axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
//     return res;
//   }
//   );

const fetchPaginatedTodosQueryFn = async (userId: Number) => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos?userId=' + userId);

  if (result.status !== 200) {
    throw new Error('fetch Error')
  }
  return result.json();
}

const fetchTodosQueryFn = async () => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (result.status !== 200) {
    throw new Error('fetch Error')
  }
  return result.json();
}

const fetchCompletedTodosQueryFn = async () => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos?completed=true');

  if (result.status !== 200) {
    throw new Error('fetch Error')
  }
  return result.json();
}

export const useTodoList = () => {

  const fetchTodoList = () => {
    console.log('fetch todos');

    return useQuery<TodoType[], Error>(
      'todos',
      // ['todos', { completed: true }],
      fetchTodosQueryFn,
      {
        notifyOnChangeProps: ["data"],
        refetchOnWindowFocus: false,
        // keepPreviousData: true,
      }
    );

    // // オブジェクトとして書くことも可能
    // return useQuery<TodoType[], Error>(
    //   {
    //     queryKey: 'todos',
    //     queryFn: fetchTodosQueryFn,
    //     ...{
    //       notifyOnChangeProps: ["data"],
    //       refetchOnWindowFocus: false,
    //     }
    //   }
    // );
  }

  const fetchPaginatedTodoList = async (page: number) => {
    return useQuery<TodoType[], Error>(
      ['todos', page],
      await fetchPaginatedTodosQueryFn(page),
      {
        notifyOnChangeProps: ["data"],
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      }
    );
  }

  return { fetchTodoList, fetchPaginatedTodoList };
}


