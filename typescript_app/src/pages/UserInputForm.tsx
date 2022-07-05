import { useState, useEffect } from 'react';
import { Typography, Button, Container, Stack, TextField, Modal } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirebaseAuth } from '../api/firebase/useFirebaseAuth';

type FirebaseAuthPersistenceType = {
  email: string
  password: string
};

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required('必須項目です。')
    .email('正しいメールアドレス入力してください。'),
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

  console.log('render UserInputForm');

  const { auth, anonymousSignIn, authStateChanged, deleteUserFn, persistenceAuthState } = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FirebaseAuthPersistenceType>({ resolver: yupResolver(schema) })

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const _anonymousSignIn = async () => {
      authStateChanged();

      setIsLoading(false);
    };
    _anonymousSignIn();
  }, [])


  const onSubmit: SubmitHandler<FirebaseAuthPersistenceType> = (data) => {
    console.log(data)

    persistenceAuthState(data.email, data.password);
  };


  if (isLoading) {
    return (<Typography>読み込み中...</Typography>);
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <Typography>匿名ログイン</Typography>
        <Typography>uid: {auth.currentUser?.uid}</Typography>
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
          ユーザーの永続化
        </Button>
      </Stack>


      {/*  テスト用 */}
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={async () => {
          setIsLoading(true);
          const user = await anonymousSignIn();
          setIsLoading(false);
        }}
      >
        匿名ログイン
      </Button>

      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => {
          const result = deleteUserFn();

          if (!result) {
            console.log('failed');
          }
        }}
      >
        匿名ユーザ削除
      </Button>
    </Container>
  );
};
