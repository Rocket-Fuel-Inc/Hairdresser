import { keyframes } from '@emotion/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { Box, Button, styled } from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

type ErrorCode = 400 | 403 | 404 | 500;
interface ErrorPageProps {
  errorCode?: ErrorCode;
}

export default function ErrorPages({ errorCode }: ErrorPageProps) {
  const navigate = useNavigate();

  const redirect = () => navigate(-1);

  const displayError = (errorCode?: ErrorCode) => {
    switch (errorCode) {
      case 400:
        return {
          status: '400',
          title: 'Bad Request',
          subTitle: 'The server could not understand the request due to invalid syntax.',
          icon: <AnimatedErrorOutlineIcon />,
        };

      case 403:
        return {
          status: '403',
          title: 'Forbidden',
          subTitle: 'Sorry, you are not authorized to access this page.',
          icon: <AnimatedLockPersonIcon />,
        };

      case 404:
        return {
          status: '404',
          title: 'Not Found',
          subTitle: 'Sorry, the page you visited does not exist.',
          icon: <AnimatedReportProblemIcon />,
        };

      default:
        return {
          status: '500',
          title: 'Internal Server Error',
          subTitle: 'Sorry, something went wrong.',
          icon: <AnimatedRunningWithErrorsIcon />,
        };
    }
  };

  const { status, title, subTitle, icon } = displayError(errorCode);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          textAlign: 'center',
        }}
      >
        {icon}
        <Typography level='h1' fontSize='xl'>
          {status}
        </Typography>

        <Typography level='body-xs' sx={{ mt: 1, mb: 2 }}>
          {title}
        </Typography>

        <Typography level='body-sm'>{subTitle}</Typography>
        <Button
          sx={{
            mt: 3,
            background: 'var(--color-myBrown)',
            '&:hover': {
              background: 'var(--color-myBrownHover)',
            },
          }}
          onClick={redirect}
        >
          Back
        </Button>
      </Box>
    </>
  );
}

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const AnimatedErrorOutlineIcon = styled(ErrorOutlineIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;

const AnimatedLockPersonIcon = styled(LockPersonIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;

const AnimatedReportProblemIcon = styled(ReportProblemIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;

const AnimatedRunningWithErrorsIcon = styled(RunningWithErrorsIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;
