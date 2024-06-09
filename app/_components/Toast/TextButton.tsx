"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  type: "success" | "error";
  message: string;
}

const Toast: React.FC<Props> = ({ type, message }) => {
  useEffect(() => {
    toast[type](message);
  }, [message, type]);
  return <></>;
};

export default Toast;
