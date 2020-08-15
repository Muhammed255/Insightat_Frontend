import { Component, Input, Output, EventEmitter, SimpleChange, OnChanges, OnInit, OnDestroy } from '@angular/core';
import * as SurveyKo from 'survey-knockout';
import * as SurveyEditor from 'survey-creator';
import * as widgets from 'surveyjs-widgets';

// import 'inputmask/dist/inputmask/phone-codes/phone.js';

widgets.jquerybarrating(SurveyKo);
// widgets.jqueryuidatepicker(SurveyKo);

// var CkEditor_ModalEditor = {
//   afterRender: function(modalEditor, htmlElement) {
//     var editor = window["CKEDITOR"].replace(htmlElement);
//     editor.on("change", function() {
//       modalEditor.editingValue = editor.getData();
//     });
//     editor.setData(modalEditor.editingValue);
//   },
//   destroy: function(modalEditor, htmlElement) {
//     var instance = window["CKEDITOR"].instances[htmlElement.id];
//     if (instance) {
//       instance.removeAllListeners();
//       window["CKEDITOR"].remove(instance);
//     }
//   }
// };
// SurveyEditor.SurveyPropertyModalEditor.registerCustomWidget(
//   "html",
//   CkEditor_ModalEditor
// );

@Component({
  selector: 'survey-editor',
  template: `
    <div id="surveyEditorContainer"></div>
  `
})
export class SurveyEditorComponent implements OnChanges, OnInit, OnDestroy {
  editor: SurveyEditor.SurveyEditor;
  @Input() json: any;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();

  ngOnInit() {
    // SurveyKo.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
    // SurveyKo.JsonObject.metaData.addProperty('page', 'popupdescription:text');

    let editorOptions = { showEmbededSurveyTab: true, generateValidJSON: true };
    this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
    this.editor.text = this.json;
    this.editor.saveSurveyFunc = this.saveMySurvey;

    let survey_editor = document.getElementsByClassName('svd_toolbox_item');
    if (survey_editor[0] != undefined) {
      survey_editor[0].parentNode.insertBefore(survey_editor[12], survey_editor[6]);
      survey_editor[0].parentNode.insertBefore(survey_editor[13], survey_editor[10]);
    }
  }

  ngOnChanges(changes) {
    const jsonChange: SimpleChange = changes.json;
    if (jsonChange.previousValue !== jsonChange.currentValue) {
      let editorOptions = {
        showEmbededSurveyTab: true,
        generateValidJSON: true
      };
      this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
      this.editor.text = this.json;
      this.editor.saveSurveyFunc = this.saveMySurvey;

      let survey_editor = document.getElementsByClassName('svd_toolbox_item');
      if (survey_editor[0] != undefined) {
        survey_editor[0].parentNode.insertBefore(survey_editor[12], survey_editor[6]);
        survey_editor[0].parentNode.insertBefore(survey_editor[13], survey_editor[10]);
      }
    }
  }

  saveMySurvey = () => {
    this.surveySaved.emit(JSON.parse(this.editor.text));
  };

  ngOnDestroy() {
    this.editor.saveButtonClick();
    this.surveySaved.emit(JSON.parse(this.editor.text));
  }
}
