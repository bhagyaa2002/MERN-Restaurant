import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload.data)
            state=action.payload.data
            state.user=action.payload.data
        }
    }
})
export const {loginRedux} = userSlice.actions
export default userSlice.reducer