import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRoutingService } from '../../../core/api-routing.service';
import { HttpHelperService } from '../../../core/http-helper.service';

@Injectable()
/**
 * Response Service for responses CRUD operations
 */
export class ResponseService {
  /**
   * @param {string} response_api_url
   */
  private response_api_url: string;
  /**
   * @constructor
   * @param {HttpHelperService} http
   * @param {ApiRoutingService} apiRoutingService
   */
  constructor(
    private http: HttpHelperService,
    private apiRoutingService: ApiRoutingService
  ) {
    this.response_api_url = apiRoutingService.getResponseAPIUrl();
  }
  /**
   * Create Response method
   * @returns {Observable<any>}
   */
  CreateResponse(payload: any): Observable<any> {
    return this.http.post(this.response_api_url + '/create', payload, false, false);
  }
  /**
   * Remove Response method
   * @returns {Observable<any>}
   */
  RemoveResponse(payload: any): Observable<any> {
    return this.http.post(this.response_api_url + '/remove', payload, false, true);
  }
  /**
   * Remove Response method
   * @returns {Observable<any>}
   */
  ExportResults(payload: any): Observable<any> {
    return this.http.post(this.response_api_url + '/download', payload, false, true);
  }
  /**
   * Fetch Responses From ID method
   * @returns {Observable<any>}
   */
  FetchResponses(payload: any): Observable<any> {
    return this.http.get(this.response_api_url + '/', payload, true, null);
  }
}
