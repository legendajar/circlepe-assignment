import { createSlice } from "@reduxjs/toolkit"

const spaceStationSlice = createSlice({
    name: "spaceStation",
    initialState: {
        user: null,
        spaceStationList: [], 
        singleSpaceStation: null
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setSpaceStationList: (state, action) => {
            state.spaceStationList = action.payload
        },

        setSingleSpaceStation: (state, action) => {
            state.singleSpaceStation = action.payload
        }
    }
})

export const { setUser, setSpaceStationList, setSingleSpaceStation } = spaceStationSlice.actions;

export default spaceStationSlice.reducer;