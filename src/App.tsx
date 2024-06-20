import './App.css';
import {  useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import RoutesEnum from './types/routesEnum';

import ErrorPages from './pages/ErrorPages';
import Dashboard from './pages/Dashboard';
import MainApp from './pages/MainApp';
import { auth } from './api/firebase';
import { User } from 'firebase/auth';
import { useAppState } from './context/AppState';

export default function App(): JSX.Element {
  const {
    state: { register },
    dispatch,
  } = useAppState();

  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (pathname === RoutesEnum.REGISTER || user !== null) {
        dispatch({ type: 'SET_REGISTER', payload: true });
      } else {
        dispatch({ type: 'SET_REGISTER', payload: false });
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  const routes = [
    {
      path: RoutesEnum.REGISTER,
      component: <Dashboard />,
    },
    {
      path: RoutesEnum.DASHBOARD,
      component: <Dashboard />,
    },
    {
      path: RoutesEnum.APP,
      component: <MainApp />,
    },
    {
      path: RoutesEnum.ANYTHING,
      component: <ErrorPages />,
    },
  ];

  return (
    <>
      <CssVarsProvider defaultMode='dark' disableTransitionOnChange>
        <Routes>
          {routes.map(({ path, component }) => (
            <Route path={path} element={component} key={path} />
          ))}
        </Routes>
      </CssVarsProvider>
    </>
  );
}
