export const orders = [
  {
    id: 1,
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    },
  },
  {
    id: 2,
    title: "Order 2",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    },
  },
  {
    id: 3,
    title: "Order 3",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    },
  },
  {
    id: 4,
    title: "Order 4",
    date: "2018-03-15 14:20:10",
    description: "desc",
    get products() {
      return products;
    },
  },
  {
    id: 5,
    title: "Order 5",
    date: "2019-11-22 09:45:00",
    description: "desc",
    get products() {
      return products;
    },
  },
];

export const products = [
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
  {
    id: 2,
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
    order: 2,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 3,
    serialNumber: 5678,
    isNew: 0,
    photo: "pathToFile2.jpg",
    title: "Product 3",
    type: "Keyboards",
    specification: "Specification 3",
    guarantee: {
      start: "2018-03-15 14:20:10",
      end: "2020-03-15 14:20:10",
    },
    price: [
      { value: 50, symbol: "USD", isDefault: 0 },
      { value: 1350, symbol: "UAH", isDefault: 1 },
    ],
    order: 4,
    date: "2018-03-15 14:20:10",
  },
  {
    id: 4,
    serialNumber: 9012,
    isNew: 1,
    photo: "pathToFile3.jpg",
    title: "Product 4",
    type: "Keyboards",
    specification: "Specification 4",
    guarantee: {
      start: "2018-03-15 14:20:10",
      end: "2021-03-15 14:20:10",
    },
    price: [
      { value: 75, symbol: "USD", isDefault: 0 },
      { value: 2025, symbol: "UAH", isDefault: 1 },
    ],
    order: 4,
    date: "2018-03-15 14:20:10",
  },
  {
    id: 5,
    serialNumber: 3456,
    isNew: 1,
    photo: "pathToFile4.jpg",
    title: "Product 5",
    type: "Mice",
    specification: "Specification 5",
    guarantee: {
      start: "2019-11-22 09:45:00",
      end: "2022-11-22 09:45:00",
    },
    price: [
      { value: 30, symbol: "USD", isDefault: 0 },
      { value: 810, symbol: "UAH", isDefault: 1 },
    ],
    order: 5,
    date: "2019-11-22 09:45:00",
  },
  {
    id: 6,
    serialNumber: 7890,
    isNew: 0,
    photo: "pathToFile5.jpg",
    title: "Product 6",
    type: "Mice",
    specification: "Specification 6",
    guarantee: {
      start: "2019-11-22 09:45:00",
      end: "2021-11-22 09:45:00",
    },
    price: [
      { value: 25, symbol: "USD", isDefault: 0 },
      { value: 675, symbol: "UAH", isDefault: 1 },
    ],
    order: 5,
    date: "2019-11-22 09:45:00",
  },
];
