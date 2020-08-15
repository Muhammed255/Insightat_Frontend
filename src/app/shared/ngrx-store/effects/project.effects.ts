import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, filter, scan, tap, concatMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import { NgxPermissionsService } from 'ngx-permissions';
import { ProjectService } from '../../../core/services/ProjectService/project.service';
import { LocalStorageService } from '../../../core/services/LocalStorageService/local-storage.service';
import { ProjectActionTypes } from '../../../shared/ngrx-store/constants/project';
import { NotificationsService } from 'angular2-notifications';

import {
  FetchProject,
  FetchProjectFailure,
  FetchProjectSuccess,
  FetchProjectFromID,
  FetchProjectFromIDFailure,
  FetchProjectFromIDSuccess,
  FetchPreviewProject,
  FetchPreviewProjectFailure,
  FetchPreviewProjectSuccess,
  UpdateProject,
  UpdateProjectFailure,
  UpdateProjectSuccess,
  CreateProject,
  CreateProjectFailure,
  CreateProjectSuccess,
  GetQRCodeImage,
  GetQRCodeImageSuccess,
  GetQRCodeImageFailure,
  DeleteProject,
  DeleteProjectSuccess,
  DeleteProjectFailure,
  DuplicateProject,
  DuplicateProjectSuccess,
  DuplicateProjectFailure
} from '../actions/project.actions';

@Injectable()
/**
 * Project side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class ProjectEffects {
  /**
   * @constructor
   * @param {Actions} actions App ngrx action service
   * @param {ProjectService} projectService Project service
   * @param {Router} router App router service
   * @param {LocalStorageService} localStorageService Local storage service
   * @param {NotificationsService} notificationsService App notification service
   */
  constructor(
    private actions: Actions,
    private projectService: ProjectService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationsService
  ) {}

  @Effect()
  FetchProject: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.FETCH_PROJECT)
    .map((action: FetchProject) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .getProject(payload)
        .map(data => {
          return new FetchProjectSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new FetchProjectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchProjectFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.FETCH_PROJECT_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  FetchProjectSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.FETCH_PROJECT_SUCCESS)
  );

  @Effect()
  DeleteProject: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.DELETE_PROJECT)
    .map((action: DeleteProject) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .deleteProject(payload)
        .map(data => {
          return new DeleteProjectSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new DeleteProjectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DeleteProjectFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.DELETE_PROJECT_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  DeleteProjectSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.DELETE_PROJECT_SUCCESS)
  );

  @Effect()
  DuplicateProject: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.DUPLICATE_PROJECT)
    .map((action: DuplicateProject) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .duplicateProject(payload)
        .map(data => {
          return new DuplicateProjectSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new DuplicateProjectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  DuplicateProjectFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.DUPLICATE_PROJECT_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  DuplicateProjectSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.DUPLICATE_PROJECT_SUCCESS)
  );

  @Effect()
  FetchProjectFromID: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.FETCH_PROJECT_FROM_ID)
    .map((action: FetchProjectFromID) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .getProjectFromID(payload)
        .map(data => {
          return new FetchProjectFromIDSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new FetchProjectFromIDFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchProjectFromIDFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.FETCH_PROJECT_FROM_ID_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  FetchProjectFromIDSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.FETCH_PROJECT_FROM_ID_SUCCESS)
  );

  @Effect()
  FetchPreviewProject: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.FETCH_PREVIEW_PROJECT)
    .map((action: FetchProjectFromID) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .getPreviewProject(payload)
        .map(data => {
          return new FetchPreviewProjectSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(
            new FetchPreviewProjectFailure({ error: error })
          );
        });
    });

  @Effect({ dispatch: false })
  FetchPreviewProjectFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.FETCH_PREVIEW_PROJECT_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  FetchPreviewProjectSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.FETCH_PREVIEW_PROJECT_SUCCESS)
  );

  @Effect()
  CreateProject: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.CREATE_PROJECT)
    .map((action: CreateProject) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .createProject(payload)
        .map(data => {
          return new CreateProjectSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new CreateProjectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateProjectFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.CREATE_PROJECT_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  CreateProjectSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.CREATE_PROJECT_SUCCESS)
  );

  @Effect()
  UpdateProject: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.UPDATE_RROJECT)
    .map((action: UpdateProject) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .updateProject(payload)
        .map(data => {
          return new UpdateProjectSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new UpdateProjectFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  UpdateProjectFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.UPDATE_PROJECT_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  UpdateProjectSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.UPDATE_PROJECT_SUCCESS)
  );

  @Effect()
  GetQRCodeImage: Observable<Action> = this.actions
    .ofType(ProjectActionTypes.GET_QRCODE_IMAGE)
    .map((action: GetQRCodeImage) => action.payload)
    .switchMap(payload => {
      return this.projectService
        .getQRCodeImage(payload)
        .map(data => {
          return new GetQRCodeImageSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new GetQRCodeImageFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  GetQRCodeImageFailure: Observable<any> = this.actions
    .ofType(ProjectActionTypes.GET_QRCODE_IMAGE_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  GetQRCodeImageSuccess: Observable<any> = this.actions.pipe(
    ofType(ProjectActionTypes.GET_QRCODE_IMAGE_SUCCESS)
  );
}
