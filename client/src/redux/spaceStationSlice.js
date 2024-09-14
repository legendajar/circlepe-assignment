import { createSlice } from "@reduxjs/toolkit"

const spaceStationSlice = createSlice({
    name: "spaceStation",
    initialState: {
        spaceStationList: []
    },

    reducers: {
        setSpaceStationList: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setSpaceStationList } = spaceStationSlice.actions;

export default spaceStationSlice.reducer;