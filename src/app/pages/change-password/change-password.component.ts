import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/UserService/user.service';

@Component({
  selector: 'ct-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  confirmPassword: string;
  token: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) {
    this.route.params.subscribe(res => {
      if (res.token) {
        this.token = res.token;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {}

  updatePassword() {
    console.log(this.newPassword, this.confirmPassword);
    if (
      this.newPassword != '' &&
      this.confirmPassword != '' &&
      this.newPassword == this.confirmPassword
    ) {
      this._userService
        .updatePassword({ token: this.token, password: this.newPassword })
        .subscribe(
          res => {
            this.router.navigate(['/login']);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
