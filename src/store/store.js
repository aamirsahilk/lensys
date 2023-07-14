import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './features/login/LoginSlice'
import UserDataSlice from './features/userdata/UserDataSlice'

export const store = configureStore({
  reducer: {
    login: LoginSlice,
    userData: UserDataSlice,
  },
})