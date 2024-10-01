import { createSlice } from "@reduxjs/toolkit"

const planetSlice = createSlice({
    name: "Planet",
    initialState: {
        user: null,
        planetList: [],
        planetOrderList: []
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setPlanetList: (state, action) => {
            state.planetList = action.payload
        },

        setPlanetOrderList: (state, action) => {
            state.planetOrderList = action.payload
        }
    }
})

export const { setUser,setPlanetList, setPlanetOrderList } = planetSlice.actions;

export default planetSlice.reducer;