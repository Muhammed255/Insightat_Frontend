import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';

import { ApiRoutingService } from '../../../core/api-routing.service';
import { HttpHelperService } from '../../../core/http-helper.service';

@Injectable()
/**
 * User Service for users CRUD operations
 */
export class AdminService {
  /**
   * @param {string} users_api_url
   */
  private admin_api_url: string;
  /**
   * @constructor
   * @param {HttpHelperService} http
   * @param {ApiRoutingService} apiRoutingService
   */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.admin_api_url = apiRoutingService.getAdminAPIUrl();
  }
  /**
   * Get dashboard params method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  getDashboardResult(): Observable<any> {
    return this.http.get(
      this.admin_api_url + '/' + 'dashboard',
      null,
      true,
      null
    );
  }

  /**
   * Get all users method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  getAllUsers(any): Observable<any> {
    return this.http.get(this.admin_api_url + '/' + 'users', any, true, null);
  }

  /**
   * Get all projects method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  getAllProjects(any): Observable<any> {
    return this.http.get(
      this.admin_api_url + '/' + 'projects',
      any,
      true,
      null
    );
  }

  /**
   * Get Individual users method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  getIndividualUser(payload): Observable<any> {
    return this.http.get(
      this.admin_api_url + '/' + 'user/' + payload.id,
      null,
      true,
      null
    );
  }

  /**
   * delete Individual user method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  deleteUser(payload): Observable<any> {
    return this.http.post(
      this.admin_api_url + '/' + 'user/',
      payload,
      false,
      true
    );
  }

  /**
   * delete Individual project method
   * @param {string} role_id
   * @returns {Observable<any>}
   */
  deleteProject(payload): Observable<any> {
    return this.http.post(
      this.admin_api_url + '/' + 'project/',
      payload,
      false,
      true
    );
  }
}
