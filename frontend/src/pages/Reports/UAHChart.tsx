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
import { buildUAHChartData } from "@/utils/charts";

interface UAHChartProps {
  orders: Order[];
}

const UAHChart = ({ orders }: UAHChartProps) => {
  const { t } = useTranslation();

  const uahData = useMemo(() => buildUAHChartData(orders), [orders]);

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
