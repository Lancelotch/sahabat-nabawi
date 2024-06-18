import { getOrder } from "@/app/_api/server-action/order/get-order";
import { ApiResponse, IPathParam } from "@/app/_interface/general.interface";
import Order from "./Order";
import { OrderResponse } from "@/app/_interface/order.interface";
import { fetchCountries } from "@/app/_api/server-action/fetch-countries";

async function OrderPage({ params }: IPathParam) {
  const { orderNumber } = params || {};
  if (!orderNumber) return <span>404</span>;
  const response = await getOrder({
    order_number: orderNumber,
  });
  if (!response.ok) return <span>404</span>;
  const responseSucess = response as ApiResponse<OrderResponse>;
  const getCountries = await fetchCountries();
  const countries = getCountries || {
    countries: [],
    userCountryCode: "",
  };

  return <Order order={responseSucess.data} countries={countries} />;
}

export default OrderPage;
