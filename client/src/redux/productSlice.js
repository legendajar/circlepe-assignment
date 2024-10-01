import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        singleProduct: null,
        productList: [],
        planetProductList: []
    },
    reducers: {
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        },

        setProductList: (state, action) => {
            state.productList = action.payload;
        },

        setPlanetProductList: (state, action) => {
            state.planetProductList = action.payload;
        }
    }
});

export const { setSingleProduct, setProductList, setPlanetProductList } = productSlice.actions;

export default productSlice.reducer;
