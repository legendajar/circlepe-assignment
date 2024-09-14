import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderList: []
    },

    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        }
    }
})

export const { setOrderList } = orderSlice.actions;

export default orderSlice.reducer;