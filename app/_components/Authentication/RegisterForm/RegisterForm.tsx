import { Button, Input } from "@nextui-org/react";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postRegister } from "../../../_api/server-action/register";

interface Props {
  onSubmit: (data: FormData) => void;
}

type FormData = z.infer<typeof registerSchema>;

const RegisterForm: FC<Props> = ({ onSubmit }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form
      action=""
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        isClearable
        {...register("name", { required: true })}
        label="Name"
        variant="bordered"
        placeholder="Enter your Name"
        onClear={() => console.log("input cleared")}
        labelPlacement="outside"
        isInvalid={!!errors.name}
        errorMessage={errors?.name?.message}
        autoComplete=""
      />
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
        autoComplete=""
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
        autoComplete=""
      />
      <Input
        isClearable
        {...register("phone_number", { required: true })}
        label="Phone Number"
        variant="bordered"
        placeholder="Enter your phone number"
        onClear={() => console.log("input cleared")}
        labelPlacement="outside"
        isInvalid={!!errors.phone_number}
        errorMessage={errors?.phone_number?.message}
        autoComplete=""
      />
      <Button color="primary" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
