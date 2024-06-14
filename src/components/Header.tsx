import { Box, IconButton, Typography } from '@mui/joy';
import ColorSchemeToggle from './ColorSchemeToggle';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

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
          <BadgeRoundedIcon />
        </IconButton>
        <Typography level='title-lg'>Company logo</Typography>
      </Box>
      
      <ColorSchemeToggle />
    </Box>
  );
}
