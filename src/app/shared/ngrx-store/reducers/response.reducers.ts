import { Response } from '../../../shared/models/response';
import { ResponseActionTypes } from '../../../shared/ngrx-store/constants/response';
import { All } from '../../../shared/ngrx-store/actions/response.actions';
/**
 * Response state interface
 */
export interface State {
  /**
   * State params
   * @param {Response} Response model
   * @param {Response[]} Response responses models array param
   * @param {string | null} errorMessage Error message param
   */
  response: Response;
  responses: Response[];
  totalResponses: Response[];
  fullResponses: Response[];
  errorMessage: string;
  success: boolean;
  total: number;
}
/**
 * Initial state
 */
export const initialState: State = {
  response: null,
  responses: null,
  totalResponses: null,
  fullResponses: null,
  errorMessage: null,
  success: null,
  total: null
};

const messages = {
  ERR_FAILED_GET_RESPONSE: 'Failed to fetch Response.'
};
/**
 * Scenario state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  console.log(action.type);
  switch (action.type) {
    case ResponseActionTypes.CREATE_RESPONSE_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case ResponseActionTypes.CREATE_RESPONSE_FAILURE: {
      return {
        ...state,
        responses: null,
        errorMessage: messages.ERR_FAILED_GET_RESPONSE
      };
    }
    case ResponseActionTypes.FETCH_RESPONSES_FROM_ID_SUCCESS: {
      return {
        ...state,
        responses: action.payload.responses,
        total: action.payload.total,
        totalResponses: action.payload.totalResponses,
        fullResponses: action.payload.fullResponses,
        errorMessage: null
      };
    }
    case ResponseActionTypes.FETCH_RESPONSES_FROM_ID_FAILURE: {
      return {
        ...state,
        responses: null,
        errorMessage: messages.ERR_FAILED_GET_RESPONSE
      };
    }
    case ResponseActionTypes.REMOVE_RESPONSE_SUCCESS: {
      return {
        ...state,
        responses: action.payload.responses,
        total: action.payload.total,
        totalResponses: action.payload.totalResponses,
        fullResponses: action.payload.fullResponses,
        errorMessage: null
      };
    }
    case ResponseActionTypes.REMOVE_RESPONSE_FAILURE: {
      return {
        ...state,
        responses: null,
        errorMessage: messages.ERR_FAILED_GET_RESPONSE
      };
    }
    default: {
      return state;
    }
  }
}
