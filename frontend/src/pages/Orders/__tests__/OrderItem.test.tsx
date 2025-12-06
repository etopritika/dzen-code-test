import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderItem from "../OrderItem";
import type { Order } from "@/store/ordersSlice";

vi.mock("@/utils/orderHelpers", () => ({
  getProductsCount: vi.fn(() => 3),
  getSumUSD: vi.fn(() => 150),
  getSumUAH: vi.fn(() => 4200),
}));

vi.mock("@/utils/formatDate", () => ({
  formatShortDate: vi.fn(() => "29 / 06"),
  formatFullDate: vi.fn(() => "29 / Jun / 2017"),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("OrderItem", () => {
  const mockOrder: Order = {
    id: 1,
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "desc",
    products: [],
  };

  it("should render order title", () => {
    render(
      <OrderItem order={mockOrder} onSelect={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText("Order 1")).toBeInTheDocument();
  });

  it("should render product count", () => {
    render(
      <OrderItem order={mockOrder} onSelect={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText(/3 products/)).toBeInTheDocument();
  });

  it("should render formatted dates", () => {
    render(
      <OrderItem order={mockOrder} onSelect={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText("29 / 06")).toBeInTheDocument();
    expect(screen.getByText("29 / Jun / 2017")).toBeInTheDocument();
  });

  it("should render USD and UAH sums", () => {
    render(
      <OrderItem order={mockOrder} onSelect={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(screen.getByText(/4200/)).toBeInTheDocument();
  });

  it("should call onSelect when card is clicked", () => {
    const onSelect = vi.fn();
    const onDelete = vi.fn();

    render(
      <OrderItem order={mockOrder} onSelect={onSelect} onDelete={onDelete} />
    );

    const card = screen.getByText("Order 1").closest(".card");
    if (card) {
      fireEvent.click(card);
    }

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockOrder);
  });

  it("should call onDelete when delete button is clicked and not trigger onSelect", () => {
    const onSelect = vi.fn();
    const onDelete = vi.fn();

    const { container } = render(
      <OrderItem order={mockOrder} onSelect={onSelect} onDelete={onDelete} />
    );

    const deleteButton = container.querySelector(
      "button.btn.btn-link.text-danger"
    ) as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(mockOrder);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
