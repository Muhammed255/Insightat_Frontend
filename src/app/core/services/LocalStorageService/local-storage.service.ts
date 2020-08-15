import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user';
import { LocalStorageService as DLSService } from 'ngx-webstorage';
//import { environment } from '@environments/environment';

@Injectable()
/**
 * Local Storage Service for user data manipulations
 */
export class LocalStorageService {
  /**
   * @param {User} currentUser Logined user data
   */
  private currentUser: User = {};
  /**
   * @constructor
   * @param {DLSService} localStorage Local storage handler service
   */

  constructor(private localStorage: DLSService) {
    this.currentUser._id = this.localStorage.retrieve('id');
    this.currentUser.handle = this.localStorage.retrieve('handle');
    this.currentUser.token = this.localStorage.retrieve('token');
    this.currentUser.email = this.localStorage.retrieve('email');
    this.currentUser.firstname = this.localStorage.retrieve('firstname');
    this.currentUser.lastname = this.localStorage.retrieve('lastname');
    this.currentUser.country = this.localStorage.retrieve('country');
    this.currentUser.phone = this.localStorage.retrieve('phone');
    this.currentUser.isAdmin =
      this.localStorage.retrieve('isAdmin') == 'true' ? true : false;
    this.currentUser.verified =
      this.localStorage.retrieve('verified') == 'true' ? true : false;
  }
  /**
   * Save item to the local storage method
   * @param {string} item Item name which must be saved in local storage
   * @param {string | Number} value Item value which must be saved in local storage
   */
  public setItem(item: string, value: String | Number): void {
    return this.localStorage.store(item, value);
  }
  /**
   * Get item from the local storage method
   * @param {string} item Local storage item name
   */
  public getItem(item: string): void {
    return this.localStorage.retrieve(item);
  }
  /**
   * Remove item from the local storage method
   * @param {string} item Local storage item name
   */
  public clearItem(item: string): void {
    return this.localStorage.clear(item);
  }
  /**
   * Remove all items from the local storage method
   */
  public removeAllItems(): void {
    this.localStorage.clear();
    this.currentUser = {};
  }
  /**
   * Save authentication token to the local storage method
   * @param {string} token User session token
   */
  public setAuthToken(token: string): void {
    this.setItem('token', token);
    this.currentUser.token = token;
  }
  /**
   * Get authentication token from the local storage method
   * @returns {string}
   */
  public getAuthToken(): string {
    return this.currentUser.token;
  }
  /**
   * Remove token from the local storage method
   */
  public removeAuthToken(): void {
    this.clearItem('token');
  }
  /**
   * Get user email from the local storage method
   * @returns {string}
   */
  public getUserEmail(): string {
    return this.currentUser.email;
  }
  /**
   * Get user firstname from the local storage method
   * @returns {string}
   */
  public getUserFirstName(): string {
    return this.currentUser.firstname;
  }
  /**
   * Get user lastname from the local storage method
   * @returns {string}
   */
  public getUserLastName(): string {
    return this.currentUser.lastname;
  }
  /**
   * Get user role from the local storage method
   * @returns {boolean}
   */
  public isAdmin(): boolean {
    return this.currentUser.isAdmin;
  }
  /**
   * Get user role from the local storage method
   * @returns {boolean}
   */
  public isVerified(): boolean {
    return this.currentUser.verified;
  }
  /**
   * Get user data from the local storage
   * @returns {User}
   */
  public getUserData(): User {
    return this.currentUser;
  }
  /**
   * Set user data to the local storage
   * @param {User} user User model
   */
  public setUserData(user: User): void {
    this.setItem('id', user._id);
    this.setItem('firstname', user.firstname);
    this.setItem('lastname', user.lastname);
    this.setItem('email', user.email);
    this.setItem('token', user.token);
    this.setItem('country', user.country);
    this.setItem('phone', user.phone);
    this.setItem('handle', user.handle);
    this.setItem('isAdmin', user.isAdmin == true ? 'true' : 'false');
    this.setItem('verified', user.verified == true ? 'true' : 'false');

    this.currentUser = user;
  }
  /**
   * Remove user data from the local storage
   */
  public removeUserData() {
    this.removeAllItems();
  }
}
