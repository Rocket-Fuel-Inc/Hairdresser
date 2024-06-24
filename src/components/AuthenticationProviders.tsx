import { Button, Stack, Typography } from '@mui/joy';
import Link from '@mui/joy/Link';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../api/firebase.ts';
import { useAppState } from '../context/AppState.tsx';
import RoutesEnum from '../types/routesEnum';
import GoogleIcon from '../ui/GoogleIcon.tsx.tsx';

export default function AuthenticationProviders(): JSX.Element {
  const navigate = useNavigate();
  const {
    state: { registerApp },
    dispatch,
  } = useAppState();

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
    <>
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
    </>
  );
}
