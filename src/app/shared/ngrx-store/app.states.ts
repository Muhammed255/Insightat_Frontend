import {
  createFeatureSelector,
  ActionReducer,
  State,
  ActionReducerMap,
  Store,
  combineReducers,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';

import * as auth from '../../shared/ngrx-store/reducers/auth.reducers';
import * as user from '../../shared/ngrx-store/reducers/user.reducers';
import * as project from '../../shared/ngrx-store/reducers/project.reducers';
import * as response from '../../shared/ngrx-store/reducers/response.reducers';

import { AuthActionTypes } from '../../shared/ngrx-store/constants/auth';

export interface AppState {
  authState: auth.State;
  userState: user.State;
  projectState: project.State;
  responseState: response.State;
}

export const reducers = {
  authState: auth.reducer,
  userState: user.reducer,
  projectState: project.reducer,
  responseState: response.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('authState');
export const selectUserState = createFeatureSelector<AppState>('userState');
export const selectProjectState = createFeatureSelector<AppState>(
  'projectState'
);
export const selectResponseState = createFeatureSelector<AppState>(
  'responseState'
);

const combinedReducer: ActionReducer<AppState> = combineReducers(reducers);

/**
 * The single reducer function.
 * @function reducer
 * @param {any} state
 * @param {any} action
 */
export function reducer(state: any, action: any) {
  return combinedReducer(state, action);
}

export const getAuthState = (state: AppState) => state.authState;

// For resetting state upon successful logout
export function clearState(
  myReducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state: AppState, action: Action): AppState {
    if (action.type === AuthActionTypes.LOGOUT_SUCCESS) {
      state = undefined;
    }
    return myReducer(state, action);
  };
}
export const metaReducers: MetaReducer<AppState>[] = [clearState];
