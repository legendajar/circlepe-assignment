import { createSlice } from "@reduxjs/toolkit"

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactionList: []
    },

    reducers: {
        setTransactionList: (state, action) => {
            state.transactionList = action.payload
        }
    }
})

export const { setTransactionList } = transactionSlice.actions;

export default transactionSlice.reducer;