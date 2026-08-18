import authReducer, {
  loginSuccess,
  logout,
} from './authSlice'

test('stores user and token after login', () => {
  const loginData = {
    user: {
      id: 1,
      name: 'Wafi',
      email: 'wafi@example.com',
    },
    token: 'fake-jwt-token',
  }

  const newState = authReducer(
    undefined,
    loginSuccess(loginData)
  )

  expect(newState.user).toEqual(loginData.user)
  expect(newState.token).toBe('fake-jwt-token')
})

test('clears user and token after logout', () => {
  const loggedInState = authReducer(
    undefined,
    loginSuccess({
      user: {
        id: 1,
        name: 'Wafi',
        email: 'wafi@example.com',
      },
      token: 'fake-jwt-token',
    })
  )

  const loggedOutState = authReducer(
    loggedInState,
    logout()
  )

  expect(loggedOutState.user).toBeNull()
  expect(loggedOutState.token).toBeNull()
})