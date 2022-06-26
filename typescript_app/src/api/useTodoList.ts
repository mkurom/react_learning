import {
  useQuery
} from 'react-query';

type TodoType = {
  userId: Number,
  id: Number,
  title: String,
  completed: boolean,
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

// TODO:要確認
// React Hook "useQuery" is called in function "fetchTodoList" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"  react-hooks/rules-of-hooks
export const useTodoList = () => {
  const fetchTodoList = () => {
    console.log('fetch todos');

    // return useQuery<TodoType[], Error>(
    //   'todos',
    //   // ['todos', { completed: true }],
    //   fetchTodosQueryFn,
    //   {
    //     notifyOnChangeProps: ["data"],
    //     refetchOnWindowFocus: false,
    //   }
    // );

    // オブジェクトとして書くことも可能
    return useQuery<TodoType[], Error>(
      {
        queryKey: 'todos',
        queryFn: fetchTodosQueryFn,
        ...{
          notifyOnChangeProps: ["data"],
          refetchOnWindowFocus: false,
        }
      }
    );
  }

  return { fetchTodoList };
}


