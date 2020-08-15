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
import { NotificationsService } from 'angular2-notifications';
import { AppState, selectProjectState } from '../../shared/ngrx-store/app.states';
import {
  FetchProjectFromID,
  UpdateProject
} from '../../shared/ngrx-store/actions/project.actions';
import { ProjectService } from '../../core/services/ProjectService/project.service';

@Component({
  selector: 'ct-survey-design',
  templateUrl: './survey-design.component.html',
  styleUrls: ['./survey-design.component.scss']
})
export class SurveyDesignComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  /**
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  project: any = {};

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private _projectService: ProjectService,
    private _notificationService: NotificationsService
  ) {
    this.getState$ = this.store.select(selectProjectState);
  }

  valueChange(event) {
    if (event.target.files[0]) {
      this._projectService.uploadImage(event.target.files[0]).subscribe(res => {
        if (!res.error) {
          this.project.logoImgUrl = res.imageUrl;
          this._notificationService.success(null, 'Logo image is uploaded.');
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new FetchProjectFromID({ id: params.id }));
    });

    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      if (state.project !== null) this.project = state.project[0];
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new UpdateProject(this.project));
  }
}
