import { Project } from '../../../shared/models/project';
import { ProjectActionTypes } from '../../../shared/ngrx-store/constants/project';
import { All } from '../../../shared/ngrx-store/actions/project.actions';
/**
 * Project state interface
 */
export interface State {
  /**
   * State params
   * @param {Project} Project Project model
   * @param {Project[]} Projects Projects models array param
   * @param {Number} totalCount Total Projects count param
   * @param {number} totalEnabled Projects count state param
   * @param {string | null} errorMessage Error message param
   */
  newProject: Project;
  project: Project;
  projects: Project[];
  totalCount: Number;
  errorMessage: string;
  success: boolean;
}
/**
 * Initial state
 */
export const initialState: State = {
  newProject: null,
  project: null,
  projects: null,
  totalCount: null,
  errorMessage: null,
  success: null
};

const messages = {
  ERR_FAILED_GET_PROJECT: 'Failed to fetch Project.'
};
/**
 * Scenario state reducer
 * @param {State} state
 * @param {All} action
 */
export function reducer(state: State = initialState, action: All): State {
  console.log(action.type);
  switch (action.type) {
    case ProjectActionTypes.FETCH_PROJECT_SUCCESS: {
      return {
        ...state,
        projects: action.payload.projects,
        errorMessage: null
      };
    }
    case ProjectActionTypes.FETCH_PROJECT_FAILURE: {
      return {
        ...state,
        projects: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.DELETE_PROJECT_SUCCESS: {
      return {
        ...state,
        projects: action.payload.projects,
        errorMessage: null
      };
    }
    case ProjectActionTypes.DELETE_PROJECT_FAILURE: {
      return {
        ...state,
        projects: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.DUPLICATE_PROJECT_SUCCESS: {
      return {
        ...state,
        projects: action.payload.projects,
        errorMessage: null
      };
    }
    case ProjectActionTypes.DUPLICATE_PROJECT_FAILURE: {
      return {
        ...state,
        projects: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        projects: action.payload.projects,
        errorMessage: null
      };
    }
    case ProjectActionTypes.CREATE_PROJECT_FAILURE: {
      return {
        ...state,
        newProject: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.UPDATE_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload.project,
        projects: action.payload.projects,
        errorMessage: null
      };
    }
    case ProjectActionTypes.UPDATE_PROJECT_FAILURE: {
      return {
        ...state,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.FETCH_PROJECT_FROM_ID_SUCCESS: {
      return {
        ...state,
        project: action.payload.project,
        errorMessage: null
      };
    }
    case ProjectActionTypes.FETCH_PROJECT_FROM_ID_FAILURE: {
      return {
        ...state,
        project: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.FETCH_PREVIEW_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload.project,
        errorMessage: null
      };
    }
    case ProjectActionTypes.FETCH_PREVIEW_PROJECT_FAILURE: {
      return {
        ...state,
        project: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    case ProjectActionTypes.GET_QRCODE_IMAGE_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case ProjectActionTypes.GET_QRCODE_IMAGE_FAILURE: {
      return {
        ...state,
        project: null,
        errorMessage: messages.ERR_FAILED_GET_PROJECT
      };
    }
    default: {
      return state;
    }
  }
}
