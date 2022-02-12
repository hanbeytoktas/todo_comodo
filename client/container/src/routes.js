import React from 'react';
import { Navigate } from 'react-router-dom';
import LazyDashboardApp from './pages/Layout/LazyDashboardLayout';
import MainLayout from './pages/Layout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import RemoteModule1 from './pages/RemoteModule1';
import RemoteModule2 from './pages/RemoteModule2';
import GroupMainPage from './pages/Group/GroupMainPage';
import TodoListMainPage from "./pages/TodoList/TodoListMainPage";
import {TodoProvider} from "./pages/TodoList/TodoContext";

const routes = [
  {
    path: 'app',
    element: <LazyDashboardApp />,
    children: [
      { path: 'dashboard', element: <Dashboard/>},
      { path: 'module1', element: <RemoteModule1/> },
      { path: 'module2', element: <RemoteModule2/>},
      { path: 'group', element: <GroupMainPage/> },
      { path: 'todoList', element: <TodoProvider><TodoListMainPage/></TodoProvider> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
