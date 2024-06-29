import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CheckPermission } from './isPermissionFound';
import { jwtDecode } from 'jwt-decode';

const RequirePermission = ({ allowedPermission }) => {
    const permission = CheckPermission(allowedPermission);
    const token = Cookies.get('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                // Token is expired, clear the token and navigate to login
                Cookies.remove('token');
                window.location.href = '/login';
            }
        }
    }, [token]);

    return permission ? (
        <Outlet />
    ) : token ? (
        <div>not found 404</div>
    ) : (
        <Navigate to={'/login'} />
    );
}

export default RequirePermission;
