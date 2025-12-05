import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Order } from "@/store/ordersSlice";
import { getSumUSD } from "@/utils/orderHelpers";

interface USDChartProps {
  orders: Order[];
}

const USDChart = ({ orders }: USDChartProps) => {
  const { t } = useTranslation();

  const usdData = orders.map((o) => {
    const filteredProducts = o.products.filter((p) => p.order === o.id);
    const orderWithFilteredProducts = { ...o, products: filteredProducts };
    return {
      name: o.title,
      usd: getSumUSD(orderWithFilteredProducts),
    };
  });

  return (
    <div className="mb-5">
      <h5 className="mb-3">{t("reports.usd_chart")}</h5>
      <BarChart width={600} height={300} data={usdData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="usd" fill="#0d6efd" />
      </BarChart>
    </div>
  );
};

export default USDChart;

