"use client";

import { IManifestData, OrderResponse } from "@/app/_interface/order.interface";
import { FC, useState } from "react";
import TableManifest from "./_components/TableManifest";
import ManifestModal from "./_components/ManifestForm/ManifestModal";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderSchema } from "./schema";
import { ManifestSchema } from "./_components/ManifestForm/schema";
import { postManifest } from "@/app/_api/server-action/order/post-manifest";
import {
  ApiResponse,
  ICountriesResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { removeManifest } from "@/app/_api/server-action/order/remove-manifest";
import Confirmation from "@/app/_components/Confirmation/Confirmation";

interface Props {
  order: OrderResponse;
  countries: ICountriesResponse;
}

const Order: FC<Props> = ({ order, countries }) => {
  const { orderNumber } = useParams<{
    orderNumber: string;
  }>();
  const [openManifest, setOpenManifest] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { order_items } = order;
  const orderItem = order_items[0] ?? undefined;
  const { manifests_data, product } = orderItem;
  const [manifestData, setManifestData] = useState<IManifestData[]>(
    manifests_data || []
  );
  const [selectManifestData, setSelectManifestData] = useState<IManifestData>();
  const { name, min_quantity } = product;
  const validationSchema = orderSchema(parseInt(min_quantity, 10));
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setError,
  } = useForm<OrderSchema>({
    defaultValues: {
      payment_method: 1,
    },
    resolver: zodResolver(validationSchema),
  });

  const handleCheckout = (payload: OrderSchema) => {
    if (manifestData.length < parseInt(min_quantity, 10)) {
      setError("manifestData", {
        message: "Jumlah Data belum memenuhi syarat minimal kuantitas",
      });
      return;
    }
  };

  const quantity = watch("quantity");

  const [serverError, setServerError] = useState<string>();

  const handleManifest = async (data: ManifestSchema) => {
    const response = await postManifest(
      data,
      orderNumber,
      orderItem?.order_item_id || 1,
      selectManifestData?.id
    );
    if (!response.ok) {
      const errorResponse = response as InvalidResponse;
      setServerError(errorResponse.err_msg);
      return;
    }
    const successResponse = response as ApiResponse<OrderResponse>;
    const manifestData = successResponse.data.order_items[0].manifests_data;
    setSelectManifestData(undefined);
    setManifestData(manifestData);
    toast.success(
      `${selectManifestData?.id ? "Rubah" : "Tambah"} manifest data, berhasil!`
    );
    setOpenManifest(false);
  };

  const handleRemoveManifest = async () => {
    const response = await removeManifest(
      orderNumber,
      orderItem?.order_item_id || 1,
      selectManifestData?.id
    );
    if (!response.ok) {
      const errorResponse = response as InvalidResponse;
      setServerError(errorResponse.err_msg);
      return;
    }
    const successResponse = response as ApiResponse<OrderResponse>;
    const manifestData = successResponse.data.order_items[0].manifests_data;
    setSelectManifestData(undefined);
    setManifestData(manifestData);
    toast.success(`Hapus manifest data, berhasil!`);
    onClose();
  };

  return (
    <div className="p-3">
      <h2 className="font-semibold">Atur Pesanan</h2>
      <div className="border-b py-3 mb-3">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-sm font-light">{`Minimal pemesanan: ${min_quantity}`}</p>
      </div>
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit(handleCheckout)}
        className="flex flex-col gap-3"
      >
        <Input
          isClearable
          {...register("title", { required: true })}
          label="Judul"
          variant="bordered"
          labelPlacement="outside"
          isInvalid={!!errors.title}
          placeholder="judul untuk mengingat pesanan"
          errorMessage={errors?.title?.message}
          defaultValue={name}
          radius="sm"
        />
        <Input
          isClearable
          {...register("quantity", { required: true })}
          type="number"
          label="Kuantitas"
          variant="bordered"
          labelPlacement="outside"
          placeholder="contoh nilai: 9"
          isInvalid={!!errors.quantity}
          errorMessage={errors?.quantity?.message}
          defaultValue={min_quantity}
          radius="sm"
        />
        <>
          <TableManifest
            manifests={manifestData || []}
            onClickManifest={() => setOpenManifest(true)}
            quantity={quantity}
            onEdit={(manifest) => {
              setSelectManifestData(manifest);
              setOpenManifest(true);
            }}
            onDelete={(manifest) => {
              onOpen();
              setSelectManifestData(manifest);
            }}
          />
          {manifestData.length < parseInt(min_quantity, 10) && (
            <div className="w-full text-center">
              <input {...register("manifestData")} className="hidden" />
              <span className="text-xs text-danger">
                {errors?.manifestData?.message}
              </span>
            </div>
          )}
        </>
        <ManifestModal
          open={openManifest}
          onClose={() => setOpenManifest(false)}
          orderNumber={orderNumber}
          onSubmit={handleManifest}
          serverError={serverError}
          editManifestData={selectManifestData}
          countries={countries}
        />
        <Confirmation
          text={`Apakah anda yakin akan menghapus manifest data atas nama ${selectManifestData?.name} ?`}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onOk={handleRemoveManifest}
        />
        <Button color="primary" type="submit" radius="sm">
          Checkout
        </Button>
      </form>
    </div>
  );
};

export default Order;
