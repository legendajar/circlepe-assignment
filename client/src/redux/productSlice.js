import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
        planetProductList: []
    },

    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        setPlanetProductList: (state, action) => {
            state.productListByPlanet = action.payload
        }
    }
})

export const { setProductList, setPlanetProductList } = productSlice.actions;

export default productSlice.reducer;