import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from '../../../shared/ngrx-store/actions/auth.actions';
import { Observable, Subscription } from 'rxjs/';
import { AppState, selectAuthState } from '../../ngrx-store/app.states';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from '../../../core/services/LocalStorageService/local-storage.service';

@Component({
  selector: 'ct-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Input() type: string;
  @Input() name: string;
  @Input() pageName: string;
  /**
   * @param {boolean} isCollapsed navigationbar status
   * @param {boolean} isAuthenticated navigationbar status
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */

  isCollapsed: boolean;
  // isAuthenticated: boolean;
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  dropdownVisible: boolean;
  projectId: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private localstorageService: LocalStorageService
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.isCollapsed = true;
    this.dropdownVisible = false;
    // this.isAuthenticated = false;
    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      // this.isAuthenticated = state.isAuthenticated;
    });

    this.route.params.subscribe(params => {
      this.projectId = params.id;
    });
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
