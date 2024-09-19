import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderList: [],
        orderListSpaceStation: []
    },

    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },

        setOrderListSpaceStation: (state, action) => {
            state.orderListSpaceStation = action.payload
        }
    }
})

export const { setOrderList, setOrderListSpaceStation } = orderSlice.actions;

export default orderSlice.reducer;