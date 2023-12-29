import {
  SIGNIN,
  ERROR_OCCURRED,
  SIGNOUT,
  AUTHENTICATED,
  AUTHENTICATED_USER,
  OTPVERIFY,
} from './keys';
import API from '../api/connection';

export const getDashboard = () => async (dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authUser'));

    if (!token) {
      dispatch({
        type: AUTHENTICATED,
        payload: false,
      });
      throw new Error('Authorization token not available');
    }
    const response = await API.get('/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: AUTHENTICATED,
      payload: response?.data?.authenticated || null,
    });

    dispatch({
      type: AUTHENTICATED_USER,
      payload: response?.data?.user || null,
    });
  } catch (error) {
    console.error('Error in getDashboard:', error.message);
    localStorage.removeItem('authUser');
    dispatch({
      type: AUTHENTICATED,
      payload: error.response?.data?.authenticated || false,
    });
  }
};

export const checkAuthentication = () => (dispatch) => {
  const authUser = localStorage.getItem('authUser');
  const isAuthenticated = !!authUser;
  if (isAuthenticated) {
    dispatch({ type: AUTHENTICATED, payload: isAuthenticated });
  }
};

export const signupUser = (user) => async (dispatch) => {
  try {
    const response = await API.post('/signup', user);
    const { message, authUser } = response.data;
    if (authUser) {
      const { token } = authUser;
      localStorage.setItem('token', token);
    }

    const userData = {
      message: message,
      user: authUser,
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
    const response = await API.post('/signin', user);
    const userData = response.data;

    dispatch({
      type: SIGNIN,
      payload: userData,
    });
    localStorage.setItem('authUser', JSON.stringify(userData.authUser));

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
    const token = localStorage.getItem('token');

    const response = await API.post(
      '/verifyotp',
      { otp },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { data } = response;
    dispatch({
      type: OTPVERIFY,
      payload: data,
    });
    localStorage.removeItem('token');
  } catch (error) {
    console.log(error);
    const { message } = error.response.data;
    dispatch({
      type: ERROR_OCCURRED,
      payload: { message },
    });
  }
};

export const resendOTP = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/resendotp', {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signoutUser = () => async (dispatch) => {
  localStorage.removeItem('authUser');
  dispatch({
    type: SIGNOUT,
  });

  dispatch(checkAuthentication());
};
