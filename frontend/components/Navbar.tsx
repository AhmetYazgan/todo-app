"use client";

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
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { logout } from "./auth/authentication";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Nav() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    logout()
      .then((result) => {
        if (result.success) {
          toast.success("Logged out successfully!");
          router.push("/");
          router.refresh();
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        } else {
          toast.error(result.error);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Navbar rounded className="py-8 shadow-sm">
      <NavbarBrand href="https://github.com/AhmetYazgan/todo-app">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          TODO APP
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                placeholderInitials={user.username[0].toUpperCase()}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </DropdownHeader>
            <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
          </Dropdown>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        {user ? (
          <>
            <NavbarLink href="/todos">TODOS</NavbarLink>
            <NavbarLink href="/add-todo">Add Todo</NavbarLink>
          </>
        ) : (
          <>
            <NavbarLink href="/register">Register</NavbarLink>
            <NavbarLink href="/login">Login</NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
