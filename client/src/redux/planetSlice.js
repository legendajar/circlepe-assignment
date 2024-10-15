import { createSlice } from "@reduxjs/toolkit"

const planetSlice = createSlice({
    name: "Planet",
    initialState: {
        user: null,
        planetList: [],
        planetOrderList: [],
        singlePlanet: null
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
        },

        setSinglePlanet: (state, action) => {
            state.singlePlanet = action.payload
        }
    }
})

export const { setUser,setPlanetList, setPlanetOrderList, setSinglePlanet } = planetSlice.actions;

export default planetSlice.reducer;