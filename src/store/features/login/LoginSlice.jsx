import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const LoginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateData } = LoginSlice.actions

export default LoginSlice.reducer