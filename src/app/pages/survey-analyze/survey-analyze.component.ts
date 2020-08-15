import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { saveAs } from 'file-saver';
import {
  AppState,
  selectResponseState,
  selectProjectState
} from '../../shared/ngrx-store/app.states';
import {
  FetchResponsesFromID,
  RemoveResponse
} from '../../shared/ngrx-store/actions/response.actions';
import { FetchProjectFromID } from '../../shared/ngrx-store/actions/project.actions';
import { ResponseService } from '../../core/services/ResponseService/response.service';

@Component({
  selector: 'ct-survey-analyze',
  templateUrl: './survey-analyze.component.html',
  styleUrls: ['./survey-analyze.component.scss']
})
export class SurveyAnalyzeComponent implements OnInit {
  /**
   * @param {Observable<any>} getStateRes State observable param
   * @param {Observable<any>} getStatePro State observable param
   * @param {string | null} errorMessage Error message param
   * @param {Subscription} subscription Subscription param
   */
  private getStateRes: Observable<any>;
  private getStatePro: Observable<any>;
  private errorMessage: string | null;
  private subscription: Subscription;
  currentItem: string;
  responses: any = {};
  totalResponses: any = {};
  fullResponses: any = {};
  project: any = {};
  total: number = 0;
  currentPage: number;
  defaultColor: any = [];
  pieChartOptions: any;
  barChartOptions: any;
  tabInfor: string;
  toggleNum: number = -1;
  individualNum: number = 0;
  selectAll: boolean = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private _responseService: ResponseService
  ) {
    this.getStateRes = this.store.select(selectResponseState);
    this.getStatePro = this.store.select(selectProjectState);
    this.currentItem = 'results';
    this.defaultColor = [
      {
        backgroundColor: [
          'rgba(250, 114, 104, 1)',
          'rgba(63, 130, 199, 1)',
          'rgba(184, 0, 166, 1)',
          'rgba(34, 214, 165, 1)',
          'rgba(115, 115, 115, 1)'
        ]
      }
    ];
    this.barChartOptions = {
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              min: 0,
              max: 100,
              callback: function(value) {
                return value + '%';
              }
            }
          }
        ]
      },
      legend: {
        display: false
      }
    };
    this.pieChartOptions = {
      responsive: true,
      legend: {
        display: false
      }
    };
    this.tabInfor = 'diagram';
  }

  getTextFromObject(obj, index) {
    let text = '';

    if (this.tabInfor == 'table') {
      if (this.project.json[index].type == 'barrating') {
        text = "<img class='star-rating' src='assets/image/star.png' />";
      }
    }

    if (Array.isArray(obj)) {
      return obj.join(', ');
    }
    if (typeof obj == 'object') {
      Object.keys(obj).forEach(key => {
        text = text + key + ' : ' + obj[key] + '<br>';
      });
      return text;
    }
    if (obj == '-') return obj;
    if (this.tabInfor == 'table') return text + '<span>' + obj + '</span>';
    return obj;
  }

  getIndividualRText(obj, index) {
    let text = '';

    if (obj == '-')
      return '<span class="individual__response__empty">Respondent skipped this question</span>';

    if (this.project.json[index].type == 'barrating') {
      return (
        "<img class='star-rating-individual' src='assets/image/star-individual.png' /><span>" +
        obj +
        '</span>'
      );
    }

    if (Array.isArray(obj)) {
      return obj.join(', ');
    }
    if (typeof obj == 'object') {
      Object.keys(obj).forEach(key => {
        text =
          text +
          "<span class='star-rating-individual'>" +
          key +
          '</span>' +
          obj[key] +
          '<br>';
      });
      return text;
    }
    if (this.tabInfor == 'table') return text + '<span>' + obj + '</span>';
    return obj;
  }

  getObjectKeys(obj) {
    if (typeof obj == 'object') {
      return Object.keys(obj);
    }
  }

  exportResult() {
    this._responseService.ExportResults({ responses: this.fullResponses }).subscribe(
      res => {
        console.log(res);
        const fileName = new Date().toISOString().slice(0, 10) + '.csv';
        const blob = new Blob([res], { type: 'text/csv' });
        saveAs(blob, fileName);
      },
      err => {
        console.log(err);
      }
    );
  }

  removeIndividualResponse() {
    this.store.dispatch(
      new RemoveResponse({ id: this.fullResponses[this.individualNum]._id })
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new FetchResponsesFromID({ id: params.id }));
      this.store.dispatch(new FetchProjectFromID({ id: params.id }));
    });

    this.subscription = this.getStateRes.subscribe(state => {
      this.errorMessage = state.errorMessage;
      if (state.responses !== null) {
        this.responses = state.responses;
        this.totalResponses = state.totalResponses;
        this.fullResponses = state.fullResponses;
        this.total = state.total;

        if (this.fullResponses) {
          for (let i = 0; i < this.fullResponses.length; i++) {
            this.fullResponses[i].json = JSON.parse(this.fullResponses[i].json);
            this.totalResponses[i].json = JSON.parse(this.totalResponses[i].json);
          }
        }

        console.log(this.responses);
      }
    });

    this.subscription = this.getStatePro.subscribe(state => {
      this.errorMessage = state.errorMessage;
      if (state.project !== null) {
        this.project = state.project[0];
        this.project.json = JSON.parse(this.project.json).pages[0].elements;
      }
      // console.log(this.project);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
