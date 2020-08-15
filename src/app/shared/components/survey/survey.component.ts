import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChange
} from '@angular/core';
import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';

// import 'inputmask/dist/inputmask/phone-codes/phone.js';

widgets.jquerybarrating(Survey);
// widgets.jqueryuidatepicker(Survey);

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'survey',
  template: `
    <div class="survey-container contentcontainer codecontainer" style="width: 90%;" >
      <div id="surveyEle"></div>
    </div>
  `
})
export class SurveyComponent implements OnInit, OnChanges {
  @Output() submitSurvey = new EventEmitter<any>();

  @Input() json: object;
  @Input() mainColor: string;
  @Input() mainTextColor: string;
  @Input() questionColor: string;
  @Input() answerColor: string;
  @Input() pageColor: string;
  @Input() progressBar: boolean;

  click(result) {
    console.log(result);
  }

  ngOnInit() {
    this.showSurvey();
  }

  ngOnChanges(changes) {
    const surveyModel = new Survey.Model(this.json);
    var defaultThemeColors = Survey.StylesManager.ThemeColors['default'];

    // defaultThemeColors['$header-background-color'] = '#e7e7e7';
    // defaultThemeColors['$body-container-background-color'] = '#f4f4f4';

    // defaultThemeColors['$main-color'] = '#1ab394';
    // defaultThemeColors['$main-hover-color'] = '#0aa384';
    // defaultThemeColors['$body-background-color'] = 'white';
    // defaultThemeColors['$inputs-background-color'] = 'white';
    // defaultThemeColors['$text-color'] = '#1ab394';
    // defaultThemeColors['$header-color'] = '#6d7072';
    // defaultThemeColors['$border-color'] = '#e7e7e7';

    // defaultThemeColors['$error-color'] = '#ed5565';
    // defaultThemeColors['$error-background-color'] = '#fd6575';

    defaultThemeColors['$header-background-color'] = this.pageColor;
    defaultThemeColors['$body-container-background-color'] = this.pageColor;

    defaultThemeColors['$main-color'] = this.mainColor;
    defaultThemeColors['$main-hover-color'] = this.mainTextColor;
    defaultThemeColors['$body-background-color'] = this.pageColor;
    defaultThemeColors['$inputs-background-color'] = this.answerColor;
    defaultThemeColors['$text-color'] = this.mainColor;
    defaultThemeColors['$header-color'] = this.questionColor;
    defaultThemeColors['$border-color'] = '#e7e7e7';

    defaultThemeColors['$error-color'] = '#ed5565';
    defaultThemeColors['$error-background-color'] = '#fd6575';
    Survey.StylesManager.applyTheme();

    // surveyModel.onAfterRenderQuestion.add((survey, options) => {
    //   console.log('afer ==============>');
    //   if (!options.question.popupdescription) {
    //     return;
    //   }

    //   // Add a button;
    //   const btn = document.createElement('button');
    //   btn.className = 'btn btn-info btn-xs';
    //   btn.innerHTML = 'More Info';
    //   const question = options.question;
    //   btn.onclick = function() {
    //     // showDescription(question);
    //     alert(options.question.popupdescription);
    //   };
    //   const header = options.htmlElement.querySelector('h5');
    //   const span = document.createElement('span');
    //   span.innerHTML = '  ';
    //   header.appendChild(span);
    //   header.appendChild(btn);
    // });
    surveyModel.showProgressBar = 'both';
    surveyModel.onComplete.add(result => this.submitSurvey.emit(result.data));
    document.getElementById('surveyEle').innerHTML = ' ';
    Survey.SurveyNG.render('surveyEle', { model: surveyModel });
  }

  showSurvey() {}
}
