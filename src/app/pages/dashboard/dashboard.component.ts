import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectProjectState } from '../../shared/ngrx-store/app.states';
import {
  FetchProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
  DuplicateProject,
  FetchProjectFromID
} from '../../shared/ngrx-store/actions/project.actions';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NewProjectComponent } from '../../shared/modals/new-project/new-project.component';
import { TemplateComponent } from '../../shared/modals/template/template.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * @param {Observable<any>} getState$ State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  private newProjectDlgRef: BsModalRef;
  private templateDlgRef: BsModalRef;
  projects: any[];
  currentPro: any;
  sortBy: string;
  dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  ascParam: any;
  selected: number;

  constructor(
    private store: Store<AppState>,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.getState$ = this.store.select(selectProjectState);
    this.sortBy = 'name';
    this.ascParam = {
      name: 1,
      createdAt: 1,
      type: 1,
      respondent: 1,
      questions: 1
    };
  }

  ngOnInit() {
    this.subscription = this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      this.projects = state.projects;

      // if (state.newProject !== undefined && state.newProject !== null) {
      //   this.router.navigate(['/project/' + state.newProject._id + '/build']);
      // }
    });
    this.store.dispatch(
      new FetchProject({ sort: { [this.sortBy]: this.ascParam[this.sortBy] } })
    );
    this.selected = 0;
    this.ascParam[this.sortBy] = 0 - this.ascParam[this.sortBy];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToProject(project) {
    if (project.status == 'new') {
      this.templateDlgRef = this.modalService.show(TemplateComponent, {
        ...this.dialogConfig,
        class: 'modal-lg'
      });

      this.templateDlgRef.content.onCloseReason.subscribe(result => {
        if (result) {
          this.router.navigate(['/project/' + project._id + '/build']);
        }
      });
    } else {
      this.router.navigate(['/project/' + project._id + '/build']);
    }
  }

  openNewProjectDlg() {
    this.newProjectDlgRef = this.modalService.show(
      NewProjectComponent,
      this.dialogConfig
    );
    this.newProjectDlgRef.content.onCloseReason.subscribe(result => {
      if (result) {
        const payload = {
          name: this.newProjectDlgRef.content.projectName,
          type: 'survey',
          status: 'new',
          respondent: 0,
          questions: 0
        };
        this.store.dispatch(
          new CreateProject({
            ...payload,
            sort: { [this.sortBy]: this.ascParam[this.sortBy] }
          })
        );
        this.ascParam[this.sortBy] = 0 - this.ascParam[this.sortBy];
      }
    });
  }

  updateProjectStatus(project) {
    if (project.status == 'new' || project.status == 'closed') project.status = 'active';
    else project.status = 'closed';
    this.store.dispatch(new UpdateProject(project));
  }

  duplicateProject(project) {
    this.store.dispatch(
      new DuplicateProject({
        ...project,
        sort: { [this.sortBy]: this.ascParam[this.sortBy] }
      })
    );
    this.ascParam[this.sortBy] = 0 - this.ascParam[this.sortBy];
  }

  deleteProject(project) {
    this.store.dispatch(
      new DeleteProject({
        ...project,
        sort: { [this.sortBy]: this.ascParam[this.sortBy] }
      })
    );
    this.ascParam[this.sortBy] = 0 - this.ascParam[this.sortBy];
  }

  onChange() {
    this.selected = (this.selected + 1) % 2;
    if (this.selected == 0) {
      this.store.dispatch(
        new FetchProject({ sort: { [this.sortBy]: this.ascParam[this.sortBy] } })
      );
      this.ascParam[this.sortBy] = 0 - this.ascParam[this.sortBy];
    }
  }
}
