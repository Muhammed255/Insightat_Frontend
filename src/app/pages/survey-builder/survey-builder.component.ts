import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState, selectProjectState } from '../../shared/ngrx-store/app.states';
import {
  FetchProjectFromID,
  UpdateProject
} from '../../shared/ngrx-store/actions/project.actions';
import { AuthenticationService } from '../../core/services/AuthenticationService/authentication.service';

@Component({
  selector: 'ct-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss']
})
export class SurveyBuilderComponent implements OnInit {
  /**
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;

  project: any = {};

  onSurveySaved(survey) {
    this.project.json = JSON.stringify(survey);
  }

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private authService: AuthenticationService) {
    this.getState$ = this.store.select(selectProjectState);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.store.dispatch(new FetchProjectFromID({ id: params.id }));
    });

    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      if (state.project !== null) {
        this.project = state.project[0];
        if (this.project.status == 'new') this.project.status = 'active';
      }
    });
  }

  ngOnDestroy() {
    if (JSON.parse(this.project.json).pages[0].elements) {
      this.project.questions = JSON.parse(this.project.json).pages[0].elements.length;
    }
    this.store.dispatch(new UpdateProject(this.project));
    this.subscription.unsubscribe();
    this.authService.showSnackBar('Project saved successfully...')
  }
}
