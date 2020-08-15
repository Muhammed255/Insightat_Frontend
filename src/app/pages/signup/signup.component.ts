import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  FormBuilder
} from '@angular/forms';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angular4-social-login';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/';

import { CreateUser } from '../../shared/ngrx-store/actions/user.actions';
import { User } from '../../shared/models/user';
import { AppState, selectAuthState } from '../../shared/ngrx-store/app.states';
import { ValidatorModule } from '../../shared/form-validator/validator.module';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  /**
   * @param {User} user User model for login param
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   * @param {FormGroup} registerForm Authorization form param
   * @param {FormControl} email User email control param
   * @param {FormControl} password User password control param
   * @param {ValidatorModule} validator Form validator module param
   */
  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscription;

  registerForm: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  country: FormControl;
  phone: FormControl;
  validator: ValidatorModule;
  errors: any;
  country_list: string[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private socialAuthService: AuthService
  ) {
    this.country_list = [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua &amp; Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia &amp; Herzegovina',
      'Botswana',
      'Brazil',
      'British Virgin Islands',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Cape Verde',
      'Cayman Islands',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Congo',
      'Cook Islands',
      'Costa Rica',
      'Cote D Ivoire',
      'Croatia',
      'Cruise Ship',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Estonia',
      'Ethiopia',
      'Falkland Islands',
      'Faroe Islands',
      'Fiji',
      'Finland',
      'France',
      'French Polynesia',
      'French West Indies',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Isle of Man',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kuwait',
      'Kyrgyz Republic',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macau',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Namibia',
      'Nepal',
      'Netherlands',
      'Netherlands Antilles',
      'New Caledonia',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palestine',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Reunion',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Pierre &amp; Miquelon',
      'Samoa',
      'San Marino',
      'Satellite',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'South Africa',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'St Kitts &amp; Nevis',
      'St Lucia',
      'St Vincent',
      'St. Lucia',
      'Sudan',
      'Suriname',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      "Timor L'Este",
      'Togo',
      'Tonga',
      'Trinidad &amp; Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks &amp; Caicos',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'Uruguay',
      'Uzbekistan',
      'Venezuela',
      'Vietnam',
      'Virgin Islands (US)',
      'Yemen',
      'Zambia',
      'Zimbabwe'
    ];
  }

  ngOnInit() {
    this.errors = {
      firstname: null,
      lastname: null,
      username: null,
      email: null,
      password: null,
      country: null
    };
    this.createFormControls();
    this.createForm();
    this.validator = new ValidatorModule();
  }
  /**
   * Create form controls method
   */
  private createFormControls() {
    this.username = new FormControl('', [Validators.required]);
    this.firstname = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [Validators.required]);
    this.country = new FormControl('', [Validators.required]);
    this.phone = new FormControl('');
  }
  /**
   * Create form method
   */
  private createForm() {
    this.registerForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
      country: this.country,
      phone: this.phone
    });
  }
  /**
   * User signup method
   */
  signup(): void {
    const payload = {
      firstname: this.user.firstname = this.firstname.value,
      lastname: this.user.lastname = this.lastname.value,
      handle: this.user.handle = this.username.value,
      email: this.user.email = this.email.value,
      password: this.user.password = this.password.value,
      country: this.user.country = this.country.value,
      phone: this.user.phone = this.phone.value
    };
    if (!this.registerForm.valid) {
      this.errors = [];
      Object.keys(this.registerForm.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.registerForm.get(key).errors;

        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            this.errors[key] = keyError;
          });
        }
      });
      this.validator.validateFormFields(this.registerForm);
    } else {
      this.store.dispatch(new CreateUser(payload));
    }
  }
  signInWithGoole(): void {
    this.socialAuthService.signOut();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
