import {
  SIGNIN,
  ERROR_OCCURRED,
  SIGNOUT,
  AUTHENTICATED,
  OTPVERIFY,
  AUTHENTICATED_USER,
  RESET_MESSAGES,
} from './keys';

const initialState = {
  signin: null,
  errorMessage: null,
  authenticated: false,
  authenticatedUser: null,
  verifyotp: null,
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
          authUser: state.signin.authUser,
        },
      };
    }

    case SIGNOUT: {
      return {
        signin: null,
        errorMessage: null,
        authenticated: false,
      };
    }
    default:
      return state;
  }
}
