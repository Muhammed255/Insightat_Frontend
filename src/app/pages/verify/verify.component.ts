import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/UserService/user.service';

@Component({
  selector: 'ct-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      this._userService.verifyAccount({ token: parameters.token }).subscribe(
        res => {
          console.log(res);
          if (res.verified == true) {
            this.router.navigate(['/dashboard']);
          }
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
