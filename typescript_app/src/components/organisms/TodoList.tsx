import { useTodoList } from '../../api/useTodoList';

export const TodoList = () => {
  console.log('render Todos');

  const { fetchTodoList } = useTodoList();

  const { isLoading, isError, error, data: todoList } = fetchTodoList();

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

  if (!todoList) {
    return (
      <>
        none data
      </>
    );
  }

  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id.toString()}>{todo.title}</li>
      ),
      )}
    </ul>
  );
};
