import { describe, it, expect } from "vitest";
import { buildUAHChartData, buildUSDChartData } from "../charts";
import type { Order } from "@/store/ordersSlice";

describe("charts utilities", () => {
  const mockOrders: Order[] = [
    {
      id: 1,
      title: "Order 1",
      date: "2017-06-29 12:09:33",
      description: "desc",
      products: [
        {
          id: 1,
          serialNumber: 1234,
          isNew: 1,
          photo: "pathToFile.jpg",
          title: "Product 1",
          type: "Monitors",
          specification: "Specification 1",
          guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
          },
          price: [
            { value: 100, symbol: "USD", isDefault: 0 },
            { value: 2600, symbol: "UAH", isDefault: 1 },
          ],
          order: 1,
          date: "2017-06-29 12:09:33",
        },
      ],
    },
    {
      id: 2,
      title: "Order 2",
      date: "2017-06-29 12:09:33",
      description: "desc",
      products: [
        {
          id: 2,
          serialNumber: 1234,
          isNew: 1,
          photo: "pathToFile.jpg",
          title: "Product 2",
          type: "Monitors",
          specification: "Specification 2",
          guarantee: {
            start: "2017-06-29 12:09:33",
            end: "2017-06-29 12:09:33",
          },
          price: [
            { value: 100, symbol: "USD", isDefault: 0 },
            { value: 2600, symbol: "UAH", isDefault: 1 },
          ],
          order: 2,
          date: "2017-06-29 12:09:33",
        },
      ],
    },
    {
      id: 3,
      title: "Order 3",
      date: "2017-06-30 10:00:00",
      description: "desc",
      products: [
        {
          id: 3,
          serialNumber: 5678,
          isNew: 0,
          photo: "pathToFile2.jpg",
          title: "Product 3",
          type: "Keyboards",
          specification: "Specification 3",
          guarantee: {
            start: "2017-06-30 10:00:00",
            end: "2020-06-30 10:00:00",
          },
          price: [
            { value: 50, symbol: "USD", isDefault: 0 },
            { value: 1350, symbol: "UAH", isDefault: 1 },
          ],
          order: 3,
          date: "2017-06-30 10:00:00",
        },
      ],
    },
  ];

  describe("buildUAHChartData", () => {
    it("should return an array", () => {
      const result = buildUAHChartData(mockOrders);
      expect(Array.isArray(result)).toBe(true);
    });

    it("should aggregate UAH sums by date", () => {
      const result = buildUAHChartData(mockOrders);

      // Order 1 and Order 2 have the same date (29 / 06), so they should be aggregated
      expect(result).toContainEqual({ date: "29 / 06", uah: 5200 });

      // Order 3 has a different date (30 / 06)
      expect(result).toContainEqual({ date: "30 / 06", uah: 1350 });
    });

    it("should filter products by order.id", () => {
      const result = buildUAHChartData(mockOrders);

      // Each order should only count its own products
      const date29 = result.find((r) => r.date === "29 / 06");
      expect(date29?.uah).toBe(5200); // 2600 + 2600 from Order 1 and Order 2
    });

    it("should return empty array for empty orders", () => {
      const result = buildUAHChartData([]);
      expect(result).toEqual([]);
    });
  });

  describe("buildUSDChartData", () => {
    it("should return an array", () => {
      const result = buildUSDChartData(mockOrders);
      expect(Array.isArray(result)).toBe(true);
    });

    it("should map orders to chart data with correct USD values", () => {
      const result = buildUSDChartData(mockOrders);

      expect(result[0].name).toBe("Order 1");
      expect(result[0].usd).toBe(100);

      expect(result[1].name).toBe("Order 2");
      expect(result[1].usd).toBe(100);

      expect(result[2].name).toBe("Order 3");
      expect(result[2].usd).toBe(50);
    });

    it("should filter products by order.id", () => {
      const result = buildUSDChartData(mockOrders);

      // Order 1 should only count its own product (order: 1)
      expect(result[0].usd).toBe(100);

      // Order 2 should only count its own product (order: 2)
      expect(result[1].usd).toBe(100);
    });

    it("should return empty array for empty orders", () => {
      const result = buildUSDChartData([]);
      expect(result).toEqual([]);
    });

    it("should handle orders with no matching products", () => {
      const ordersWithNoProducts: Order[] = [
        {
          id: 1,
          title: "Order 1",
          date: "2017-06-29 12:09:33",
          description: "desc",
          products: [
            {
              id: 1,
              serialNumber: 1234,
              isNew: 1,
              photo: "pathToFile.jpg",
              title: "Product 1",
              type: "Monitors",
              specification: "Specification 1",
              guarantee: {
                start: "2017-06-29 12:09:33",
                end: "2017-06-29 12:09:33",
              },
              price: [
                { value: 100, symbol: "USD", isDefault: 0 },
                { value: 2600, symbol: "UAH", isDefault: 1 },
              ],
              order: 999, // Different order ID
              date: "2017-06-29 12:09:33",
            },
          ],
        },
      ];

      const result = buildUSDChartData(ordersWithNoProducts);
      expect(result[0].usd).toBe(0);
    });
  });
});
