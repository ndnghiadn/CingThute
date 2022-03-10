import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import authAPI from '../../api/authAPI'
import userAPI from '../../api/userAPI'

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(data)
    localStorage.setItem('access_token', response.accessToken)
    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(data)
    localStorage.setItem('access_token', response.accessToken)
    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const getUser = createAsyncThunk('auth/getUser', async (data, { rejectWithValue }) => {
  try {
    const response = await userAPI.getCurrentUser()
    return response
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

const initialState = {
  loading: false,
  user: null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
    follow: (state, action) => {
      state.user.following.push(action.payload)
    },
    unfollow: (state, action) => {
      const index = state.user.following.indexOf(action.payload)
      if (index > -1) {
        state.user.following.splice(index, 1)
      }
    },
    setAvtAndDesc: (state, action) => {
      state.user.avatar = action.payload.avatar
      state.user.description = action.payload.desc
    },
    setDescription: (state, action) => {
      state.user.description = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        toast(`${action.payload.msg}`)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        toast.error(`${action.payload.msg}`)
      })
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        toast(`${action.payload.msg}`)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        toast.error(`${action.payload.msg}`)
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        toast.error(`${action.payload.msg}`)
      })
  },
})

export const { logout, follow, unfollow, setAvtAndDesc, setDescription } = userSlice.actions

export default userSlice.reducer
