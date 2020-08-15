import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './shared/guard/auth-guard.service';
import { AdminGuardService } from './shared/guard/admin-guard.service';
import { SurveyBuilderComponent } from './pages/survey-builder/survey-builder.component';
import { SurveyDesignComponent } from './pages/survey-design/survey-design.component';
import { SurveyShareComponent } from './pages/survey-share/survey-share.component';
import { SurveyPreviewComponent } from './pages/survey-preview/survey-preview.component';
import { SurveyAnalyzeComponent } from './pages/survey-analyze/survey-analyze.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { AdminProjectComponent } from './pages/admin/admin-project/admin-project.component';
import { TemplatePageComponent } from './pages/template-page/template-page.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

/**
 * Application routes
 */
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'projects/:id', component: SurveyPreviewComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'template', component: TemplatePageComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: 'verify/:token',
    component: VerifyComponent
  },
  {
    path: 'changepassword/:token',
    component: ChangePasswordComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/:id/build',
    component: SurveyBuilderComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/:id/design',
    component: SurveyDesignComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/:id/share',
    component: SurveyShareComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/:id/analyze',
    component: SurveyAnalyzeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'admin/users',
    component: AdminUserComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'admin/projects',
    component: AdminProjectComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: ':id', component: ProfileComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
/**
 * Application routing module
 */
export class AppRoutingModule {}
