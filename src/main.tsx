import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link
} from "react-router-dom"
// import './index.css'
import App from './App.tsx'
import UsersPage from './screens/users.page.tsx'

import { FireOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={'/'}>Home</Link>,
    key: 'home',
    icon: <FireOutlined />,
  },
  {
    label: <Link to={'/users'}>Manage Users</Link>,
    key: 'users',
    icon: <TeamOutlined />,
  }
];

const Header = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

const GeneralLayout = () => {
  return(
    <>
      <Header/>
      
      {/* <App/> <UsersPage/> */}
      <Outlet/> 
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <GeneralLayout/>,
    children: [
      { index: true, element: <App /> },
      { path: "users", element: <UsersPage/> }
    ]
  },
  {
    path: "/tracks",
    element: <div>Manage Tracks</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
