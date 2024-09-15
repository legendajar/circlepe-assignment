import { createSlice } from "@reduxjs/toolkit"

const planetSlice = createSlice({
    name: "Planet",
    initialState: {
        user: null,
        planetList: []
    },

    reducers: {
        setUser: (state, action) => {
            state.setUser = action.payload
        },

        setPlanetList: (state, action) => {
            state.planetList = action.payload
        }
    }
})

export const { setUser,setPlanetList } = planetSlice.actions;

export default planetSlice.reducer;