import type { Order } from "@/store/ordersSlice";
import { getSumUSD, getSumUAH } from "@/utils/orderHelpers";
import { formatShortDate } from "@/utils/formatDate";

export function buildUAHChartData(
  orders: Order[]
): { date: string; uah: number }[] {
  const map = new Map<string, number>();

  orders.forEach((o) => {
    const filteredProducts = o.products.filter((p) => p.order === o.id);
    const orderWithFilteredProducts = { ...o, products: filteredProducts };
    const date = formatShortDate(o.date);
    const sum = getSumUAH(orderWithFilteredProducts);

    map.set(date, (map.get(date) ?? 0) + sum);
  });

  return Array.from(map.entries()).map(([date, uah]) => ({
    date,
    uah,
  }));
}

export function buildUSDChartData(
  orders: Order[]
): { name: string; usd: number }[] {
  return orders.map((o) => {
    const filteredProducts = o.products.filter((p) => p.order === o.id);
    const orderWithFilteredProducts = { ...o, products: filteredProducts };
    return {
      name: o.title,
      usd: getSumUSD(orderWithFilteredProducts),
    };
  });
}
