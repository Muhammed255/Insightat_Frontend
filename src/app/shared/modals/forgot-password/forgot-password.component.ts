import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ct-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  /**
   * @param {Subject<string>} onCloseReason Modal close reason param
   * @param {string} projectName
   */
  public onCloseReason: Subject<boolean>;
  public email: string;

  /**
   * @constructor
   * @param {BsModalRef} bsModalRef Bootstrap modal reference param
   */
  constructor(public bsModalRef: BsModalRef) {}

  onNext() {
    this.onCloseReason.next(true);
    this.bsModalRef.hide();
  }

  onClose() {
    this.onCloseReason.next(false);
    this.bsModalRef.hide();
  }

  ngOnInit() {
    this.onCloseReason = new Subject();
  }

  ngOnDestroy() {
    this.onCloseReason.next(false);
  }
}
