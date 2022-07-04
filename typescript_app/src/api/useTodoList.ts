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

const fetchTodosQueryFnWithAxios = async () =>
  await axios.get<TodoType[]>('https://jsonplaceholder.typicode.com/todos').then(res => {
    return res.data;
  });

export const useTodoList = () => {

  const fetchTodoList = () => {
    console.log('fetch todos');

    return useQuery<TodoType[], Error>(
      // queryKey
      'todos',
      // ['todos', { completed: true }],

      // queryFn
      // fetchTodosQueryFn,
      fetchTodosQueryFnWithAxios,
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

  const createTodo = async (body: NewTodoType) => await axios.post('https://jsonplaceholder.typicode.com/todos', body).then(res => res.data);

  const updateTodo = async (id: number, body: NewTodoType) => await axios.post(`https://jsonplaceholder.typicode.com/todos${id}`, body).then(res => res.data);


  return { fetchTodoList, createTodo, updateTodo };
}


