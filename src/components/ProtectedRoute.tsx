import MainApp from '../pages/MainApp';
import { User } from 'firebase/auth';
import ErrorPages from '../pages/ErrorPages';

interface ProtectedRouteProps {
  currentUser: User | null;
}

export default function ProtectedRoute({ currentUser }: ProtectedRouteProps) {
  if (!currentUser) {
    return <ErrorPages errorCode={403} />;
  }
  return <MainApp />;
}
