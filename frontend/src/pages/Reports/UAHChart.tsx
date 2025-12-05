import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Order } from "@/store/ordersSlice";
import { getSumUAH } from "@/utils/orderHelpers";
import { formatShortDate } from "@/utils/formatDate";

interface UAHChartProps {
  orders: Order[];
}

const UAHChart = ({ orders }: UAHChartProps) => {
  const { t } = useTranslation();

  const uahData = useMemo(() => {
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
  }, [orders]);

  return (
    <div className="mb-5">
      <h5 className="mb-3">{t("reports.uah_chart")}</h5>
      <LineChart width={600} height={300} data={uahData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uah" stroke="#198754" />
      </LineChart>
    </div>
  );
};

export default UAHChart;
