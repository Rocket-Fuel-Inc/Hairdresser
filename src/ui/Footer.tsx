import { Box, Typography } from '@mui/joy';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <Box component='footer' sx={{ py: 3 }}>
      <Typography level='body-xs' textAlign='center'>
        © Hairdresser {year}
      </Typography>
    </Box>
  );
}
