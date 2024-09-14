import { createSlice } from "@reduxjs/toolkit"

const planetSlice = createSlice({
    name: "Planet",
    initialState: {
        planetList: []
    },

    reducers: {
        setPlanetList: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setPlanetList } = planetSlice.actions;

export default planetSlice.reducer;