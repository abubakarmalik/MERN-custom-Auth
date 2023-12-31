import {
  SIGNIN,
  ERROR_OCCURRED,
  SIGNOUT,
  AUTHENTICATED,
  OTPVERIFY,
  AUTHENTICATED_USER,
  RESET_MESSAGES,
  FORGET_ACCOUNT,
  UPDATE_PASSWORD,
} from './keys';

const initialState = {
  signin: null,
  errorMessage: null,
  authenticated: false,
  authenticatedUser: null,
  verifyotp: null,
  forgetAccount: null,
  updatePassword: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN: {
      return {
        ...state,
        signin: action.payload,
      };
    }

    case AUTHENTICATED: {
      return {
        ...state,
        authenticated: action.payload,
      };
    }
    case AUTHENTICATED_USER: {
      return {
        ...state,
        authenticatedUser: action.payload,
      };
    }

    case ERROR_OCCURRED: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case OTPVERIFY: {
      return {
        ...state,
        verifyotp: action.payload,
      };
    }
    case RESET_MESSAGES: {
      return {
        ...state,
        errorMessage: null,
        signin: {
          message: null,
          authUser: state?.signin?.authUser,
        },
      };
    }

    case FORGET_ACCOUNT: {
      return {
        ...state,
        forgetAccount: action.payload,
      };
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        updatePassword: action.payload,
      };
    }

    case SIGNOUT: {
      return {
        signin: null,
        errorMessage: null,
        authenticated: false,
        authenticatedUser: null,
        verifyotp: null,
        forgetAccount: null,
        updatePassword: null,
      };
    }
    default:
      return state;
  }
}
