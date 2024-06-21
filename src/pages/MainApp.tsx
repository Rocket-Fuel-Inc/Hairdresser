import { Button } from '@mui/joy';
import { signOut } from 'firebase/auth';
import { auth } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../types/routesEnum';
import { useAppState } from '../context/AppState';

export default function MainApp(): JSX.Element {
  const { dispatch } = useAppState();
  const navigate = useNavigate();
  
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
  return (
    <div>
      MainApp
      <Button variant='soft' color='neutral' onClick={logOut}>
        Log Out
      </Button>
    </div>
  );
}
