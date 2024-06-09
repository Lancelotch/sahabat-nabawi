"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/app/_redux/auth/selectors";
import {
  updateAuthentication,
  updateOpenModal,
} from "@/app/_redux/auth/auth-slice";
import { postLogin } from "@/app/_api/server-action/login";
import { z } from "zod";
import { loginSchema } from "./LoginForm/schema";
import { InvalidResponse } from "@/app/_interface/general.interface";
import { MdErrorOutline } from "react-icons/md";
import { postRegister } from "@/app/_api/server-action/register";
import { registerSchema } from "./RegisterForm/schema";
import { toast } from "react-toastify";

type FormDataLogin = z.infer<typeof loginSchema>;
type FormDataRegister = z.infer<typeof registerSchema>;

const Authentication: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updateOpenModal(false));
  };

  const handleSubmitLogin = async (data: FormDataLogin) => {
    const response = await postLogin(data);
    if (!response.ok) {
      const errorResponse = response as InvalidResponse;
      setServerError(errorResponse.err_msg);
      return;
    }
    toast.success("Berhasil Login!");
    dispatch(updateAuthentication(true));
    handleClose();
  };

  const handleSubmitRegister = async (data: FormDataRegister) => {
    const response = await postRegister(data);
    if (!response.ok) {
      const errorResponse = response as InvalidResponse;
      setServerError(errorResponse.err_msg);
      return;
    }
    const forceLogin = {
      email: data.email,
      password: data.password,
    } as FormDataLogin;
    handleSubmitLogin(forceLogin);
  };

  return (
    <Modal
      isOpen={auth.isOpenModal}
      placement={"bottom-center"}
      onClose={() => {
        setIsLogin(true);
        handleClose();
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isLogin ? "Log In" : "Daftar"}
        </ModalHeader>
        <ModalBody>
          {serverError && (
            <div className="flex flex-row justify-center items-center gap-1">
              <MdErrorOutline className="text-danger-500 text-medium" />
              <p className="text-danger-500 text-medium">{serverError}</p>
            </div>
          )}

          {isLogin ? (
            <LoginForm onSubmit={handleSubmitLogin} />
          ) : (
            <RegisterForm onSubmit={handleSubmitRegister} />
          )}
        </ModalBody>
        <ModalFooter>
          <div>
            <span>{isLogin ? " Belum punya akun?" : "Sudah punya akun?"} </span>{" "}
            <button
              className="text-button text-primary"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Daftar" : "Login"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Authentication;
