"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ManifestSchema, manifestSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ApiResponse,
  ICountriesResponse,
} from "@/app/_interface/general.interface";
import { fetchCountries } from "@/app/_api/server-action/fetch-countries";
import ImageUploader from "@/app/_components/ImageUploader/ImageUploader";
import { postUploadManifest } from "@/app/_api/server-action/order/upload-image";
import {
  EFieldManifest,
  IManifestData,
  IUploadManifestFileResponse,
} from "@/app/_interface/order.interface";
import { ProductCategoryEnum } from "@/app/_interface/product.interface";

interface Props {
  onSubmit: (data: ManifestSchema) => void;
  orderNumber: string;
  editManifestData?: IManifestData;
  countries: ICountriesResponse;
}

const ManifestForm: FC<Props> = ({
  onSubmit,
  orderNumber,
  editManifestData,
  countries,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,

    watch,
  } = useForm<ManifestSchema>({
    defaultValues: {
      ...editManifestData,
      product_category: ProductCategoryEnum.VISA_SERVICE,
    },
    resolver: zodResolver(manifestSchema),
  });

  const personalPhotoUrl = watch("personal_photo_url");
  const personalIdentifierUrl = watch("personal_identifier_url");
  const passportUrl = watch("passport_url");

  useEffect(() => {
    if (!editManifestData) setValue("nationality", countries.userCountryCode);
  }, []);

  const handleUploadImage = async (
    name: keyof ManifestSchema,
    file: File,
    field: EFieldManifest
  ) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await postUploadManifest(formData, field, orderNumber);
    if (response.ok) {
      const responseSucess =
        response as ApiResponse<IUploadManifestFileResponse>;
      setValue(name, responseSucess.data.image_url);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Select
        {...register("nationality", { required: true })}
        labelPlacement="outside"
        label="Negara"
        variant="bordered"
        isInvalid={!!errors.nationality}
        errorMessage={errors?.nationality?.message}
        defaultSelectedKeys={[countries.userCountryCode]}
        radius="sm"
      >
        {countries.countries.map((country) => (
          <SelectItem key={country.value}>{country.label}</SelectItem>
        ))}
      </Select>
      <Input
        isClearable
        {...register("name", { required: true })}
        label="Nama"
        variant="bordered"
        labelPlacement="outside"
        isInvalid={!!errors.name}
        errorMessage={errors?.name?.message}
        radius="sm"
      />
      <ImageUploader
        name="personal_photo_url"
        onChangeImage={(name, file) =>
          handleUploadImage(
            name as keyof ManifestSchema,
            file,
            EFieldManifest.PERSONAL_PHOTO
          )
        }
        image={personalPhotoUrl}
        register={register}
        label="Upload photo pribadi"
        errorMessage={errors.personal_photo_url?.message}
      />
      <Input
        isClearable
        {...register("personal_identifier_number", { required: true })}
        label="No Identitas"
        variant="bordered"
        labelPlacement="outside"
        isInvalid={!!errors.personal_identifier_number}
        errorMessage={errors?.personal_identifier_number?.message}
        radius="sm"
      />
      <ImageUploader
        name="personal_identifier_url"
        onChangeImage={(name, file) =>
          handleUploadImage(
            name as keyof ManifestSchema,
            file,
            EFieldManifest.PERSONAL_IDENTIFIER
          )
        }
        image={personalIdentifierUrl}
        register={register}
        label="Upload tanda pengenal (KTP)"
        errorMessage={errors.personal_identifier_url?.message}
      />
      <Input
        isClearable
        {...register("passport_number", { required: true })}
        label="No Passport"
        variant="bordered"
        labelPlacement="outside"
        isInvalid={!!errors.passport_number}
        errorMessage={errors?.passport_number?.message}
        radius="sm"
      />
      <ImageUploader
        name="passport_url"
        onChangeImage={(name, file) =>
          handleUploadImage(
            name as keyof ManifestSchema,
            file,
            EFieldManifest.PASSPORT
          )
        }
        image={passportUrl}
        register={register}
        label="Upload Passport"
        errorMessage={errors.passport_url?.message}
      />
      <Button color="primary" radius="sm" className="my-4" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ManifestForm;
