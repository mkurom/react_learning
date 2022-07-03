import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Todos } from './pages/Todos';
import { UserInputForm } from './pages/UserInputForm';
import { NotFoundPage } from './pages/NotFounfPage';
import { TodosListPage } from './pages/TodoListPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});

export const App = () => {
  console.log('render App');
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodosListPage />} />
          <Route path="/todo" element={<Todos />} />
          <Route path="/user-input" element={<UserInputForm />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
