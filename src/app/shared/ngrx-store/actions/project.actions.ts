import { Action } from '@ngrx/store';
import { Project } from '../../../shared/models/project';
import { ProjectActionTypes } from '../../../shared/ngrx-store/constants/project';
/**
 * Fetch project data action
 * Called when try to fetch project data
 */
export class FetchProject implements Action {
  readonly type = ProjectActionTypes.FETCH_PROJECT;
  constructor(public payload: any) {}
}
/**
 * Fetch project data success action
 * Called when fetch project data successful
 */
export class FetchProjectSuccess implements Action {
  readonly type = ProjectActionTypes.FETCH_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch project data failure action
 * Called when fetch project data failure
 */
export class FetchProjectFailure implements Action {
  readonly type = ProjectActionTypes.FETCH_PROJECT_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Delete project data action
 * Called when try to delete project data
 */
export class DeleteProject implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT;
  constructor(public payload: any) {}
}
/**
 * Delete project data success action
 * Called when delete project data successful
 */
export class DeleteProjectSuccess implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Delete project data failure action
 * Called when delete project data failure
 */
export class DeleteProjectFailure implements Action {
  readonly type = ProjectActionTypes.DELETE_PROJECT_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Duplicate project data action
 * Called when try to duplicate project data
 */
export class DuplicateProject implements Action {
  readonly type = ProjectActionTypes.DUPLICATE_PROJECT;
  constructor(public payload: any) {}
}
/**
 * Duplicate project data success action
 * Called when duplicate project data successful
 */
export class DuplicateProjectSuccess implements Action {
  readonly type = ProjectActionTypes.DUPLICATE_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Duplicate project data failure action
 * Called when duplicate project data failure
 */
export class DuplicateProjectFailure implements Action {
  readonly type = ProjectActionTypes.DUPLICATE_PROJECT_FAILURE;
  constructor(public payload: any) {}
}

/**
 * Fetch project data from id action
 * Called when try to fetch project data
 */
export class FetchProjectFromID implements Action {
  readonly type = ProjectActionTypes.FETCH_PROJECT_FROM_ID;
  constructor(public payload: any) {}
}
/**
 * Fetch project data from id success action
 * Called when fetch project data successful
 */
export class FetchProjectFromIDSuccess implements Action {
  readonly type = ProjectActionTypes.FETCH_PROJECT_FROM_ID_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch project data from id failure action
 * Called when fetch project data failure
 */
export class FetchProjectFromIDFailure implements Action {
  readonly type = ProjectActionTypes.FETCH_PROJECT_FROM_ID_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Fetch preview project action
 * Called when try to fetch project data
 */
export class FetchPreviewProject implements Action {
  readonly type = ProjectActionTypes.FETCH_PREVIEW_PROJECT;
  constructor(public payload: any) {}
}
/**
 * Fetch preview project success action
 * Called when fetch project data successful
 */
export class FetchPreviewProjectSuccess implements Action {
  readonly type = ProjectActionTypes.FETCH_PREVIEW_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Fetch preview project failure action
 * Called when fetch project data failure
 */
export class FetchPreviewProjectFailure implements Action {
  readonly type = ProjectActionTypes.FETCH_PREVIEW_PROJECT_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Create project data action
 * Called when try to create project data
 */
export class CreateProject implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT;
  constructor(public payload: any) {}
}
/**
 * Create project data success action
 * Called when create project data successful
 */
export class CreateProjectSuccess implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Create project data failure action
 * Called when create project data failure
 */
export class CreateProjectFailure implements Action {
  readonly type = ProjectActionTypes.CREATE_PROJECT_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Update project data action
 * Called when try to update project data
 */
export class UpdateProject implements Action {
  readonly type = ProjectActionTypes.UPDATE_RROJECT;
  constructor(public payload: any) {}
}
/**
 * Update project data success action
 * Called when update project data successful
 */
export class UpdateProjectSuccess implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Update project data failure action
 * Called when update project data failure
 */
export class UpdateProjectFailure implements Action {
  readonly type = ProjectActionTypes.UPDATE_PROJECT_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Get QRCode Image data action
 * Called when try to Get QRCode Image project data
 */
export class GetQRCodeImage implements Action {
  readonly type = ProjectActionTypes.GET_QRCODE_IMAGE;
  constructor(public payload: any) {}
}
/**
 * Get QRCode Image data success action
 * Called when Get QRCode Image data successful
 */
export class GetQRCodeImageSuccess implements Action {
  readonly type = ProjectActionTypes.GET_QRCODE_IMAGE_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * Get QRCode Image data failure action
 * Called when Get QRCode Image data failure
 */
export class GetQRCodeImageFailure implements Action {
  readonly type = ProjectActionTypes.GET_QRCODE_IMAGE_FAILURE;
  constructor(public payload: any) {}
}
/**
 * Action types
 * Export action types
 */
export type All =
  | FetchProject
  | FetchProjectSuccess
  | FetchProjectFailure
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFailure
  | UpdateProject
  | UpdateProjectSuccess
  | UpdateProjectFailure
  | FetchProjectFromID
  | FetchProjectFromIDSuccess
  | FetchProjectFromIDFailure
  | FetchPreviewProject
  | FetchPreviewProjectSuccess
  | FetchPreviewProjectFailure
  | GetQRCodeImage
  | GetQRCodeImageSuccess
  | GetQRCodeImageFailure
  | DeleteProject
  | DeleteProjectSuccess
  | DeleteProjectFailure
  | DuplicateProject
  | DuplicateProjectSuccess
  | DuplicateProjectFailure;
