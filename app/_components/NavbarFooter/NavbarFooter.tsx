"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { IoHomeOutline, IoReceiptOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/app/_redux/auth/selectors";
import { updateOpenModal } from "@/app/_redux/auth/auth-slice";
import { useRouter } from "next/navigation";

export default function NavbarFooter() {
  const auth = useSelector(selectAuth);
  const router = useRouter();

  const { isAuthenticated } = auth;

  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(updateOpenModal(true));
  };

  const handleClickHomepage = () => {
    router.push("/");
  };

  const handleClickProfile = () => {
    if (!isAuthenticated) {
      handleOpen();
      return;
    }
    router.push("/profile");
  };

  const handleClickPurchaseHistory = () => {
    if (!isAuthenticated) {
      handleOpen();
      return;
    }
    router.push("/profile/purchase_history");
  };

  return (
    <div className="flex items-center justify-evenly w-full max-w-md h-auto border-t-1 fixed bottom-0 z-40 bg-slate-100 shadow">
      <Button
        className="rounded-none bg-gray-50 h-auto p-2"
        fullWidth
        onClick={() => handleClickHomepage()}
      >
        <div className="flex flex-col items-center">
          <IoHomeOutline size={18} />
          <span>Beranda</span>
        </div>
      </Button>
      <Button
        className="rounded-none bg-gray-50 h-auto p-2"
        fullWidth
        onClick={handleClickPurchaseHistory}
      >
        <div className="flex flex-col items-center">
          <IoReceiptOutline size={18} />
          <span>Pesanan Saya</span>
        </div>
      </Button>
      <Button
        className="rounded-none bg-gray-50 h-auto p-2"
        fullWidth
        onClick={handleClickProfile}
      >
        <div className="flex flex-col items-center">
          <FaRegUser size={18} />
          <span>Akun Saya</span>
        </div>
      </Button>
    </div>
  );
}
