import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SimpleNotificationsModule } from "angular2-notifications";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { BsModalService } from "ngx-bootstrap/modal";
import { LocalStorageService as DLSService } from "ngx-webstorage";
import { LocalStorageService } from "./core/services/LocalStorageService/local-storage.service";
import { ModalModule } from "ngx-bootstrap";
import { NgxPermissionsModule, NgxPermissionsService } from "ngx-permissions";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgSelectModule } from "@ng-select/ng-select";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ColorPickerModule } from "ngx-color-picker";
import { ClipboardModule } from "ngx-clipboard";
import { QRCodeModule } from "angularx-qrcode";
import { ChartsModule } from "ng2-charts";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { SideBarComponent } from "./shared/components/sidebar/sidebar.component";
import { NavigationBarComponent } from "./shared/components/navigation-bar/navigation-bar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

import { reducers, metaReducers } from "./shared/ngrx-store/app.states";
import { AuthEffects } from "./shared/ngrx-store/effects/auth.effects";
import { UserEffects } from "./shared/ngrx-store/effects/user.effects";
import { ProjectEffects } from "./shared/ngrx-store/effects/project.effects";
import { ResponseEffects } from "./shared/ngrx-store/effects/response.effects";


import { UserService } from "./core/services/UserService/user.service";
import { ProjectService } from "./core/services/ProjectService/project.service";
import { AdminService } from "./core/services/AdminService/admin.service";
import { AuthenticationService } from "./core/services/AuthenticationService/authentication.service";
import { AuthGuardService } from "./shared/guard/auth-guard.service";
import { AdminGuardService } from "./shared/guard/admin-guard.service";
import { RoleService } from "./core/services/UserRoleService/role.service";
import { ApiRoutingService } from "./core/api-routing.service";
import { HttpHelperService } from "./core/http-helper.service";
import { MyCurrencyPipe } from "./shared/pipe/MyCurrency/my-currency.pipe";
import { MyCurrencyFormatterDirective } from "./shared/directive/MyCurrencyFormatter/my-currency-formatter.directive";
import { CalcInputFormatterDirective } from "./shared/directive/CalcInputFormatter/calc-input-formatter.directive";
import { DialogConfirmComponent } from "./shared/components/dialog-confirm/dialog-confirm.component";
import { UtilsService } from "./shared/utils.service";
import { HomeComponent } from "./pages/home/home.component";

import { ValidationMessageDialogComponent } from "./shared/components/validation-message-dialog/validation-message-dialog.component";

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angular4-social-login";
import { SignupComponent } from "./pages/signup/signup.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NewProjectComponent } from "./shared/modals/new-project/new-project.component";
import { SurveyBuilderComponent } from "./pages/survey-builder/survey-builder.component";
import { SurveyEditorComponent } from "./shared/components/survey-editor/survey-editor.component";
import { SurveyComponent } from "./shared/components/survey/survey.component";
import { SurveyDesignComponent } from "./pages/survey-design/survey-design.component";
import { SurveyShareComponent } from "./pages/survey-share/survey-share.component";
import { SurveyPreviewComponent } from "./pages/survey-preview/survey-preview.component";
import { SurveyAnalyzeComponent } from "./pages/survey-analyze/survey-analyze.component";
import { ResponseService } from "./core/services/ResponseService/response.service";
import { HowItWorksComponent } from "./pages/how-it-works/how-it-works.component";
import { SolutionsComponent } from "./pages/solutions/solutions.component";
import { PricingComponent } from "./pages/pricing/pricing.component";
import { HelpComponent } from "./pages/help/help.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { TermsConditionsComponent } from "./pages/terms-conditions/terms-conditions.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { FaqComponent } from "./pages/faq/faq.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { AdminUserComponent } from "./pages/admin/admin-user/admin-user.component";
import { AddNewUserComponent } from "./shared/modals/add-new-user/add-new-user.component";
import { AdminProjectComponent } from "./pages/admin/admin-project/admin-project.component";
import { TemplateComponent } from "./shared/modals/template/template.component";
import { TemplatePageComponent } from "./pages/template-page/template-page.component";
import { AccountComponent } from "./pages/account/account.component";
import { WelcomeScreenComponent } from "./shared/modals/welcome-screen/welcome-screen.component";
import { VerifyComponent } from "./pages/verify/verify.component";
import { ForgotPasswordComponent } from "./shared/modals/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";



import {MaterialModule} from './material.module'


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "1050810352738-k8qa2jatahaua9i657ur03qursfvto8c.apps.googleusercontent.com"
    ),
  },
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    SideBarComponent,
    MyCurrencyPipe,
    MyCurrencyFormatterDirective,
    CalcInputFormatterDirective,
    DialogConfirmComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    DashboardComponent,
    NewProjectComponent,
    AddNewUserComponent,
    SurveyBuilderComponent,
    SurveyEditorComponent,
    SurveyDesignComponent,
    SurveyComponent,
    SurveyShareComponent,
    SurveyPreviewComponent,
    SurveyAnalyzeComponent,
    HowItWorksComponent,
    SolutionsComponent,
    PricingComponent,
    HelpComponent,
    ContactUsComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    FaqComponent,
    AdminDashboardComponent,
    ProfileComponent,
    AdminUserComponent,
    AddNewUserComponent,
    AdminProjectComponent,
    TemplateComponent,
    TemplatePageComponent,
    AccountComponent,
    WelcomeScreenComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ValidationMessageDialogComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    NgSelectModule,
    HttpModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      ProjectEffects,
      ResponseEffects,

    ]),
    SimpleNotificationsModule.forRoot(),
    CurrencyMaskModule,
    SocialLoginModule.initialize(config),
    ColorPickerModule,
    QRCodeModule,
    ClipboardModule,
    ChartsModule,
    NgxPaginationModule,
    MaterialModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    AdminGuardService,
    ApiRoutingService,
    RoleService,
    DLSService,
    HttpHelperService,
    LocalStorageService,
    UserService,
    ProjectService,
    AdminService,
    ResponseService,
    JwtHelperService,
    NgxPermissionsService,
    BsModalService,
    UtilsService,
  ],
  entryComponents: [
    WelcomeScreenComponent,
    NewProjectComponent,
    AddNewUserComponent,
    TemplateComponent,
    ForgotPasswordComponent,
    ValidationMessageDialogComponent,
  ],
  bootstrap: [AppComponent],
})
/**
 * Application root module
 */
export class AppModule {}
