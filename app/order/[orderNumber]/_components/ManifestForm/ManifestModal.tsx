"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React, { FC } from "react";
import { MdErrorOutline } from "react-icons/md";
import ManifestForm from "./ManifestForm";
import { ManifestSchema } from "./schema";
import { IManifestData } from "@/app/_interface/order.interface";
import { ICountriesResponse } from "@/app/_interface/general.interface";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ManifestSchema) => void;
  serverError?: string;
  orderNumber: string;
  editManifestData?: IManifestData;
  countries: ICountriesResponse;
}

const ManifestModal: FC<Props> = ({
  open,
  onClose,
  onSubmit,
  serverError,
  orderNumber,
  editManifestData,
  countries,
}) => {
  return (
    <Modal
      isOpen={open}
      placement={"bottom-center"}
      onClose={onClose}
      className="h-5/6 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {!editManifestData ? "Tambah Manifest Data" : "Edit Manifest Data"}
        </ModalHeader>
        <ModalBody>
          {serverError && (
            <div className="flex flex-row justify-center items-center gap-1">
              <MdErrorOutline className="text-danger-500 text-medium" />
              <p className="text-danger-500 text-medium">{serverError}</p>
            </div>
          )}
          <ManifestForm
            onSubmit={onSubmit}
            orderNumber={orderNumber}
            editManifestData={editManifestData}
            countries={countries}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManifestModal;
