import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: []
    },

    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload
        }
    }
})

export const { setProductList } = productSlice.actions;

export default productSlice.reducer;