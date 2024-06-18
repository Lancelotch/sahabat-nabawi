import { Button, Input } from "@nextui-org/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Props {
  onSubmit: (data: FormData) => void;
}

type FormData = z.infer<typeof loginSchema>;

const LoginForm: FC<Props> = ({ onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      action=""
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <Input
        isClearable
        {...register("email", { required: true })}
        type="email"
        label="Email"
        variant="bordered"
        placeholder="Enter your email"
        onClear={() => console.log("input cleared")}
        labelPlacement="outside"
        isInvalid={!!errors.email}
        errorMessage={errors?.email?.message}
        radius="sm"
      />

      <Input
        {...register("password", { required: true })}
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        labelPlacement="outside"
        isInvalid={!!errors.password}
        errorMessage={errors?.password?.message}
        radius="sm"
      />
      <Button color="primary" type="submit" radius="sm">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
