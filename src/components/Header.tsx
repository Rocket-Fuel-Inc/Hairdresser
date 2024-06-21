import { Box, Button, IconButton, Typography } from '@mui/joy';
import ColorSchemeToggle from './ColorSchemeToggle';
import logoIcon from '../assets/logo.png';
import { signOut } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../api/firebase';
import { useAppState } from '../context/AppState';
import RoutesEnum from '../types/routesEnum';

export default function Header(): JSX.Element {
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate(RoutesEnum.DASHBOARD);
      dispatch({ type: 'SET_REGISTER_APP', payload: false });
    } catch (error) {
      // To Do: add notification toast
      alert(error);
    }
  };

  const visibleLogoutButton = pathname === RoutesEnum.APP;

  return (
    <Box
      component='header'
      sx={{
        py: 3,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton variant='soft' color='primary' size='sm'>
          <img src={logoIcon} alt='icon' style={{ width: '20px', height: '20px' }} />
          {visibleLogoutButton && (
            <Button variant='soft' color='neutral' onClick={logOut}>
              Log Out
            </Button>
          )}
        </IconButton>
      </Box>

      <Typography level='title-lg' sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        Hairdresser
      </Typography>

      <ColorSchemeToggle />
    </Box>
  );
}
