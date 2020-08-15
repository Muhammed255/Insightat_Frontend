import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angular4-social-login';
import { Observable, Subscription, VirtualTimeScheduler } from 'rxjs/';
import { Store } from '@ngrx/store';
import { LogIn } from '../../shared/ngrx-store/actions/auth.actions';
import { User } from '../../shared/models/user';
import { AppState, selectAuthState } from '../../shared/ngrx-store/app.states';
import { ValidatorModule } from '../../shared/form-validator/validator.module';
import { NewProjectComponent } from '../../shared/modals/new-project/new-project.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../../shared/modals/forgot-password/forgot-password.component';
import { UserService } from '../../core/services/UserService/user.service';
import { DialogConfirmComponent } from '../../shared/components/dialog-confirm/dialog-confirm.component';
import { AuthenticationService } from '../../core/services/AuthenticationService/authentication.service';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Login component
 * @implements {OnInit}
 */
export class LoginComponent implements OnInit, OnDestroy {
  /**
   * @param {User} user User model for login param
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   * @param {FormGroup} authForm Authorization form param
   * @param {ValidatorModule} validator Form validator module param
   */
  private forgotPwdDlgRef: BsModalRef;
  socialUser: SocialUser;
  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;
  authForm: FormGroup;


  isBusy:boolean = false;

  color= 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  validator: ValidatorModule;
  dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  email;
  password
  rememberMe: boolean;

  @ViewChild('loginForm') loginForm : NgForm;

  private screenDlgRef: BsModalRef;

  /**
   * @constructor
   * @param {Store<AppState>} store App state store service
   */
  constructor(
    private store: Store<AppState>,
    private socialAuthService: AuthService,
    private modalService: BsModalService,
    private router: Router,
    private _userService: UserService,
    private _authService: AuthenticationService
  ) {
    this.getState$ = this.store.select(selectAuthState);
  }
  /**
   * Initialize login component life cycle method
   */
  ngOnInit() {
    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
    this.socialAuthService.authState.subscribe(res => {
      console.log(res);
    });

    // this.createFormControls();
    // this.createForm();
    this.rememberMe = true;
   // this.validator = new ValidatorModule();
  }
  /**
   * Create form controls method
   */
  // private createFormControls() {
  //   this.email = new FormControl(localStorage.getItem('insightat_email'), [
  //     Validators.required,
  //     Validators.pattern('[^ @]*@[^ @]*')
  //   ]);
  //   this.password = new FormControl(localStorage.getItem('insightat_password'), [
  //     Validators.required
  //   ]);
  // }
  /**
   * Create form method
   */
  // private createForm() {
  //   this.authForm = new FormGroup({
  //     email: this.email,
  //     password: this.password
  //   });
  // }
  /**
   * User login method
   */
  login(): void {

    this.isBusy = true

    console.log(this.rememberMe);
    if (this.rememberMe) {
      localStorage.setItem('insightat_email', this.email);
      localStorage.setItem('insightat_password', this.password);
    } else {
      localStorage.setItem('insightat_email', '');
      localStorage.setItem('insightat_password', '');
    }

    const payload = {
      email: this.user.email = this.email,
      password: this.user.password = this.password
    };
    if (!this.email || !this.password) {
      let message = 'Email address and password are required';
      let icon = 'warning';
      let title = 'Error';
      this._authService.openValidationDialog(icon, title, message);
      this.isBusy = false
      return;;
    } else {
      this.store.dispatch(new LogIn(payload))
    }
  }

  ngOnDestroy(){
    this.isBusy = false;
  }

  alert() {
    this.screenDlgRef = this.modalService.show(DialogConfirmComponent, this.dialogConfig);
  }

  signInWithGoole(): void {
    this.socialAuthService.signOut();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }



  forgotPassword(): void {
    this.forgotPwdDlgRef = this.modalService.show(
      ForgotPasswordComponent,
      this.dialogConfig
    );

    this.forgotPwdDlgRef.content.onCloseReason.subscribe(result => {
      if (result) {
        console.log(this.forgotPwdDlgRef.content.email);
        this._userService
          .forgotPassword({ email: this.forgotPwdDlgRef.content.email })
          .subscribe(res => {
            console.log(res);
          });
      }
    });
  }


}
