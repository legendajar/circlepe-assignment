import { createSlice } from "@reduxjs/toolkit"

const spaceStationSlice = createSlice({
    name: "spaceStation",
    initialState: {
        user: null,
        spaceStationList: []
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setSpaceStationList: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser, setSpaceStationList } = spaceStationSlice.actions;

export default spaceStationSlice.reducer;