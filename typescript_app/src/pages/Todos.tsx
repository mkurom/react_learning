
import { useTodoList } from '../api/useTodoList';

export const Todos = () => {
  console.log('render Todos');

  const { fetchTodoList } = useTodoList();

  const { isLoading, isError, error, data } = fetchTodoList();

  if (isLoading) {
    return (
      <>
        'Loading...'
      </>
    );
  }

  if (isError) {
    return (
      <>
        error : {error.message}
      </>
    );
  }

  if (!data) {
    return (
      <>
        none data
      </>
    );
  }

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id.toString()}>{todo.title}</li>
      ),
      )}
    </ul>
  );
};
