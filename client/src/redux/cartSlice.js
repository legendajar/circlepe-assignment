import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addItemToCart: (state, action) => {
            console.log()
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                // Ensure quantity does not exceed available stock
                if (existingItem.quantity < action.payload.stock) {
                    existingItem.quantity += 1;
                }
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        decreaseItemQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                }
                if (existingItem.quantity === 0) {
                    // Remove the item if the quantity reaches zero
                    state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
                }
            }
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

export const { setCartItems, addItemToCart, decreaseItemQuantity, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
