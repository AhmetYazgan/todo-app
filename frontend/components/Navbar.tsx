'use client';

import {
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import { logout } from './auth/authentication';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout().then(result => {
      if (result.success) {
        router.push('/');
        window.location.reload();
      } else {
        console.log(result.error);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Navbar rounded>
      <NavbarBrand href="https://github.com/AhmetYazgan/todo-app">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TODO APP</span>
      </NavbarBrand>
      {user && <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user?.username}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </DropdownHeader>
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>}
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        {
          user ?
            <>
              <NavbarLink href="/todos">TODOS</NavbarLink>
              <NavbarLink href="/add-todo">Add Todo</NavbarLink>
            </> :
            <>
              <NavbarLink href="/register">Register</NavbarLink>
              <NavbarLink href="/login">Login</NavbarLink>
            </>
        }
      </NavbarCollapse>
    </Navbar>
  );
}
