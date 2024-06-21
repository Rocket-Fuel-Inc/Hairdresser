import { Navigate } from 'react-router-dom';
import RoutesEnum from '../types/routesEnum';
import MainApp from '../pages/MainApp';
import { User } from 'firebase/auth';

interface ProtectedRouteProps {
  currentUser: User | null;
}

export default function ProtectedRoute({ currentUser }: ProtectedRouteProps) {
  if (!currentUser) {
    return <Navigate to={RoutesEnum.DASHBOARD} replace />;
  }

  return <MainApp />;
}
