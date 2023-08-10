import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const ProductAddedInCart = createSlice({
  name: 'productAddedInCart',
  initialState,
  reducers: {
    updateProductData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateProductData } = ProductAddedInCart.actions

export default ProductAddedInCart.reducer