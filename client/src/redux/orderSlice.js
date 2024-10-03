import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        singleOrder: null,
        orderList: [],
        orderListSpaceStation: []
    },

    reducers: {
        setSingleOrder: (state, action) => {
            state.singleOrder = action.payload
        },

        setOrderList: (state, action) => {
            state.orderList = action.payload
        },

        setOrderListSpaceStation: (state, action) => {
            state.orderListSpaceStation = action.payload
        }
    }
})

export const { setSingleOrder, setOrderList, setOrderListSpaceStation } = orderSlice.actions;

export default orderSlice.reducer;