"use client";

import Confirmation from "@/app/_components/Confirmation/Confirmation";
import { ITableColumn } from "@/app/_interface/general.interface";
import {
  EOrderStatus,
  IOrder,
  OrderResponse,
} from "@/app/_interface/order.interface";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { FaCheckCircle, FaRegCreditCard, FaRegEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdManageHistory } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  orderResponse: OrderResponse;
}

const columns: ITableColumn[] = [
  { name: "TITLE", uid: "title" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const translateStatus = (status: EOrderStatus) => {
  switch (status) {
    case EOrderStatus.INITIATED:
      return (
        <Chip
          startContent={<MdManageHistory size={18} />}
          variant="light"
          color="primary"
        >
          Incomplete Order
        </Chip>
      );
    case EOrderStatus.PAID:
      return (
        <Chip
          startContent={<FaCheckCircle size={18} />}
          variant="light"
          color="success"
        >
          Paid
        </Chip>
      );
    case EOrderStatus.WAIT_FOR_PAYMENT:
      return (
        <Chip
          startContent={<FaRegCreditCard size={18} />}
          variant="light"
          color="warning"
        >
          Waiting Payment
        </Chip>
      );
    default:
    case EOrderStatus.INITIATED:
      return (
        <Chip
          startContent={<FaCheckCircle size={18} />}
          variant="light"
          color="success"
        >
          Incomplete Order
        </Chip>
      );
  }
};

const TableOrder: FC<Props> = ({ orderResponse }) => {
  const { push } = useRouter();
  const { orders } = orderResponse;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [orderSelected, setOrderSelected] = useState<IOrder>();
  const handleEdit = (order: IOrder) => {
    push(`/order/${order.order_number}`);
  };
  const handleDelete = () => {
    onClose();
  };
  const renderCell = useCallback((order: IOrder, columnKey: React.Key) => {
    const cellValue = order[columnKey as keyof Omit<IOrder, "order_items">];

    switch (columnKey) {
      case "title":
        return <p>{order.title}</p>;
      case "status":
        return (
          <p className="text-bold text-sm capitalize text-default-400">
            {translateStatus(order.status)}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit">
              <button onClick={() => handleEdit(order)}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FaRegEdit />
                </span>
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <button
                onClick={() => {
                  setOrderSelected(order);
                  onOpen();
                }}
              >
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
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">Tabel Riwayat Pemesanan</p>
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
        <TableBody items={orders}>
          {(item) => (
            <TableRow key={item.order_number}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Confirmation
        text={`Apakah anda yakin akan menghapus order dengan title ${orderSelected?.title} ?`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOk={handleDelete}
      />
    </div>
  );
};

export default TableOrder;
