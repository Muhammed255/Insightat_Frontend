import {
  Component,
  OnInit,
  OnDestroy,
  Renderer,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  AppState,
  selectProjectState,
  selectResponseState
} from '../../shared/ngrx-store/app.states';
import { FetchPreviewProject } from '../../shared/ngrx-store/actions/project.actions';
import { CreateResponse } from '../../shared/ngrx-store/actions/response.actions';
import { LocalStorageService } from '../../core/services/LocalStorageService/local-storage.service';

@Component({
  selector: 'ct-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.scss']
})
export class SurveyPreviewComponent implements OnInit {
  /**
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  project: any = {};
  step_num: number;
  error: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private _localstrorageService: LocalStorageService
  ) {
    this.getState$ = this.store.select(selectProjectState);
  }

  ngOnInit() {
    this.step_num = 0;
    this.error = null;
    this.route.params.subscribe(params => {
      this.store.dispatch(new FetchPreviewProject({ id: params.id }));
    });

    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      console.log(state);
      if (state.project !== null) {
        this.step_num = -1;
        this.project = state.project[0];

        if (this.project.kioskMode) {
          let elem = document.getElementsByTagName('body')[0];
          let methodToBeInvoked =
            elem.requestFullscreen ||
            elem['mozRequestFullscreen'] ||
            elem['msRequestFullscreen'];
          if (methodToBeInvoked) methodToBeInvoked.call(elem);
        }
        if (this.project.welcomeScreen) this.step_num = 0;

        if (
          this.project.respondent >= this.project.limitNumberResponse &&
          this.project.limitNumberResponse != -1
        ) {
          this.error = 'Response number reached at the limitation.';
          this.step_num = -1;
        }
        if (this.project.status == 'closed') {
          this.error = 'This project was closed.';
          this.step_num = -1;
        }
        if (
          new Date().getTime() >= new Date(this.project.limitDateTime).getTime() &&
          new Date(this.project.limitDateTime).getTime() != -1
        ) {
          this.error = 'Survey has been expired.';
          this.step_num = -1;
        }

        if (this.error == null && this.step_num == -1) this.step_num = 1;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendData(result) {
    if (this.project.thankyouScreen) this.step_num = 2;
    else this.step_num = -1;
    this.store.dispatch(
      new CreateResponse({
        project_id: this.project._id,
        json: JSON.stringify(result)
      })
    );

    this.delay(5000).then(() => {
      this.project.respondent++;
      if (this.project.kioskMode) {
        this.step_num = 0;
        if (
          this.project.respondent >= this.project.limitNumberResponse &&
          this.project.limitNumberResponse != -1
        ) {
          this.error = 'Response number reached at the limitation.';
          this.step_num = -1;
        }
        if (
          new Date().getTime() >= new Date(this.project.limitDateTime).getTime() &&
          new Date(this.project.limitDateTime).getTime() != -1
        ) {
          this.error = 'Survey time is over.';
          this.step_num = -1;
        }
      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
/**
   * question1: "lion"
​
question10: "02/13/2019"
​
question4: "ddddd"
​
question5: "eeee"
​
question6: "wwwwww"
​
question7: Array [ {…} ]
​
question8: "dddd"
​
question9: 4
   */
