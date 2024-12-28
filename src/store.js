import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../src/Slice/SliceUser'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})