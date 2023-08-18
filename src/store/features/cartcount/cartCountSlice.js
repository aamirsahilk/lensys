import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const CartCountSlice = createSlice({
  name: 'CartCountSlice',
  initialState,
  reducers: {
    updateCartCount: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateCartCount } = CartCountSlice.actions

export default CartCountSlice.reducer