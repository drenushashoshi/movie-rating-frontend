export const variables = {
    API_URL: "http://localhost:5188/"
}

import {jwtDecode} from 'jwt-decode';

export const getUserIdFromToken = (): string | null => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // Decode the token to extract user ID
    const decodedToken:any = jwtDecode(token);
    
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']; // Extract user ID from 'sub' claim
    console.log(userId);
    return userId;
    
  } else {
    return null;
  }
};