import { createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  list: unknown[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  list: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export default ordersSlice.reducer;
