import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Application } from '../../types/application'

const initialState: Application[] = [
    {
        id: 1,
        company: 'Google',
        position: 'Frontend Intern',
        status: 'Applied',
    },
    {
        id: 2,
        company: 'Microsoft',
        position: 'Software Engineer Intern',
        status: 'Interview',
    },
    {
        id: 3,
        company: 'Shopee',
        position: 'React Developer Intern',
        status: 'Applied',
    },
    {
        id: 4,
        company: 'Grab',
        position: 'Software Intern',
        status: 'Offer',
    },
]

const applicationSlice = createSlice({
    name: 'applications',

    initialState,

    reducers: {
        addApplication: (state, action: PayloadAction<Application>) => {
            state.push(action.payload)
        },

        deleteApplication: (state, action: PayloadAction<number>) => {
            return state.filter(
                (application) => application.id !== action.payload
            )
        },
        setApplications: (
            _state,
            action: PayloadAction<Application[]>
        ) => {
            return action.payload
        },
        updateApplication: (
            state,
            action: PayloadAction<Application>
        ) => {
            const index = state.findIndex(
                (application) => application.id === action.payload.id
            )

            if (index !== -1) {
                state[index] = action.payload
            }
        },
    },
})

export const { addApplication, deleteApplication, setApplications, updateApplication } =
    applicationSlice.actions

export default applicationSlice.reducer