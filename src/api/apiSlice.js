import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { logout, selectCurrentToken, setCredentials } from '../authentication/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://knownlege.test/api/v1',
  //credentials: 'include', // Include credentials in the requests
  prepareHeaders: (headers, { getState }) => {
    const token = selectCurrentToken(getState());

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    
    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken }));
      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logout user if refresh fails
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery:baseQueryWithReauth,
  endpoints: (builder) => ({
   
  }),
});

//export const { useLoginMutation, useCreateAdminMutation, useDeleteAdminMutation, useListAdminsQuery } = apiSlice;
