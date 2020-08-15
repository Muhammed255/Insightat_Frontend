import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { AppState, selectProjectState } from '../../shared/ngrx-store/app.states';
import {
  GetQRCodeImage,
  UpdateProject,
  FetchProjectFromID
} from '../../shared/ngrx-store/actions/project.actions';
//import { environment } from 'environments/environment';
import { LocalStorageService } from '../../core/services/LocalStorageService/local-storage.service';
import { UserService } from '../../core/services/UserService/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ct-survey-share',
  templateUrl: './survey-share.component.html',
  styleUrls: ['./survey-share.component.scss']
})
export class SurveyShareComponent {
  /**
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  project: any = {};
  url: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private _clipboardService: ClipboardService,
    private _localstrageService: LocalStorageService,
    private _userService: UserService,
    private _notificationService: NotificationsService
  ) {
    this.getState$ = this.store.select(selectProjectState);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new FetchProjectFromID({ id: params.id }));
    });

    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      if (state.project !== null) {
        this.project = state.project[0];
        this.url = "https://proinsightat.herokuapp.com/api/" + 'projects/' + this.project._id;
      }
    });
  }

  ngOnDestroy() {
    this.project.status = 'active';
    this.store.dispatch(new UpdateProject(this.project));
    this.subscription.unsubscribe();
  }

  getQRCodeImage() {
    this.url = "https://proinsightat.herokuapp.com/api/" + 'projects/' + this.project._id;
    this.store.dispatch(
      new GetQRCodeImage({
        text: this.url
      })
    );
    window.location.href =
    "https://proinsightat.herokuapp.com/api/" + 'projects/qrcode?text=' + this.url;
  }

  copyUrl() {
    this._notificationService.info(null, 'The link has been copied to your clipboard');
    this._clipboardService.copyFromContent(this.url);
  }

  navigateToPreview() {
    window.location.replace(this.url);
  }

  addToProfilePage() {
    this._userService
      .updateUser({
        _id: this._localstrageService.getItem('id'),
        project_id: this.project._id
      })
      .subscribe(res => {
        if (res.success) {
          this.router.navigateByUrl('/profile');
        }
      });
  }
}
