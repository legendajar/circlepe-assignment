import { createSlice } from "@reduxjs/toolkit"
import planetSlice from "./planetSlice";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderList: [],
        planetOrderList: []
    },

    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },

        setPlanetOrderList: (state, action) => {
            state.planetOrderList = action.payload
        }
    }
})

export const { setOrderList, setPlanetOrderList } = orderSlice.actions;

export default orderSlice.reducer;