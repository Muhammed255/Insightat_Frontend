import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Observable, Subscription } from 'rxjs/';
import { AppState, selectProjectState } from '../../ngrx-store/app.states';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/ProjectService/project.service';
import {
  UpdateProject,
  FetchProjectFromID
} from '../../../shared/ngrx-store/actions/project.actions';
import { WelcomeScreenComponent } from '../../../shared/modals/welcome-screen/welcome-screen.component';

@Component({
  selector: 'ct-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private getState$: Observable<any>;
  private errorMessage: string | null;
  private screenDlgRef: BsModalRef;
  dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  public activeMenu: string;
  public project: any;

  @Input() menuType: string;
  @Input() menuName: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private _projectService: ProjectService
  ) {
    this.activeMenu = 'build';
    this.getState$ = this.store.select(selectProjectState);
  }

  ngOnInit() {
    if (this.menuType == 'admin') {
      this.activeMenu = this.menuName || 'admin-overview';
    }

    this.subscription = this.getState$.subscribe(state => {
      if (state.project !== null) {
        this.project = {
          ...state.project[0],
          closed: state.project[0].status == 'closed',
          flag_limit_number: state.project[0].limitNumberResponse != -1,
          flag_limit_date_time:
            new Date(state.project[0].limitDateTime).getTime() != -1
        };
      }
    });
    this.subscription = this.route.params.subscribe(params => {
      if (params.id !== undefined && params.id !== null) {
        this.store.dispatch(new FetchProjectFromID({ id: params.id }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  activateMenu(menu) {
    this.activeMenu = menu;
    this.updateProject();
  }

  updateProject() {
    let pro = { ...this.project };
    if (pro.closed) pro.status = 'closed';
    else pro.status = 'active';
    pro.limitDateTime = new Date(pro.limitDateTime).getTime();
    delete pro.closed;
    delete pro.flag_limit_number;
    delete pro.flag_limit_date_time;

    this.store.dispatch(new UpdateProject(pro));
  }

  dataChanged(event) {
    this.updateProject();
  }

  flagLimitNumberChanged(event) {
    if (!event) {
      this.project.limitNumberResponse = -1;
      this.updateProject();
    }
  }

  flagLimitDateTimeChanged(event) {
    if (!event) {
      this.project.limitDateTime = -1;
      this.updateProject();
    }
  }

  limitDateTimeChanged(event) {
    if (!event) this.project.limitDateTime = -1;
    this.updateProject();
  }

  limitNumberResponseChanged(event) {
    if (!event) {
      this.project.limitNumberResponse = -1;
    }
    this.updateProject();
  }

  welcomeScreenChanged(event) {
    if (event) {
      this.screenDlgRef = this.modalService.show(
        WelcomeScreenComponent,
        this.dialogConfig
      );
      this.screenDlgRef.content.dialogTitle = 'Welcome Screen Dialog';
      this.screenDlgRef.content.screenTitle = this.project.welcomeScreenText;
      this.screenDlgRef.content.titleDescription = this.project.welcomeScreenDescription;
      this.screenDlgRef.content.onCloseReason.subscribe(result => {
        if(!result || !this.screenDlgRef.content){
          this.project.welcomeScreen = false;
        }
        if (result) {
          this.project.welcomeScreenText = this.screenDlgRef.content.screenTitle;
          this.project.welcomeScreenDescription = this.screenDlgRef.content.titleDescription;
        }
        this.updateProject();
      });
    }
    this.updateProject();
  }

  thankyouScreenChanged(event) {
    if (event) {
      this.screenDlgRef = this.modalService.show(
        WelcomeScreenComponent,
        this.dialogConfig
      );
      this.screenDlgRef.content.dialogTitle = 'Thank You Screen Dialog';
      this.screenDlgRef.content.screenTitle = this.project.thankyouScreenText;
      this.screenDlgRef.content.titleDescription = this.project.thankyouScreenDescription;

      this.screenDlgRef.content.onCloseReason.subscribe(result => {
        if(!result || !this.screenDlgRef.content){
          this.project.thankyouScreen = false
        }
        if (result) {
          this.project.thankyouScreenText = this.screenDlgRef.content.screenTitle;
          this.project.thankyouScreenDescription = this.screenDlgRef.content.titleDescription;
        }
        this.updateProject();
      });
    }
    this.updateProject();
  }
}
