import { Injectable } from '@angular/core';
//import { environment } from 'environments/environment';

@Injectable()
/**
 * Api Routing Service for get api urls
 */
export class ApiRoutingService {
  /**
   * @param {string} environment.BASE_API_URL
   *
   */
  private baseUrl = "https://proinsightat.herokuapp.com/api/"


  constructor() {}
  /**
   * Get sign up api url method
   * @returns {string}
   */
  getSignUpnAPIUrl(): string {
    return this.baseUrl + 'users/register';
  }
  /**
   * Get upload image api url method
   * @returns {string}
   */
  getUploadImageAPIUrl(): string {
    return this.baseUrl + 'upload';
  }
  /**
   * Get login api url method
   * @returns {string}
   */
  getLoginAPIUrl(): string {
    return this.baseUrl + 'users/login';
  }
  /**
   * Get project api url method
   * @returns {string}
   */
  getProjectAPIUrl(): string {
    return this.baseUrl + 'projects';
  }
  /**
   * Get response api url method
   * @returns {string}
   */
  getResponseAPIUrl(): string {
    return this.baseUrl + 'responses';
  }
  /**
   * Get role api url method
   * @returns {string}
   */
  getRoleAPIUrl(): string {
    return this.baseUrl + 'roles';
  }
  /**
   * Get users api url method
   * @returns {string}
   */
  getUsersAPIUrl(): string {
    return this.baseUrl + 'users';
  }
  /**
   * Get update user api url method
   * @returns {string}
   */
  getUpdatePasswordAPIUrl(): string {
    return this.baseUrl + 'users/password';
  }
  /**
   * Get admin api url method
   * @returns {string}
   */
  getAdminAPIUrl(): string {
    return this.baseUrl + 'admins';
  }
}
