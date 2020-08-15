import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/UserService/user.service';
import { ProjectService } from '../../core/services/ProjectService/project.service';
import { LocalStorageService } from '../../core/services/LocalStorageService/local-storage.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ct-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any;
  newPassword: string;
  confirmPassword: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _projectService: ProjectService,
    private _notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.user = this._localStorageService.getUserData();
    this.errorMessage = null;
  }

  updateUser() {
    if (this.newPassword == this.confirmPassword && this.newPassword != null) {
      this.errorMessage = null;
      const payload = { ...this.user, password: this.newPassword };
      this._userService.updateUser(payload).subscribe(
        res => {
          this._notificationService.info(null, 'Successfully updated.');
        },
        err => {}
      );
    } else {
      this.errorMessage = 'Password does not match.';
    }
  }
}
