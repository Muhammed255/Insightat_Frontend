import {
  Component,
  OnInit,
  OnDestroy,
  Renderer,
  ViewChild,
  ElementRef
} from '@angular/core';
import { UserService } from '../../core/services/UserService/user.service';
import { ProjectService } from '../../core/services/ProjectService/project.service';
import { LocalStorageService } from '../../core/services/LocalStorageService/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../../shared/ngrx-store/app.states';
import { LogOut } from '../../shared/ngrx-store/actions/auth.actions';

@Component({
  selector: 'ct-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('backInput') backInput: ElementRef;

  profileLogo: boolean;
  profileEdit: boolean;
  user: any = {
    accountImg: null
  };
  isMine: boolean;
  project: any;
  searchCompany: string;

  constructor(
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private _userService: UserService,
    private _projectService: ProjectService,
    private _localStorageService: LocalStorageService,
    private _notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.profileLogo = false;
    this.profileEdit = false;
    this.isMine = false;

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isMine = false;
        this._userService.getProfile({ search: params['id'] }).subscribe(res => {
          console.log(res);
          if (res.profile.length > 0) this.user = res.profile[0];
          else this.user = null;

          if (this.user) {
            this._projectService
              .getProjectFromID({ id: this.user.project_id })
              .subscribe(res => {
                this.project = res.project[0];
              });
          }
        });
      } else {
        this._userService
          .getUser({
            user_id: this._localStorageService.getItem('id')
          })
          .subscribe(res => {
            this.isMine = true;
            this.user = res.result;
            console.log(this.user);
            this._projectService
              .getProjectFromID({ id: this.user.project_id })
              .subscribe(res => {
                this.project = res.project[0];
              });
          });
      }
    });
  }

  valueChange(event) {
    if (event.target.files[0]) {
      this._projectService.uploadImage(event.target.files[0]).subscribe(res => {
        if (!res.error) {
          this._notificationService.success(null, 'Account image is uploaded.');
          this.user.accountImg = res.imageUrl;
        }
      });
    }
  }

  backChange(event) {
    if (event.target.files[0]) {
      this._projectService.uploadImage(event.target.files[0]).subscribe(res => {
        if (!res.error) {
          this.user.backImg = res.imageUrl;
          this._notificationService.success(null, 'Background image is uploaded.');
        }
      });
    }
  }

  onUploadFile() {
    const event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [
      event
    ]);
  }

  onUploadBack() {
    const event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(this.backInput.nativeElement, 'dispatchEvent', [
      event
    ]);
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }

  saveProfile() {
    this.profileEdit = false;
    this._userService.updateUser(this.user).subscribe(res => {});
  }

  navigateTo(url) {
    window.open(url, '_blank');
  }

  searchProfiles() {
    this.router.navigate([this.searchCompany]);
  }
}
