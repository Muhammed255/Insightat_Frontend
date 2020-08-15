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
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from '../../../core/services/AuthenticationService/authentication.service';
import { RoleService } from '../../../core/services/UserRoleService/role.service';
import { LocalStorageService } from '../../../core/services/LocalStorageService/local-storage.service';
import { AuthActionTypes } from '../../../shared/ngrx-store/constants/auth';

import {
  LogIn,
  LogInSuccess,
  LogInFailure,
  LogOut,
  LogOutSuccess,
  LogOutFailure,
  FetchUserData,
  FetchUserDataFailure,
  FetchUserDataSuccess
} from '../actions/auth.actions';

@Injectable()
/**
 * Auth side-effects service. {@link https://github.com/ngrx/effects/blob/master/docs/intro.md Effects}
 */
export class AuthEffects {
  /**
   * @constructor
   * @param {Actions} actions App ngrx action service
   * @param {AuthenticationService} authService Authentication service
   * @param {RoleService} roleService Role service
   * @param {Router} router App router service
   * @param {LocalStorageService} localStorageService  App local storage service
   * @param {NgxPermissionsService} permissionsService User permissions service
   */
  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private roleService: RoleService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private permissionsService: NgxPermissionsService
  ) {}

  @Effect()
  LogIn: Observable<Action> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {

      return this.authService
        .logIn(payload)
        .map(data => {
          console.log(data.user);
          this.authService.showSnackBar('Welcome to our Survey System')
          return new LogInSuccess({
            _id: data.user._id,
            token: data.token,
            email: data.user.email,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            country: data.user.country,
            phone: data.user.phone,
            handle: data.user.handle,
            isAdmin: data.user.isAdmin,
            verified: data.user.verified
          });

        })
        .catch(error => {
          console.log(error);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(data => {
      this.localStorageService.setUserData(data.payload);
      if (data.payload.isAdmin) this.router.navigate(['admin']);
      else this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  FetchUserData: Observable<any> = this.actions
    .ofType(AuthActionTypes.FETCH_USER_DATA)
    .map(user => {
      if (!this.localStorageService.getUserEmail()) {
        return new FetchUserDataFailure({
          error: 'Failed fetch user from local storage.'
        });
      } else {
        return new FetchUserDataSuccess(this.localStorageService.getUserData());
      }
    });

  @Effect({ dispatch: false })
  FetchUserDataFailure: Observable<any> = this.actions
    .ofType(AuthActionTypes.FETCH_USER_DATA_FAILURE)
    .map(() => {
      this.router.navigateByUrl('/login');
    });

  @Effect({ dispatch: false })
  FetchUserDataSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FETCH_USER_DATA_SUCCESS),
    tap(data => {
      this.localStorageService.setUserData(data.payload);
    })
  );

  @Effect({ dispatch: false })
  public LogOutFailure: Observable<any> = this.actions.ofType(AuthActionTypes.LOGOUT);

  @Effect()
  LogOut: Observable<any> = this.actions.ofType(AuthActionTypes.LOGOUT).map(() => {
    this.localStorageService.removeUserData();
    if (!this.localStorageService.getUserEmail()) {
      return new LogOutSuccess();
    } else {
      return new LogOutFailure({ error: 'Logout Failure' });
    }
  });

  @Effect({ dispatch: false })
  public LogOutSuccess: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGOUT_SUCCESS)
    .map(user => {
      this.router.navigateByUrl('/login');
    });
}
