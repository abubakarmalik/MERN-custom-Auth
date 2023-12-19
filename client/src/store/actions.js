import {
  SIGNIN,
  ERROR_OCCURRED,
  SIGNOUT,
  AUTHENTICATED,
  OTPVERIFY,
} from './keys';
import API from '../api/connection';

export const checkAuthentication = () => (dispatch) => {
  const authUser = localStorage.getItem('authUser');

  if (authUser) {
    const isAuthenticated = JSON.parse(authUser);
    dispatch({ type: AUTHENTICATED, payload: isAuthenticated });
  }
};

export const signupUser = (user) => async (dispatch) => {
  try {
    const response = await API.post('/signup', user);
    const { message, name, email } = response.data;

    const userData = {
      message: message,
      user: { name, email },
    };

    dispatch({
      type: SIGNIN,
      payload: userData,
    });
  } catch (error) {
    const { message } = error.response.data;
    dispatch({
      type: ERROR_OCCURRED,
      payload: { message },
    });
  }
};

export const signinUser = (user) => async (dispatch) => {
  try {
    const response = API.post('/signin', user);
    const userData = (await response).data;

    dispatch({
      type: SIGNIN,
      payload: userData,
    });

    localStorage.setItem('authUser', JSON.stringify(userData.authUser));
    // Check and update the authentication state
    dispatch(checkAuthentication());
  } catch (error) {
    const { message } = error.response.data;
    dispatch({
      type: ERROR_OCCURRED,
      payload: { message },
    });
  }
};
export const verifyOTP = (otp) => async (dispatch) => {
  try {
    const response = await API.post('/verifyotp', { otp });
    const { data } = await response;
    dispatch({
      type: OTPVERIFY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    const { message } = error.response.data;
    dispatch({
      type: ERROR_OCCURRED,
      payload: { message },
    });
  }
};
export const signoutUser = () => (dispatch) => {
  localStorage.removeItem('authUser');
  dispatch({
    type: SIGNOUT,
  });

  dispatch(checkAuthentication());
};
