"use client";

import { ITableColumn } from "@/app/_interface/general.interface";
import { IManifestData } from "@/app/_interface/order.interface";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { FC, useCallback } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  manifests: IManifestData[];
  onClickManifest: () => void;
  quantity: number;
  onEdit: (manifestData: IManifestData) => void;
  onDelete: (manifestData: IManifestData) => void;
}

const columns: ITableColumn[] = [
  { name: "NAME", uid: "name" },
  { name: "PASSPORT", uid: "passport" },
  { name: "ACTIONS", uid: "actions" },
];

const TableManifest: FC<Props> = ({
  manifests,
  onClickManifest,
  quantity = 1,
  onEdit,
  onDelete,
}) => {
  const renderCell = useCallback(
    (manifest: IManifestData, columnKey: React.Key) => {
      const cellValue = manifest[columnKey as keyof IManifestData];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: manifest.personal_photo_url }}
              description={manifest.personal_identifier_number}
              name={cellValue}
            >
              {manifest.name}
            </User>
          );
        case "passport":
          return (
            <p className="text-bold text-sm capitalize text-default-400">
              {manifest.passport_number}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <button onClick={() => onEdit(manifest)}>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaRegEdit />
                  </span>
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <button onClick={() => onDelete(manifest)}>
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <RiDeleteBinLine />
                  </span>
                </button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Tabel Manifest Data</p>
        <span className="text-sm">{`${manifests.length} / ${quantity}`}</span>
      </div>
      <Table
        aria-label="Example table with custom cells"
        radius="sm"
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={manifests}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {manifests.length < quantity ? (
        <div className="flex justify-end items-center mt-2">
          <Button
            color="primary"
            variant="light"
            startContent={<IoIosAddCircleOutline />}
            onClick={onClickManifest}
            size="sm"
          >
            Tambah Manifest Data
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default TableManifest;
