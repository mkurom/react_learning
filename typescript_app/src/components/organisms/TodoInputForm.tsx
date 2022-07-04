import { Button, Box, Container, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useTodoList } from '../../api/useTodoList';
import { TodoType } from '../../type/todoType';

// バリデーションルール
let todoSchema = yup.object({
  id: yup.number().default(1),
  title: yup.string().required('タイトルを入力してください'),
  completed: yup.boolean().default(false),
});

export const TodoInputForm = () => {

  const { createTodo } = useTodoList();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoType>({ resolver: yupResolver(todoSchema) })

  const onSubmit: SubmitHandler<TodoType> = async (data) => {
    const result = await createTodo(
      {
        id: data.id,
        title: data.title,
      });
    console.log(result);
  };

  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <Typography variant='h1' >Todo List</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <TextField
          required
          label="タイトル"
          type="title"
          {...register('title')}
          error={'title' in errors}
          helperText={errors.title?.message}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          新規作成
        </Button>
      </Box>
    </Container>
  );
};
