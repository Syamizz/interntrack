import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type User = {
  id: number
  name: string
  email: string
}

type AuthState = {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User
        token: string
      }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },

    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer