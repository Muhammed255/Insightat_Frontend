import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AdminService } from '../../../core/services/AdminService/admin.service';
import { AddNewUserComponent } from '../../../shared/modals/add-new-user/add-new-user.component';
import { UserService } from '../../../core/services/UserService/user.service';

@Component({
  selector: 'ct-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  data: any;
  searchInput: string;
  currentPage: number;
  currentUser: any;
  dashboardVisible: boolean;
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
    this.dashboardVisible = true;
    this._adminService.getAllUsers(null).subscribe(res => {
      this.data = res.users;
    });
  }

  getPlanText(plan) {
    if (plan == 0) return 'Standard';
    if (plan == 1) return 'Advantage';
    if (plan == 2) return 'Premier';
  }

  getPlanClass(plan) {
    if (plan == 0) return 'admin-user__plan-standard';
    if (plan == 1) return 'admin-user__plan-advantage';
    if (plan == 2) return 'admin-user__plan-premier';
  }

  searchUser() {
    this._adminService.getAllUsers({ search: this.searchInput }).subscribe(res => {
      this.data = res.users;
    });
  }

  openNewProjectDlg() {
    this.addNewUserDlgRef = this.modalService.show(
      AddNewUserComponent,
      this.dialogConfig
    );
    this.addNewUserDlgRef.content.onCloseReason.subscribe(result => {
      if (result) {
        const payload = {
          name: this.addNewUserDlgRef.content.username,
          email: this.addNewUserDlgRef.content.email,
          firstName: this.addNewUserDlgRef.content.firstName,
          lastName: this.addNewUserDlgRef.content.lastName,
          website: this.addNewUserDlgRef.content.website,
          password: this.addNewUserDlgRef.content.password
        };
        this._userService.createUser(payload).subscribe(res => {
          if (res.success) {
            this._adminService.getAllUsers(null).subscribe(res => {
              this.data = res.users;
            });
          }
        });
      }
    });
  }

  showIndividualUser(user) {
    this.dashboardVisible = false;
    this._adminService.getIndividualUser({ id: user._id }).subscribe(res => {
      this.currentUser = res;
      this.currentUser._id = user._id;
      console.log(res);
    });
  }

  deleteUser(id) {
    this.dashboardVisible = true;
    this._adminService.deleteUser({ id: id }).subscribe(res => {
      if (res.success) {
        this._adminService.getAllUsers(null).subscribe(res => {
          this.data = res.users;
          this.searchInput = '';
        });
      }
    });
  }
}
