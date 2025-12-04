import type { Order } from "@/store/ordersSlice";

export const getProductsCount = (order: Order): number => {
  return order.products.length;
};

export const getSumUSD = (order: Order): number => {
  return order.products.reduce((sum, product) => {
    const usdPrice = product.price.find((p) => p.symbol === "USD");
    return sum + (usdPrice?.value || 0);
  }, 0);
};

export const getSumUAH = (order: Order): number => {
  return order.products.reduce((sum, product) => {
    const uahPrice = product.price.find((p) => p.symbol === "UAH");
    return sum + (uahPrice?.value || 0);
  }, 0);
};
