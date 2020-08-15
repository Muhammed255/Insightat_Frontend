import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ct-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  planStandard: any[];
  planAdvantage: any[];
  planPremier: any[];
  currentPlan: string;

  constructor() {}

  ngOnInit() {
    this.currentPlan = 'advantage';
    this.planStandard = [
      'Unlimited number of surveys',
      'Unlimited questions per survey',
      '1000 responses per month',
      '24/7 customer support via email',
      'Quizzes with custom feedback',
      'Unlimited filters & crosstabs, treded data',
      'Custom logo, colors, and survey URL',
      'Data exports (CSV, PDF, PPT, XLS)',
      'Skip logic only',
      'Text analysis'
    ];
    this.planAdvantage = [
      'Unlimited number of surveys',
      'Unlimited questions per survey',
      '1000 responses per month',
      '24/7 customer support via email',
      'Quizzes with custom feedback',
      'Unlimited filters & crosstabs, treded data',
      'Custom logo, colors, and survey URL',
      'Data exports (CSV, PDF, PPT, XLS)',
      'Skip logic, question & answer piping',
      'Text analysis & statistical significance',
      'Advanced data exports (SPSS)',
      'A/B testing, randomization, quotas',
      'Custom variables',
      'File upload',
      'SurveyMonkey industry bechmarks'
    ];
    this.planPremier = [
      'Unlimited number of surveys',
      'Unlimited questions per survey',
      '1000 responses per month',
      '24/7 customer support via email',
      'Quizzes with custom feedback',
      'Unlimited filters & crosstabs, treded data',
      'Custom logo, colors, and survey URL',
      'Data exports (CSV, PDF, PPT, XLS)',
      'Skip logic, question & answer piping',
      'Text analysis & statistical significance',
      'Advanced data exports (SPSS)',
      'A/B testing, randomization, quotas',
      'Custom variables',
      'File upload',
      'SurveyMonkey industry bechmarks',
      'Advanced data exports (SPSS)',
      'A/B testing, randomization, quotas',
      'Custom variables',
      'File upload',
      'SurveyMonkey industry bechmarks'
    ];
  }
}
