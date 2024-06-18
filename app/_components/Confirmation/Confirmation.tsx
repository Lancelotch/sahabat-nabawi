import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { color } from "framer-motion";
import React from "react";

interface Props {
  title?: string;
  text: string;
  isOpen: boolean;
  onOpenChange: () => void;
  onOk: () => void;
}

const Confirmation: React.FC<Props> = ({
  text,
  title = "Konfirmasi",
  isOpen,
  onOpenChange,
  onOk,
}) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            <p>{text}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="bordered" onPress={onClose}>
              Batalkan
            </Button>
            <Button color="warning" onPress={onOk} variant="bordered">
              Ya
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default Confirmation;
