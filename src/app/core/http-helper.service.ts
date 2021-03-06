import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
  Headers,
  Response,
  URLSearchParams
} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from './services/LocalStorageService/local-storage.service';
import { ErrorResponse } from '../shared/models/const-variables';

@Injectable()
export class HttpHelperService {
  public serverError = false;

  constructor(
    private router: Router,
    private http: Http,
    private localStorage: LocalStorageService
  ) {}

  private checkAuthHeader(response: Response) {
    let res;
    const authorizationHeader =
      response.headers.toJSON()['Authorization'] ||
      response.headers.toJSON()['authorization'];
    const contentTypeHeader =
      response.headers.toJSON()['Content-Type'] ||
      response.headers.toJSON()['content-type'];

    if (authorizationHeader) {
      this.localStorage.setAuthToken(authorizationHeader[0]);
    }
    try {
      if (contentTypeHeader[0].includes('text/csv')) {
        res = response['_body'];
      } else {
        res = response.json();
      }
    } catch (e) {
      res = {};
    }
    return res;
  }

  /***
   * generate request options
   * @param isUrlEncoded
   * @param requiredAuth
   * @param customHeader
   * @param customParam
   * @returns {RequestOptions}
   */
  private generateReqOptions(
    isUrlEncoded = false,
    requiredAuth = false,
    customHeader?: Headers,
    customParam?: Object,
    isMultipart = false
  ): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const search = new URLSearchParams();

    if (isUrlEncoded) {
      headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    }

    if (isMultipart) {
      headers = new Headers();
    }

    if (requiredAuth) {
      const token = this.localStorage.getAuthToken();
      headers.append('Authorization', `${token}`);
    }

    if (customHeader) {
      customHeader.forEach((value, key) => {
        headers.append(key, value[0]);
      });
    }

    if (customParam) {
      // tslint:disable-next-line:forin
      for (const key in customParam) {
        search.set(key, customParam[key]);
      }
    }

    this.serverError = false;

    return new RequestOptions({ headers, withCredentials: false, search });
  }

  /***
   * http get helper
   * @param url
   * @param query
   * @param requiredAuth
   * @param headers
   * @returns {Observable<Response>}
   */
  get(
    url: string,
    query: Object,
    requiredAuth = false,
    headers?: Headers
  ): Observable<any> {
    return this.http
      .get(url, this.generateReqOptions(false, requiredAuth, headers, query))
      .pipe(
        map((response: Response) => {
          return this.checkAuthHeader(response);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  /***
   * http post helper
   * @param url
   * @param body
   * @param isUrlEncoded
   * @param requiredAuth
   * @param headers
   * @returns {Observable<R|T>}
   */
  post(
    url: string,
    body: any,
    isUrlEncoded = false,
    requiredAuth = false,
    headers?: Headers
  ): Observable<any> {
    if (isUrlEncoded) {
      const urlSearchParams = new URLSearchParams();
      Object.keys(body).forEach(key => {
        urlSearchParams.append(key, body[key]);
      });
      body = urlSearchParams.toString();
    }
    let requestOptions = this.generateReqOptions(
      isUrlEncoded,
      requiredAuth,
      headers
    );
    if (body instanceof FormData) {
      requestOptions = this.generateReqOptions(
        isUrlEncoded,
        requiredAuth,
        headers,
        null,
        true
      );
    }
    return this.http.post(url, body, requestOptions).pipe(
      map((response: Response) => {
        return this.checkAuthHeader(response);
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  /***
   * http patch helper
   * @param url
   * @param body
   * @param isUrlEncoded
   * @param requiredAuth
   * @param headers
   * @returns {Observable<R|T>}
   */
  patch(
    url: string,
    body: any,
    isUrlEncoded = false,
    requiredAuth = false,
    headers?: Headers
  ): Observable<any> {
    if (isUrlEncoded) {
      const urlSearchParams = new URLSearchParams();
      Object.keys(body).forEach(key => {
        urlSearchParams.append(key, body[key]);
      });
      body = urlSearchParams.toString();
    }
    return this.http
      .patch(
        url,
        body,
        this.generateReqOptions(isUrlEncoded, requiredAuth, headers)
      )
      .pipe(
        map((response: Response) => {
          return this.checkAuthHeader(response);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  /***
   * http put helper
   * @param url
   * @param body
   * @param isUrlEncoded
   * @param requiredAuth
   * @param headers
   * @returns {Observable<R|T>}
   */
  put(
    url: string,
    body: any,
    isUrlEncoded = false,
    requiredAuth = false,
    headers?: Headers
  ): Observable<any> {
    if (isUrlEncoded) {
      const urlSearchParams = new URLSearchParams();
      Object.keys(body).forEach(key => {
        urlSearchParams.append(key, body[key]);
      });
      body = urlSearchParams.toString();
    }
    return this.http
      .put(
        url,
        body,
        this.generateReqOptions(isUrlEncoded, requiredAuth, headers)
      )
      .pipe(
        map((response: Response) => {
          return this.checkAuthHeader(response);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  /***
   * http delete helper
   * @param url
   * @param query
   * @param requiredAuth
   * @param headers
   * @returns {Observable<Response>}
   */
  delete(
    url: string,
    query: Object,
    requiredAuth = false,
    headers?: Headers
  ): Observable<any> {
    return this.http
      .delete(url, this.generateReqOptions(false, requiredAuth, headers, query))
      .pipe(
        map((response: Response) => {
          return this.checkAuthHeader(response);
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  /***
   * http exception handler
   * @param error
   * @returns {any}
   */
  private handleError(error: Response | any) {
    let skipThrowingError = false;
    if (error.status === 500) {
      const body = error.json() || '';
      if (body.exception && body.exception === ErrorResponse.TOKEN_EXPIRE) {
        this.router.navigate(['login']);
      } else {
        this.serverError = true;
        skipThrowingError = true;
      }
    } else if (error.status === 504) {
      this.serverError = true;
      skipThrowingError = true;
    }

    if (skipThrowingError) {
      return;
    }

    return Observable.throw(error);
  }
}
