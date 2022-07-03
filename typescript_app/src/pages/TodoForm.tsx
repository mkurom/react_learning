import { useState } from 'react';
import { Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { TodoType } from '../type/todoType';
import { useTodoList } from '../api/useTodoList';

// バリデーションルール
let todoSchema = yup.object({
  userId: yup.number().required().positive().integer(),
  id: yup.number().required().positive().integer(),
  title: yup.string().required(),
  completed: yup.boolean().required(),
});

type Todo = yup.InferType<typeof todoSchema>;

export const TodoForm = () => {

  const [isLoading, setIsloading] = useState(true);


  return (
    { isLoading } ?
      <Typography>
        読み込み中...
      </Typography> :
      <Typography>
        読み込みdone!
      </Typography>
  );
};
