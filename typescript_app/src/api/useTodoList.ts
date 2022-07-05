import { useQuery, useMutation } from 'react-query';
import { TodoType } from '../type/todoType';

import axios, { AxiosResponse } from 'axios';
import { string } from 'yup';

interface NewTodoType {
  id: number;
  title: string;
}

// const fetchTodosQueryFn = async () => {
//   const result = await fetch('https://jsonplaceholder.typicode.com/todos');

//   if (result.status !== 200) {
//     throw new Error('fetch Error')
//   }
//   return result.json();
// }

const fetchTodosQueryFn = () => axios.get<TodoType[]>('https://jsonplaceholder.typicode.com/todos').then(res => {
  return res.data;
});

const createTodoQueryFn = (body: NewTodoType) => axios.post<NewTodoType>('https://jsonplaceholder.typicode.com/todos', body).then(res => res.data);

export const useTodoList = () => {

  const fetchTodoList = () => {
    console.log('fetch todos');

    return useQuery<TodoType[], Error>(
      // queryKey
      'todos',
      // ['todos', { completed: true }],
      // queryFn
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

  const createTodo = async (body: NewTodoType) => await createTodoQueryFn(body);

  const createTodoWithMutation = () => useMutation<NewTodoType, Error, NewTodoType>(
    'newTodo',
    async (body: NewTodoType) => {
      const result = await createTodoQueryFn(body);
      return result;
    },
    {
      onSuccess: (todo) => {
        console.log('Mutation', todo);
      },
      onError(error, variables, context) {
        console.log('error', error.message);
      },
    }
  );

  const updateTodo = async (id: number, body: NewTodoType) => await axios.post(`https://jsonplaceholder.typicode.com/todos${id}`, body).then(res => res.data);

  return { fetchTodoList, createTodo, createTodoWithMutation, updateTodo };
}


