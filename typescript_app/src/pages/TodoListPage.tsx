import { useEffect, useState } from 'react';
import { useFirestore } from '../api/firebase/useFirestore';
import { TodoType } from '../type/todoType';

export const TodosListPage = () => {
  console.log('render Todos');

  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllTodos } = useFirestore();


  useEffect(() => {
    console.log('fetch');

    const fetch = async () => {
      const result = await fetchAllTodos();

      setTodoList(result);

      setIsLoading(false);
    };

    fetch();
  }, []);


  if (isLoading) {
    return (
      <>
        'Loading...'
      </>
    );
  }

  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id.toString()}>{todo.id.toString()} {todo.title}</li>
      ),
      )}
    </ul>
  );
};
