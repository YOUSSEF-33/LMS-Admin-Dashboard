import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const initialState = {
  token: Cookies.get('token') || null,
  role: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { data, adminData } = action.payload;
      const token = data.token
      console.log(token);
      console.log(adminData)
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(decodedToken.exp);
      if(decodedToken.exp < currentTime){
        Cookies.remove('token');
      }else{
        state.token = token;
        state.me = adminData;
        state.permissions = adminData.roles?.[0].permissions
        Cookies.set('token', token, {expires:7});
        localStorage.setItem('me', JSON.stringify(adminData));
        localStorage.setItem('permissions', JSON.stringify(adminData.roles?.[0].permissions));
      }
        
      //const classAssigned = decodeToken.access.classAssigned;
    //   const user = decodeToken.username;
    //   state.token = token.data.token;
    //   state.user = user;
      //Cookies.set('token', token.data.token, { expires: 7 })
      //state.role = userRole;
      //state.classAssigned = classAssigned;
    },
    setRole: (state, action) => {
      const  role  = action.payload;
      //console.log(role);
      state.role = role;
      Cookies.set('role', role, { expires: 7 })
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      Cookies.remove('token');
      Cookies.remove('role');
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  },
});

export const { setCredentials, logout, setClass, setRole, setUserInfo } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentUser = (state) => state.auth.user;
export const selectUserInfo = (state)=> state.auth.userInfo;
export const selectAdminInfo = (state)=> state.auth.me;

export default authSlice.reducer;
