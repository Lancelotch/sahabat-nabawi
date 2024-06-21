import { getOrders } from "@/app/_api/server-action/order/get-orders";
import TableOrder from "./_components/TableOrder";
import { OrderResponse } from "@/app/_interface/order.interface";
import { ApiResponse } from "@/app/_interface/general.interface";

async function PurchaseHistory() {
  const response = await getOrders({});
  if (!response.ok) return <span>Belum ada pesanan</span>;
  const successResponse = response as ApiResponse<OrderResponse>;
  return (
    <div className="p-6 flex flex-col gap-8">
      <TableOrder orderResponse={successResponse.data} />
    </div>
  );
}

export default PurchaseHistory;
