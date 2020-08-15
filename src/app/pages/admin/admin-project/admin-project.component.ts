import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AdminService } from '../../../core/services/AdminService/admin.service';
import { AddNewUserComponent } from '../../../shared/modals/add-new-user/add-new-user.component';
import { UserService } from '../../../core/services/UserService/user.service';

@Component({
  selector: 'ct-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.scss']
})
export class AdminProjectComponent implements OnInit {
  data: any;
  searchInput: string;
  currentPage: number;
  currentProject: any;
  dialogConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
  private addNewUserDlgRef: BsModalRef;

  constructor(
    private _adminService: AdminService,
    private _userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this._adminService.getAllProjects(null).subscribe(res => {
      this.data = res.projects;
      console.log(this.data);
    });
  }

  getPlanClass(plan) {
    if (plan == 'new') return 'admin-user__plan-new';
    if (plan == 'active') return 'admin-user__plan-active';
    if (plan == 'closed') return 'admin-user__plan-closed';
  }

  searchProject() {
    this._adminService
      .getAllProjects({ search: this.searchInput })
      .subscribe(res => {
        this.data = res.projects;
      });
  }

  deleteProject(id) {
    this._adminService.deleteProject({ id: id }).subscribe(res => {
      if (res.success) {
        this._adminService.getAllProjects(null).subscribe(res => {
          this.searchInput = '';
          this.data = res.projects;
        });
      }
    });
  }
}
