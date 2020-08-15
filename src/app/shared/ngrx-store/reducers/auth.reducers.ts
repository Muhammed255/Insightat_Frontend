import { User } from '../../../shared/models/user';
import { AuthActionTypes } from '../../../shared/ngrx-store/constants/auth';
import { All } from '../../../shared/ngrx-store/actions/auth.actions';

/**
 * Authentication state interface
 */
export interface State {
  /**
   * State params
   * @param {boolean} isAuthenticated User auth state
   * @param {User} user User model
   * @param errorMessage Error message param
   */
  isAuthenticated: boolean;
  user: User;
  errorMessage: string;
}
/**
 * Initial state
 */
export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

const messages = {
  ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email and/or password.',
  ERR_CANNOT_GET_USER: 'Failed fetch user from local storage.',
  ERR_FAILED_LOGOUT: 'Failed logout user.'
};
/**
 * Authentication state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          country: action.payload.country,
          phone: action.payload.phone,
          handle: action.payload.handle
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_INCORRECT_EMAIL_OR_PASSWORD
      };
    }
    case AuthActionTypes.FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          country: action.payload.country,
          phone: action.payload.phone,
          handle: action.payload.handle
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.FETCH_USER_DATA_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_CANNOT_GET_USER
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state
      };
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return initialState;
    }
    case AuthActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_LOGOUT
      };
    }
    default: {
      return state;
    }
  }
}
