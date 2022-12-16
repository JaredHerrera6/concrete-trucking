import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  //Gets the item isAuth from local storage
  const isAuth = localStorage.getItem('isAuth')
  //If only the isAuth item is equal to true
  if(isAuth && JSON.parse(isAuth) === true){
    return true
  }
  return false
}

const initialState = {
  isAuth: userAuthFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser : (state) => {
        state.isAuth = true
    },
    unauthenticateUser : (state) => {
        state.isAuth = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer