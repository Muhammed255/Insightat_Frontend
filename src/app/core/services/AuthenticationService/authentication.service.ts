import { Injectable } from '@angular/core';
import { ApiRoutingService } from '../../../core/api-routing.service';
import { HttpHelperService } from '../../../core/http-helper.service';
import { Auth } from '../../../shared/models/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationMessageDialogComponent } from '../../../shared/components/validation-message-dialog/validation-message-dialog.component';

@Injectable()
/**
 * Authentication Service allow to login, register users
 * and check user session
 *
 */
export class AuthenticationService {
  /**
   * @param {string} user_api_url User api url
   * @param {any} decoded_token Decoded token object
   * @param {JwtHelperService} jwts Parse jwt service
   */
  private decoded_token: any;
  private jwts: JwtHelperService;
  /**
   * @constructor
   * @param {HttpHelperService} http Http service
   * @param {ApiRoutingService} apiRoutingService Routing service
   */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService,
    public dialog: MatDialog,
     private snackBar: MatSnackBar
  ) {
    this.jwts = new JwtHelperService();
  }


  openValidationDialog(
    icon: String,
    title: String,
    message: String,
    width?: string,
    cancelButton?: boolean
  ): Observable<any> {
    let defaultWidth: string = "500px";

    const dialogRef = this.dialog.open(ValidationMessageDialogComponent, {
      width: width ? width : defaultWidth,
      data: {
        icon: icon,
        title: title,
        message: message,
        cancelButton: cancelButton ? true : false,
      },
    });
    return dialogRef.afterClosed();
  }


  showSnackBar(message) {
    this.snackBar.open(message, "OK", { duration: 2000 });
  }






  /**
   * Register method. Allow user to register
   * @param {Auth} user User object
   * @returns {Observable<any>}
   */
  register(user: Auth): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getSignUpnAPIUrl(),
      user,
      false,
      null
    );
  }
  /**
   * Lgoin method. Allow user to login, returns user data
   * @param {Auth} user User object
   * @returns {Observable<any>}
   */
  logIn(user: Auth): Observable<any> {
    return this.http.post(
      this.apiRoutingService.getLoginAPIUrl(),
      user,
      false,
      null
    );
  }
  /**
   * Get token expiration date method. Return date when token will be expiered
   * @param {string} token Token string
   */
  private getTokenExpirationDate(token: string): Date {
    const decoded_token = this.jwts.decodeToken(token);
    const date = new Date(0);
    if (decoded_token.exp === undefined) {
      return null;
    }
    date.setUTCSeconds(decoded_token.exp);
    return date;
  }
  /**
   * Is token expired method. Check if token already expired
   * @param {string} token Token string
   * @returns {boolean}
   */
  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }
    const exp_date = this.getTokenExpirationDate(token);
    if (exp_date === undefined) {
      return false;
    }
    return !(exp_date.valueOf() > new Date().valueOf());
  }
}
