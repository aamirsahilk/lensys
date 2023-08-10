import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {loggedin: false},
}

export const UserDataSlice  = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateUserData } = UserDataSlice.actions

export default UserDataSlice.reducer