import './App.css';
import { Route, Routes } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import RoutesEnum from './types/routesEnum';

import ErrorPages from './pages/ErrorPages';
import Dashboard from './pages/Dashboard';
import MainApp from './pages/MainApp';

export default function App(): JSX.Element {
  const routes = [
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
