import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Stack, Typography, Divider, FormControl, FormLabel, Input, Checkbox, Button } from '@mui/joy';
import Link from '@mui/joy/Link';
import GoogleIcon from './GoogleIcon.tsx';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../api/firebase.ts';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../types/routesEnum.ts';
import { useAppState } from '../context/AppState.tsx';

export default function MainDashboard(): JSX.Element {
  const navigate = useNavigate();

  const {
    state: { register },
    dispatch,
  } = useAppState();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmitRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValues;

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

  const onSubmitLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValues;

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
            {register ? 'Registration' : 'Sign in'}
          </Typography>
          <Typography level='body-sm'>
            New to company?{' '}
            {register ? (
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
        <form onSubmit={register ? onSubmitRegistration : onSubmitLogIn}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type='email' name='email' onChange={(e) => handleChange(e)} />
          </FormControl>

          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' onChange={(e) => handleChange(e)} />
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

            <Button type='submit' fullWidth>
              {register ? 'Registration' : 'Sign in'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
