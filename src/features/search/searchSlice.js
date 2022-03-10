import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  invisible: 'true',
  content: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    enable: (state) => {
      state.invisible = false
    },
    disable: (state) => {
      state.invisible = true
    },
    search: (state, action) => {
      state.content = action.payload
    },
  },
})

export const { enable, disable, search } = searchSlice.actions

export default searchSlice.reducer
