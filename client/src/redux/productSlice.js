import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
        planetProductList: [],
        singleProduct: null
    },

    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        setPlanetProductList: (state, action) => {
            state.productListByPlanet = action.payload
        },

        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload
        }
    }
})

export const { setProductList, setPlanetProductList, setSingleProduct } = productSlice.actions;

export default productSlice.reducer;