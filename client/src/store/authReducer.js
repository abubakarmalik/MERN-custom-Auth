import {
  SIGNIN,
  ERROR_OCCURRED,
  SIGNOUT,
  AUTHENTICATED,
  OTPVERIFY,
} from './keys';

const initialState = {
  signin: null,
  errorMessage: null,
  authenticated: null,
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

    case SIGNOUT: {
      return {
        signin: null,
        errorMessage: null,
        authenticated: null,
      };
    }
    default:
      return state;
  }
}
