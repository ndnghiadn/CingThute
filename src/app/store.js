import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    search: searchReducer,
  },
})
