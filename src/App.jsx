import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Board from './components/Board';
import BoardDetail from './components/BoardDetail';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Board />,
      },
      {
        path: '/:id',
        element: <BoardDetail />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={appRouter} />;

export default App;
