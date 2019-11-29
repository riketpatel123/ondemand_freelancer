import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

/** send a request to server to register new user into website */
export const registerUser = (userData, history) => dispatch => {
    axios.post("/users/register", userData)
        .then(response => { 
            // redirect to login page after registered
            history.push("/login")
        })
        .catch(error =>
            { 
            // dispatch validation error message is there is some error from server
            dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    });
}

/**send a request to server  with login and password for login into website and collect the jwt token
 * and  store into local storage. and verify if user try to login into our site
 */
export const loginUser = userData => dispatch => {
    
    axios.post("/users/login", userData)
        .then(response => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = response.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
};
/**Set logged in User */
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
/**Loading user screen */
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
/**  method to handle Userlogout pocessor */
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
