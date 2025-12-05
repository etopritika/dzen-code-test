import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Order } from "@/store/ordersSlice";
import { buildUSDChartData } from "@/utils/charts";

interface USDChartProps {
  orders: Order[];
}

const USDChart = ({ orders }: USDChartProps) => {
  const { t } = useTranslation();

  const usdData = useMemo(() => buildUSDChartData(orders), [orders]);

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
