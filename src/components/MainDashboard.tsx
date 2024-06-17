import { Box, Stack, Typography, Divider, FormControl, FormLabel, Input, Checkbox, Button } from '@mui/joy';
import Link from '@mui/joy/Link';
import GoogleIcon from './GoogleIcon.tsx';
import { ChangeEvent, useState } from 'react';

export default function MainDashboard(): JSX.Element {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(formValue, null, 2));
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
            Sign in
          </Typography>
          <Typography level='body-sm'>
            New to company?{' '}
            <Link href='#replace-with-a-link' level='title-sm'>
              Sign up!
            </Link>
          </Typography>
        </Stack>

        <Button variant='soft' color='neutral' fullWidth startDecorator={<GoogleIcon />}>
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
        <form onSubmit={onSubmit}>
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
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
