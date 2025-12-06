import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchOrders } from "@/store/ordersSlice";
import USDChart from "./USDChart";
import UAHChart from "./UAHChart";

const ReportsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    list: orders,
    loading,
    error,
  } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="mt-4 mb-4">
        <h2 className="mb-4">{t("reports.title")}</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-4 mb-4">
        <h2 className="mb-4">{t("reports.title")}</h2>
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="mt-4 mb-4">
      <h2 className="mb-4">{t("reports.title")}</h2>
      <USDChart orders={orders} />
      <UAHChart orders={orders} />
    </section>
  );
};

export default ReportsPage;
