import { Button, Container, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

type UserInputFormType = {
  email: string
  name: string
  password: string
};

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required('必須項目です。')
    .email('正しいメールアドレス入力してください。'),
  name: yup.string().required('必須項目です。'),
  password: yup
    .string()
    .required('必須項目です。')
    .min(6, '6文字以上を入力してください。')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      'パスワード弱いです。'
    ),
});

export const UserInputForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputFormType>({ resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<UserInputFormType> = (data) => {
    console.log(data)
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <TextField
          required
          label="メールアドレス"
          type="email"
          {...register('email')}
          error={'email' in errors}
          helperText={errors.email?.message}
        />
        <TextField
          required
          label="お名前"
          {...register('name')}
          error={'name' in errors}
          helperText={errors.name?.message}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          {...register('password')}
          error={'password' in errors}
          helperText={errors.password?.message}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          作成
        </Button>
      </Stack>
    </Container>
  );
};
