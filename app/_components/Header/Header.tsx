"use client";

import React, { useEffect, useState } from "react";
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
import Cookies from "js-cookie";
import { EAuthentication } from "@/app/_constant/authentication";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function Header() {
  const auth = useSelector(selectAuth);
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpen = () => {
    dispatch(updateOpenModal(true));
  };

  const handleLogout = () => {
    Cookies.remove(EAuthentication.COOKIES_ACCESS_TOKEN);
    dispatch(updateAuthentication(false));
  };

  return (
    <Navbar isBordered classNames={{ wrapper: "px-3" }}>
      <NavbarBrand>
        {pathName !== "/" ? (
          <FaArrowLeft
            onClick={() => router.back()}
            className="mr-4 cursor-pointer"
          />
        ) : null}

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
            {auth.isAuthenticated ? (isClient ? "Logout" : "Login") : "Login"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
