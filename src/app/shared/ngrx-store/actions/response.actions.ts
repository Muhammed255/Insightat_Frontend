import { Action } from '@ngrx/store';
import { ResponseActionTypes } from '../../../shared/ngrx-store/constants/response';
/**
 * Create response data action
 * Called when try to create response data
 */
export class CreateResponse implements Action {
  readonly type = ResponseActionTypes.CREATE_RESPONSE;
  constructor(public payload: any) {}
}
/**
 * Create response data success action
 * Called when create response data successful
 */
export class CreateResponseSuccess implements Action {
  readonly type = ResponseActionTypes.CREATE_RESPONSE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create response data failure action
 * Called when create response data failure
 */
export class CreateResponseFailure implements Action {
  readonly type = ResponseActionTypes.CREATE_RESPONSE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Remove response data action
 * Called when try to remove response data
 */
export class RemoveResponse implements Action {
  readonly type = ResponseActionTypes.REMOVE_RESPONSE;
  constructor(public payload: any) {}
}
/**
 * Remove response data success action
 * Called when remove response data successful
 */
export class RemoveResponseSuccess implements Action {
  readonly type = ResponseActionTypes.REMOVE_RESPONSE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Remove response data failure action
 * Called when remove response data failure
 */
export class RemoveResponseFailure implements Action {
  readonly type = ResponseActionTypes.REMOVE_RESPONSE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch responses data from id  action
 * Called when try to Fetch responses data from id
 */
export class FetchResponsesFromID implements Action {
  readonly type = ResponseActionTypes.FETCH_RESPONSES_FROM_ID;
  constructor(public payload: any) {}
}
/**
 * Fetch responses data from id  success action
 * Called when Fetch responses data from id  successful
 */
export class FetchResponsesFromIDSuccess implements Action {
  readonly type = ResponseActionTypes.FETCH_RESPONSES_FROM_ID_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch responses data from id failure action
 * Called when Fetch responses data from id failure
 */
export class FetchResponsesFromIDFailure implements Action {
  readonly type = ResponseActionTypes.FETCH_RESPONSES_FROM_ID_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | CreateResponse
  | CreateResponseSuccess
  | CreateResponseFailure
  | FetchResponsesFromID
  | FetchResponsesFromIDSuccess
  | FetchResponsesFromIDFailure
  | RemoveResponse
  | RemoveResponseSuccess
  | RemoveResponseFailure;
