import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from '../features/applications/applicationSlice'

import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    applications: applicationReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch