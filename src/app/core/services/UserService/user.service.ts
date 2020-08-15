import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';

import { ApiRoutingService } from '../../../core/api-routing.service';
import { HttpHelperService } from '../../../core/http-helper.service';
/**
 * User Service for users CRUD operations
 */
@Injectable()
/**
 * User Service for users CRUD operations
 */
export class UserService {
  /**
   * @param {string} users_api_url
   * @param {string} password_api_url
   * @param {string} all_users_api_url
   */
  private users_api_url: string;
  private password_api_url: string;
  private all_users_api_url: string;
  /**
   * @constructor
   * @param {HttpHelperService} http
   * @param {ApiRoutingService} apiRoutingService
   */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.users_api_url = apiRoutingService.getUsersAPIUrl();
    this.password_api_url = apiRoutingService.getUpdatePasswordAPIUrl();
  }
  /**
   * Get user method
   * @param {string} _id
   * @returns {Observable<any>}
   */
  getUser(payload: any): Observable<any> {
    return this.http.get(this.users_api_url + '/' + payload.user_id, payload, true, null);
  }
  /**
   * Get profile method
   * @param {string} _id
   * @returns {Observable<any>}
   */
  getProfile(payload: any): Observable<any> {
    return this.http.get(
      this.users_api_url + '/profile/' + payload.search,
      null,
      true,
      null
    );
  }
  /**
   * Update user method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  updateUser(payload: any): Observable<any> {
    const url =
      payload && payload._id
        ? this.users_api_url + '/' + payload._id
        : this.users_api_url;
    return this.http.put(url, payload, false, true, null);
  }
  /**
   * Update user password method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  updatePassword(payload: any): Observable<any> {
    return this.http.patch(this.users_api_url + '/updatePassword', payload, false, true);
  }
  /**
   * Get users method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  getUsers(payload: any): Observable<any> {
    return this.http.get(this.users_api_url, payload, true);
  }
  /**
   * Create user method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  createUser(payload: any): Observable<any> {
    return this.http.post(this.users_api_url + '/' + 'register', payload, false, true);
  }
  verifyAccount(payload: any): Observable<any> {
    return this.http.get(
      this.users_api_url + '/verify?token=' + payload.token,
      null,
      true,
      null
    );
  }

  forgotPassword(payload: any): Observable<any> {
    return this.http.post(this.users_api_url + '/' + 'forgot', payload, false, true);
  }
}
