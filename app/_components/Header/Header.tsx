"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAuthentication,
  updateOpenModal,
} from "@/app/_redux/auth/auth-slice";
import { selectAuth } from "@/app/_redux/auth/selectors";

export default function Header() {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(updateOpenModal(true));
  };

  const handleLogout = () => {
    dispatch(updateAuthentication(false));
  };

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Sahabat Nabawi</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <Button
            onClick={() =>
              auth.isAuthenticated ? handleLogout() : handleOpen()
            }
            color="primary"
            variant="bordered"
            size="sm"
          >
            {auth.isAuthenticated ? "Logout" : "Login"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
