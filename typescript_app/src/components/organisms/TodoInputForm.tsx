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
  console.log('render TodoInputForm');

  const { createTodo, createTodoWithMutation } = useTodoList();

  const mutation = createTodoWithMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoType>({ resolver: yupResolver(todoSchema) })

  const onSubmit: SubmitHandler<TodoType> = async (data) => {
    // mutation未使用
    // const result = await createTodo(
    //   {
    //     id: data.id,
    //     title: data.title,
    //   });
    // console.log(result);

    // mutationを使用したPOSTメソッド
    // 2回レンダリングされる
    mutation.mutate(
      {
        id: data.id,
        title: data.title,
      });
  };

  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <Typography variant='h1' >Todo List</Typography>

      {mutation.isLoading ?
        <>
          作成中...
        </>
        :
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
      }
    </Container>
  );
};
