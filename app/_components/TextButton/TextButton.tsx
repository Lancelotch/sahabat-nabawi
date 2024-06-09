import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";

type Props = ButtonProps & {
  label: string;
};

const TextButton: React.FC<Props> = (props) => (
  <Button {...props}>{props.label}</Button>
);

export default TextButton;
