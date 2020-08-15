import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/AdminService/admin.service';

@Component({
  selector: 'ct-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  data: any;
  defaultColor: any;
  constructor(private _adminService: AdminService) {
    this.defaultColor = [
      {
        backgroundColor: ['rgba(34, 214, 165, 1)', 'rgba(222, 222, 227, 1)']
      }
    ];
  }

  ngOnInit() {
    this._adminService.getDashboardResult().subscribe(res => {
      this.data = res;
    });
  }
}
