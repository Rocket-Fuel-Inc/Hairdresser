import { Box, Button, Checkbox, Divider, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../api/firebase.ts';
import { useAppState } from '../context/AppState.tsx';
import RoutesEnum from '../types/routesEnum.ts';
import GoogleIcon from './GoogleIcon.tsx';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { authSchema } from '../schema/authenticationFormSchema.ts';
import { AuthForm, FormValues } from '../types/authenticationFormTypes.ts';
import ErrorMessage from './ErrorMessage.tsx';

export default function MainDashboard(): JSX.Element {
  const navigate = useNavigate();

  const {
    state: { registerApp },
    dispatch,
  } = useAppState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(authSchema),
  });

  const onSubmitRegistration = async (data: FormValues) => {
    const { email, password } = data;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        navigate(RoutesEnum.APP);
      })
      .catch((error) => {
        // To Do: add notification toast
        alert(error.message);
      });
  };

  const onSubmitLogIn = async (data: FormValues) => {
    const { email, password } = data;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        navigate(RoutesEnum.APP);
      })
      .catch((error) => {
        // To Do: add notification toast
        alert(error.message);
      });
  };

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        navigate(RoutesEnum.APP);
      })
      .catch((error) => {
        // To Do: add notification toast
        alert(error.message);
      });
  };

  return (
    <Box
      component='main'
      sx={{
        my: 'auto',
        py: 2,
        pb: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        maxWidth: '100%',
        mx: 'auto',
        borderRadius: 'sm',
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
      }}
    >
      <Stack gap={4} sx={{ mb: 2 }}>
        <Stack gap={1}>
          <Typography component='h1' level='h3'>
            {registerApp ? 'Registration' : 'Sign in'}
          </Typography>
          <Typography level='body-sm'>
            New to company?{' '}
            {registerApp ? (
              <Link href={RoutesEnum.DASHBOARD} level='title-sm'>
                Sign in!
              </Link>
            ) : (
              <Link href={RoutesEnum.REGISTER} level='title-sm'>
                Sign up!
              </Link>
            )}
          </Typography>
        </Stack>

        <Button variant='soft' color='neutral' onClick={handleGoogleLogin} fullWidth startDecorator={<GoogleIcon />}>
          Continue with Google
        </Button>
      </Stack>

      <Divider
        sx={(theme) => ({
          [theme.getColorSchemeSelector('light')]: {
            color: { xs: '#FFF', md: 'text.tertiary' },
          },
        })}
      >
        or
      </Divider>

      <Stack gap={4} sx={{ mt: 2 }}>
        <form onSubmit={registerApp ? handleSubmit(onSubmitRegistration) : handleSubmit(onSubmitLogIn)}>
          <FormControl error={!!errors?.email}>
            <FormLabel>Email</FormLabel>
            <Input type='email' {...register(AuthForm.EMAIL)} />
            {!!errors?.email && <ErrorMessage error={errors.email} />}
          </FormControl>

          <FormControl error={!!errors?.password}>
            <FormLabel>Password</FormLabel>
            <Input type='password' {...register(AuthForm.PASSWORD)} />
            {!!errors?.password && <ErrorMessage error={errors.password} />}
          </FormControl>

          <Stack gap={4} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Checkbox size='sm' label='Remember me' name='persistent' />
              <Link level='title-sm' href='#replace-with-a-link'>
                Forgot your password?
              </Link>
            </Box>

            <Button type='submit' fullWidth color='warning'>
              {registerApp ? 'Registration' : 'Sign in'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
