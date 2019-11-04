import axios from "axios";
import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

/**New user register */
export const registerUser = (userData, history) => dispatch => {
    axios.post("/users/register", userData)
        .then(response => { 
            history.push("/login")
        })
        .catch(error =>
            {
            dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    });
}

/**Login User*/
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
/**Set logged in user */
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
/** User LogOut */
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
