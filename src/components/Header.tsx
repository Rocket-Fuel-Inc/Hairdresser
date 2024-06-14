import { Box, IconButton, Typography } from '@mui/joy';
import ColorSchemeToggle from './ColorSchemeToggle';
import logoIcon from '../assets/logo.png';

export default function Header(): JSX.Element {
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
        </IconButton>
        <Typography level='title-lg'>Hairdresser</Typography>
      </Box>

      <ColorSchemeToggle />
    </Box>
  );
}
