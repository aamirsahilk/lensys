import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {hasError:false},
}

export const ProductDataSlice = createSlice({
  name: 'productAdd',
  initialState,
  reducers: {
    updateProductAdd: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateProductAdd } = ProductDataSlice.actions

export default ProductDataSlice.reducer