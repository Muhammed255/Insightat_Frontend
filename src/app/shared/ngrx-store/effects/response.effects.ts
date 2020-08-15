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
import { ResponseService } from '../../../core/services/ResponseService/response.service';
import { ResponseActionTypes } from '../../../shared/ngrx-store/constants/response';

import {
  CreateResponse,
  CreateResponseSuccess,
  CreateResponseFailure,
  FetchResponsesFromID,
  FetchResponsesFromIDSuccess,
  FetchResponsesFromIDFailure,
  RemoveResponse,
  RemoveResponseSuccess,
  RemoveResponseFailure
} from '../actions/response.actions';

@Injectable()
/**
 * Response side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class ResponseEffects {
  /**
   * @constructor
   * @param {Actions} actions App ngrx action service
   * @param {ResponseService} responseService Response service
   * @param {Router} router App router service
   */
  constructor(
    private actions: Actions,
    private responseService: ResponseService,
    private router: Router
  ) {}

  @Effect()
  CreateResponse: Observable<Action> = this.actions
    .ofType(ResponseActionTypes.CREATE_RESPONSE)
    .map((action: CreateResponse) => action.payload)
    .switchMap(payload => {
      return this.responseService
        .CreateResponse(payload)
        .map(data => {
          return new CreateResponseSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new CreateResponseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  CreateResponseFailure: Observable<any> = this.actions
    .ofType(ResponseActionTypes.CREATE_RESPONSE_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  CreateResponseSuccess: Observable<any> = this.actions.pipe(
    ofType(ResponseActionTypes.CREATE_RESPONSE_SUCCESS)
  );

  @Effect()
  RemoveResponse: Observable<Action> = this.actions
    .ofType(ResponseActionTypes.REMOVE_RESPONSE)
    .map((action: RemoveResponse) => action.payload)
    .switchMap(payload => {
      return this.responseService
        .RemoveResponse(payload)
        .map(data => {
          return new RemoveResponseSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new RemoveResponseFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  RemoveResponseFailure: Observable<any> = this.actions
    .ofType(ResponseActionTypes.REMOVE_RESPONSE_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  RemoveResponseSuccess: Observable<any> = this.actions.pipe(
    ofType(ResponseActionTypes.REMOVE_RESPONSE_SUCCESS)
  );

  @Effect()
  FetchResponsesFromID: Observable<Action> = this.actions
    .ofType(ResponseActionTypes.FETCH_RESPONSES_FROM_ID)
    .map((action: FetchResponsesFromID) => action.payload)
    .switchMap(payload => {
      return this.responseService
        .FetchResponses(payload)
        .map(data => {
          return new FetchResponsesFromIDSuccess(data);
        })
        .catch(error => {
          console.log(error);
          return Observable.of(new FetchResponsesFromIDFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  FetchResponsesFromIDFailure: Observable<any> = this.actions
    .ofType(ResponseActionTypes.FETCH_RESPONSES_FROM_ID_FAILURE)
    .map(() => {});

  @Effect({ dispatch: false })
  FetchResponsesFromIDSuccess: Observable<any> = this.actions.pipe(
    ofType(ResponseActionTypes.FETCH_RESPONSES_FROM_ID_SUCCESS)
  );
}
