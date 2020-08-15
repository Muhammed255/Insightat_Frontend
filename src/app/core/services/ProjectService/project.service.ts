import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../../shared/models/project';

import { ApiRoutingService } from '../../../core/api-routing.service';
import { HttpHelperService } from '../../../core/http-helper.service';
/**
 * Project Service for Projects CRUD operations
 */
@Injectable()
/**
 * Project Service for projects CRUD operations
 */
export class ProjectService {
  /**
   * @param {string} project_api_url
   * @param {string} all_Projects_api_url
   */
  private project_api_url: string;
  private all_Projects_api_url: string;
  /**
   * @constructor
   * @param {HttpHelperService} http
   * @param {ApiRoutingService} apiRoutingService
   */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.project_api_url = apiRoutingService.getProjectAPIUrl();
  }





  /**
   * Get Project method
   * @returns {Observable<any>}
   */
  getProject(payload: any): Observable<any> {
    return this.http.post(this.project_api_url + '/', payload, false, true);
  }
  /**
   * Delete Project method
   * @returns {Observable<any>}
   */
  deleteProject(payload: any): Observable<any> {
    return this.http.post(
      this.project_api_url + '/delete',
      payload,
      false,
      true
    );
  }
  /**
   * Duplicate Project method
   * @returns {Observable<any>}
   */
  duplicateProject(payload: any): Observable<any> {
    return this.http.post(
      this.project_api_url + '/duplicate',
      payload,
      false,
      true
    );
  }
  /**
   * Get Preview Project method
   * @returns {Observable<any>}
   */
  getPreviewProject(payload: any): Observable<any> {
    return this.http.post(
      this.project_api_url + '/getPreview/',
      payload,
      false,
      false
    );
  }
  /**
   * Get Project from ID method
   * @returns {Observable<any>}
   */
  getProjectFromID(payload: any): Observable<any> {
    return this.http.post(this.project_api_url + '/get/', payload, false, true);
  }
  /**
   * Create Project method
   * @returns {Observable<any>}
   */
  createProject(payload: any): Observable<any> {
    return this.http.post(
      this.project_api_url + '/' + 'create',
      payload,
      false,
      true
    );
  }
  /**
   * Update Project method
   * @returns {Observable<any>}
   */
  updateProject(payload: any): Observable<any> {
    return this.http.post(
      this.project_api_url + '/' + 'update',
      payload,
      false,
      true
    );
  }
  /**
   * Download QRCode Image method
   * @returns {Observable<any>}
   */
  getQRCodeImage(payload: any): Observable<any> {
    return this.http.get(this.project_api_url + '/qrcode', payload, true, null);
  }
  /**
   *
   * @param file
   */
  uploadImage(file) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(
      this.apiRoutingService.getUploadImageAPIUrl(),
      fd,
      false,
      false,
      null
    );
  }
}
