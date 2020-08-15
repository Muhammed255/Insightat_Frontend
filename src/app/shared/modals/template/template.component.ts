import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ct-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  /**
   * @param {Subject<string>} onCloseReason Modal close reason param
   * @param {string} projectName
   */
  public onCloseReason: Subject<boolean>;
  public projectName: string;

  /**
   * @constructor
   * @param {BsModalRef} bsModalRef Bootstrap modal reference param
   */
  constructor(public bsModalRef: BsModalRef) {}

  onStartFromScratch() {
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
