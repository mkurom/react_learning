import {
  useQuery
} from 'react-query'

type TodoType = {
  userId: Number,
  id: Number,
  title: String,
  completed: boolean,
}

const fetchTodosQueryFn = async () =>
  await fetch('https://jsonplaceholder.typicode.com/todos').then(res => {
    return res.json();
  }
  );

// TODO:要確認
// React Hook "useQuery" is called in function "fetchTodoList" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"  react-hooks/rules-of-hooks
export const useTodoList = () => {
  const fetchTodoList = () => {
    console.log('fetch todos');
    return useQuery<TodoType[], Error>(
      'todos',
      fetchTodosQueryFn,
      {
        refetchOnWindowFocus: false,
      }
    )
  }

  return { fetchTodoList };
}


