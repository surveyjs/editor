import {
  Base,
  FunctionFactory,
  Helpers,
  ItemValue,
  JsonObjectProperty,
  PanelModel,
  PanelModelBase,
  Question,
  QuestionButtonGroupModel,
  QuestionMatrixDynamicModel,
  Serializer,
  settings,
  SurveyModel
} from "survey-core";
import { editorLocalization } from "../editorLocalization";
import { EditableObject } from "../editable-object";
import { propertyGridCss } from "../property-grid-theme/property-grid";
import {
  SurveyQuestionEditorTabDefinition,
  SurveyQuestionProperties
} from "../question-editor/properties";
import { EmptySurveyCreatorOptions, ISurveyCreatorOptions } from "../settings";
import { PropertiesHelpTexts } from "./properties-helptext";
import { QuestionFactory } from "survey-core";
import { surveyDesignerCss } from "../survey-designer-theme/survey-designer";

function propertyVisibleIf(params: any): boolean {
  if (!this.question || !this.question.obj) return false;
  return this.question.property.visibleIf(this.question.obj);
}

FunctionFactory.Instance.register("propertyVisibleIf", propertyVisibleIf);

export interface IPropertyEditorSetup {
  editSurvey: SurveyModel;
  apply(): boolean;
}

export function setSurveyJSONForPropertyGrid(
  json: any,
  updateOnTyping: boolean = true
) {
  json.showNavigationButtons = "none";
  json.showPageTitles = false;
  json.focusFirstQuestionAutomatic = false;
  json.showQuestionNumbers = "off";
  json.questionTitleLocation = "top";
  json.showProgressBar = "off";
  if (updateOnTyping) {
    json.textUpdateMode = "onTyping";
  }
  json.requiredText = "";
}

export abstract class PropertyEditorSetupValue implements IPropertyEditorSetup {
  private editSurveyValue: SurveyModel;
  constructor(
    protected options: ISurveyCreatorOptions = null,
    doSetup: boolean = true
  ) {
    if (!this.options) {
      this.options = new EmptySurveyCreatorOptions();
    }
    if (doSetup) {
      this.setupSurvey();
    }
  }
  protected setupSurvey() {
    this.editSurveyValue = this.createSurvey();
  }
  public get editSurvey(): SurveyModel {
    return this.editSurveyValue;
  }
  public hasErrors(): boolean {
    return this.editSurvey.hasErrors(true, true);
  }
  protected createSurvey(): SurveyModel {
    var json = this.getSurveyJSON();
    setSurveyJSONForPropertyGrid(json);
    return this.options.createSurvey(json, this.getSurveyCreationReason());
  }
  protected abstract getSurveyJSON(): any;
  protected abstract getSurveyCreationReason(): string;
  public abstract apply(): boolean;
}

export interface IPropertyGridEditor {
  fit(prop: JsonObjectProperty): boolean;
  isDefault?: () => boolean;
  getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any;
  onCreated?: (obj: Base, question: Question, prop: JsonObjectProperty) => void;
  onAfterRenderQuestion?: (
    obj: Base,
    prop: JsonObjectProperty,
    evtOptions: any
  ) => void;
  createPropertyEditorSetup?: (
    obj: Base,
    prop: JsonObjectProperty,
    question: Question,
    options: ISurveyCreatorOptions
  ) => IPropertyEditorSetup;
  isPropertyEditorSetupEnabled?: (
    obj: Base,
    prop: JsonObjectProperty,
    question: Question,
    options: ISurveyCreatorOptions
  ) => boolean;
  clearPropertyValue?: (
    obj: Base,
    prop: JsonObjectProperty,
    question: Question,
    options: ISurveyCreatorOptions
  ) => void;
  onMasterValueChanged?: (
    obj: Base,
    prop: JsonObjectProperty,
    question: Question
  ) => void;

  onAddIntoPropertyValue?: (
    obj: Base,
    prop: JsonObjectProperty,
    question: Question,
    options: ISurveyCreatorOptions
  ) => void;
  onMatrixCellCreated?: (obj: Base, options: any) => void;
  onMatrixCellValueChanged?: (obj: Base, options: any) => void;
  onMatrixAllowRemoveRow?: (obj: Base, options: any) => boolean;
  onGetQuestionTitleActions?: (obj: Base, options: any) => void;
}

export var PropertyGridEditorCollection = {
  editors: new Array<IPropertyGridEditor>(),
  fitHash: {},
  clearHash(): void {
    this.fitHash = {};
  },
  register(editor: IPropertyGridEditor) {
    this.editors.push(editor);
  },
  getEditor(prop: JsonObjectProperty): IPropertyGridEditor {
    if (!prop) return null;
    var fitEd = this.fitHash[prop.id];
    if (!!fitEd) return fitEd;
    let ed = this.isEditorFit(prop);
    return !!ed ? ed : this.isEditorFit(prop, true);
  },
  isEditorFit(
    prop: JsonObjectProperty,
    asDefault: boolean = false
  ): IPropertyGridEditor {
    for (var i = this.editors.length - 1; i >= 0; i--) {
      let ed = this.editors[i];
      if (
        (!asDefault && ed.fit(prop)) ||
        (asDefault && ed.isDefault && ed.isDefault())
      ) {
        this.fitHash[prop.id] = ed;
        return ed;
      }
    }
    return null;
  },
  getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    var res = this.getEditor(prop);
    return !!res ? res.getJSON(obj, prop, options) : null;
  },
  onCreated(obj: Base, question: Question, prop: JsonObjectProperty): any {
    var res = this.getEditor(prop);
    if (!!res && !!res.onCreated) {
      res.onCreated(obj, question, prop);
    }
  },
  onAfterRenderQuestion(obj: Base, prop: JsonObjectProperty, evtOptions: any) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onAfterRenderQuestion) {
      res.onAfterRenderQuestion(obj, prop, evtOptions);
    }
  },
  onMatrixCellCreated(obj: Base, prop: JsonObjectProperty, options: any) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onMatrixCellCreated) {
      res.onMatrixCellCreated(options.question.obj, options);
    }
  },
  onMatrixCellValueChanged(obj: Base, prop: JsonObjectProperty, options: any) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onMatrixCellCreated) {
      res.onMatrixCellValueChanged(obj, options);
    }
    var row = options.row;
    if (!!row) {
      var cellQuestion = row.getQuestionByName(options.columnName);
      if (!!cellQuestion) {
        row.runCondition({}, { question: cellQuestion });
      }
    }
  },
  onMatrixAllowRemoveRow(
    obj: Base,
    prop: JsonObjectProperty,
    options: any
  ): boolean {
    var res = this.getEditor(prop);
    if (!!res && !!res.onMatrixAllowRemoveRow) {
      return res.onMatrixAllowRemoveRow(obj, options);
    }
    return true;
  },
  onGetMatrixRowAction(
    obj: Base,
    prop: JsonObjectProperty,
    options: any,
    setObjFunc: (obj: Base) => void
  ) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onGetMatrixRowAction) {
      res.onGetMatrixRowAction(obj, options, setObjFunc);
    }
  },
  onGetQuestionTitleActions(obj: Base, prop: JsonObjectProperty, options: any) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onGetQuestionTitleActions) {
      res.onGetQuestionTitleActions(obj, options);
    }
  },
  onValueChanged(obj: Base, prop: JsonObjectProperty, question: Question) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onValueChanged) {
      res.onValueChanged(obj, prop, question);
    }
  },
  onMasterValueChanged(
    obj: Base,
    prop: JsonObjectProperty,
    question: Question
  ) {
    var res = this.getEditor(prop);
    if (!!res && !!res.onMasterValueChanged) {
      res.onMasterValueChanged(obj, prop, question);
    }
  }
};

export class PropertyGridTitleActionsCreator {
  constructor(public obj: Base, private options: ISurveyCreatorOptions) {}
  public onGetQuestionTitleActions(options) {
    var question = options.question;
    var property = question.property;
    var editor = PropertyGridEditorCollection.getEditor(property);
    if (!editor) return;
    var actions = [];
    var enabled = !question.isReadOnly;
    if (!!editor.clearPropertyValue) {
      actions.push(
        this.createClearValueAction(editor, property, question, enabled)
      );
    }
    if (!!editor.createPropertyEditorSetup) {
      if (enabled) {
        enabled =
          !editor.isPropertyEditorSetupEnabled ||
          editor.isPropertyEditorSetupEnabled(
            this.obj,
            property,
            options.question,
            this.options
          );
      }
      actions.push(
        this.createEditorSetupAction(editor, property, question, enabled)
      );
    }
    var helpAction = this.createPropertyHelpAction(question);
    if (!!helpAction) {
      actions.push(helpAction);
    }
    if (actions.length > 0) {
      options.titleActions = actions;
    }
  }
  private createClearValueAction(
    editor: IPropertyGridEditor,
    property: JsonObjectProperty,
    question: Question,
    enabled: boolean
  ): any {
    return {
      title: "",
      id: "property-grid-clear",
      icon: "icon-property_grid_clear",
      showTitle: false,
      iconName: "icon-property_grid_clear",
      enabled: enabled,
      action: () => {
        editor.clearPropertyValue(
          question.obj,
          property,
          question,
          this.options
        );
      }
    };
  }
  private showModalPropertyEditor(
    editor: IPropertyGridEditor,
    property: JsonObjectProperty,
    question: Question
  ) {
    const surveyPropertyEditor = editor.createPropertyEditorSetup(
      this.obj,
      property,
      question,
      this.options
    );
    if (!surveyPropertyEditor) return;
    surveyPropertyEditor.editSurvey.css = surveyDesignerCss;
    settings.showModal(
      "survey",
      {
        survey: surveyPropertyEditor.editSurvey,
        model: surveyPropertyEditor.editSurvey
      },
      () => surveyPropertyEditor.apply()
    );
  }

  private createEditorSetupAction(
    editor: IPropertyGridEditor,
    property: JsonObjectProperty,
    question: Question,
    enabled: boolean
  ): any {
    var setupAction = {
      title: "",
      id: "property-grid-setup",
      css: "sv-action--first sv-action-bar-item--secondary",
      icon: "icon-property_grid_modal",
      iconName: "icon-property_grid_modal",
      enabled: enabled,
      showTitle: false,
      action: () => {
        this.showModalPropertyEditor(editor, property, question);
      }
    };
    return setupAction;
  }
  private createPropertyHelpAction(question: Question): any {
    if (!question.description) return null;
    return {
      title: "",
      id: "property-grid-help",
      iconName: () => {
        return question.descriptionLocation != "hidden"
          ? "icon-helpfinish"
          : "icon-help";
      },
      showTitle: false,
      action: () => {
        question.descriptionLocation =
          question.descriptionLocation != "hidden" ? "hidden" : "underTitle";
      }
    };
  }
}

export class PropertyJSONGenerator {
  public static isPropertyReadOnly(
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions,
    obj: Base,
    parentObj: Base,
    parentProperty: JsonObjectProperty
  ): boolean {
    var res = prop.readOnly;
    if (!!options && !!obj) {
      res = options.onIsPropertyReadOnlyCallback(
        obj,
        prop,
        res,
        parentObj,
        parentProperty
      );
    }
    return res;
  }
  public static getClassNameProperty(obj: Base) {
    if (!!obj && !!obj["getClassNameProperty"])
      return obj["getClassNameProperty"]();
    return undefined;
  }

  constructor(
    public obj: Base,
    private options: ISurveyCreatorOptions = null,
    private parentObj: Base = null,
    private parentProperty: JsonObjectProperty = null
  ) {}
  public toJSON(isNested: boolean = false): any {
    return this.createJSON(isNested);
  }
  public createColumnsJSON(className: string, names: Array<string>): any {
    var res: Array<any> = [];
    for (var i = 0; i < names.length; i++) {
      var columnJSON = this.getColumnPropertyJSON(className, names[i]);
      if (!!columnJSON) {
        res.push(columnJSON);
      }
    }
    return res;
  }
  public setupObjPanel(panel: PanelModelBase, isNestedObj: boolean = false) {
    panel.fromJSON(this.toJSON(isNestedObj));
    this.onQuestionsCreated(panel);
  }
  private onQuestionsCreated(panel: PanelModelBase) {
    var properties = Serializer.getPropertiesByObj(this.obj);
    var props: any = {};
    for (var i = 0; i < properties.length; i++) {
      props[properties[i].name] = properties[i];
    }
    var questions = panel.questions;
    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var prop = props[q.name];
      q.property = prop;
      q.obj = this.obj;
      q.options = this.options;
      var eventVisibility = this.getVisibilityOnEvent(prop);
      q.readOnly = q.readOnly || this.isPropertyReadOnly(prop);
      q.visible = q.visible && eventVisibility;
      if (!!prop.visibleIf) {
        q.visibleIf = eventVisibility ? "propertyVisibleIf() = true" : "";
      }
      q.descriptionLocation = "hidden";
      var helpText = PropertiesHelpTexts.instance.getHelpText(this.obj, prop);
      if (!!helpText) {
        q.description = helpText;
      }
      PropertyGridEditorCollection.onCreated(this.obj, q, prop);
    }
  }
  private getVisibilityOnEvent(
    prop: JsonObjectProperty,
    showMode: string = ""
  ): boolean {
    return this.options.onCanShowPropertyCallback(
      this.obj,
      <any>prop,
      showMode,
      this.parentObj,
      <any>this.parentProperty
    );
  }
  private isPropertyReadOnly(prop: JsonObjectProperty): boolean {
    return PropertyJSONGenerator.isPropertyReadOnly(
      prop,
      this.options,
      this.obj,
      this.parentObj,
      this.parentProperty
    );
  }

  private createJSON(isNestedObj: boolean): any {
    var className = undefined;
    var propName = PropertyJSONGenerator.getClassNameProperty(this.obj);
    if (!!propName && this.obj[propName]) {
      className = this.obj.getType() + "@" + this.obj[propName];
    }
    var properties = new SurveyQuestionProperties(
      this.obj,
      null,
      className,
      undefined,
      this.parentObj,
      this.parentProperty
    );
    var tabs = properties.getTabs();
    var panels: any = {};
    for (var i = 0; i < tabs.length; i++) {
      panels[tabs[i].name] = this.createPanelProps(tabs[i], i == 0);
    }
    var json: any = {
      elements: []
    };
    for (var key in panels) {
      if (key == "general" && isNestedObj) {
        var els = panels[key].elements;
        for (var i = 0; i < els.length; i++) {
          json.elements.push(els[i]);
        }
      } else {
        json.elements.push(panels[key]);
      }
    }
    return json;
  }
  private createPanelProps(
    tab: SurveyQuestionEditorTabDefinition,
    isFirst: boolean
  ): any {
    var panel = this.createPanelJSON(tab.name, tab.title, isFirst);
    for (var i = 0; i < tab.properties.length; i++) {
      var propDef = tab.properties[i];
      var propJSON = this.createQuestionJSON(
        <any>propDef.property,
        propDef.title
      );
      if (!propJSON) continue;
      panel.elements.push(propJSON);
    }
    return panel;
  }
  private createPanelJSON(
    category: string,
    title: string,
    isFirstPanel: boolean
  ): any {
    return {
      type: "panel",
      name: category,
      title: this.getPanelTitle(category, title),
      state: isFirstPanel ? "expanded" : "collapsed",
      elements: []
    };
  }
  private createQuestionJSON(
    prop: JsonObjectProperty,
    title: string,
    isColumn: boolean = false
  ): any {
    var isVisible = this.isPropertyVisible(prop, isColumn ? "list" : "");
    if (!isVisible && isColumn) return null;
    var json = PropertyGridEditorCollection.getJSON(
      this.obj,
      prop,
      this.options
    );
    if (!json) return null;
    json.name = prop.name;
    json.visible = prop.visible;
    json.isReadOnly = prop.readOnly;
    json.isRequired = prop.isRequired;
    json.requiredErrorText = editorLocalization.getString("pe.propertyIsEmpty");
    json.title = this.getQuestionTitle(prop, title);
    return json;
  }
  private getColumnPropertyJSON(className: string, propName: string): any {
    if (!className) return null;
    var prop = Serializer.findProperty(className, propName);
    if (!prop) return null;
    var json = this.createQuestionJSON(prop, "", true);
    if (!json) return null;
    json.name = prop.name;
    json.title = this.getQuestionTitle(prop, "");
    if (prop.isUnique) {
      json.isUnique = prop.isUnique;
    }
    if (!!json.type) {
      json.cellType = json.type;
      delete json.type;
    }
    if (!!json.isReadOnly) {
      json.readOnly = json.isReadOnly;
      delete json.isReadOnly;
    }
    return json;
  }
  private isPropertyVisible(
    prop: JsonObjectProperty,
    showMode: string
  ): boolean {
    if (!prop.visible) return false;
    return !showMode || !prop.showMode || showMode == prop.showMode;
  }
  private getPanelTitle(name: string, title: string): string {
    if (!!title) return title;
    return editorLocalization.getString("pe.tabs." + name);
  }
  private getQuestionTitle(prop: JsonObjectProperty, title: string): string {
    if (!!prop.displayName) return prop.displayName;
    if (!!title && title !== prop.name) return title;
    return editorLocalization.getPropertyNameInEditor(prop.name);
  }
}

export class PropertyGridModel {
  private surveyValue: SurveyModel;
  private objValue: Base;
  private optionsValue: ISurveyCreatorOptions;
  private titleActionsCreator: PropertyGridTitleActionsCreator;
  private classNameProperty: string;
  private classNameValue: any;
  public objValueChangedCallback: () => void;
  public changedFromActionCallback: (obj: Base, propertyName: string) => void;
  constructor(
    obj: Base = null,
    options: ISurveyCreatorOptions = new EmptySurveyCreatorOptions()
  ) {
    this.options = options;
    this.obj = obj;
  }
  public get obj() {
    return this.objValue;
  }
  public set obj(value: Base) {
    if (this.objValue === value) return;
    this.setObj(value);
  }
  public selectProperty(propertyName: string, focus = true) {
    if (!this.survey) return;
    var question = this.survey.getQuestionByName(propertyName);
    if (!question) return;
    var panels = this.survey.getAllPanels();
    for (var i = 0; i < panels.length; i++) {
      var panel = <PanelModel>panels[i];
      if (panel === question.parent) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
    if (focus) {
      question.focus();
    }
  }
  private setObjFromAction(value: Base, propertyName: string) {
    if (this.changedFromActionCallback) {
      this.changedFromActionCallback(value, propertyName);
    } else {
      this.setObj(value);
    }
  }
  private setObj(value: Base) {
    this.objValue = value;
    this.classNameProperty = !!this.obj
      ? PropertyJSONGenerator.getClassNameProperty(this.obj)
      : "";
    this.classNameValue = !!this.classNameProperty
      ? this.obj[this.classNameProperty]
      : undefined;

    this.titleActionsCreator = !!this.obj
      ? new PropertyGridTitleActionsCreator(this.obj, this.options)
      : undefined;
    var json = this.getSurveyJSON();
    if (this.options.readOnly) {
      json.mode = "display";
    }
    if (!!this.surveyValue) {
      this.surveyValue.dispose();
    }
    this.surveyValue = this.createSurvey(json);
    this.surveyValue.css = propertyGridCss;
    var page = this.surveyValue.createNewPage("p1");
    if (!this.obj) return;
    new PropertyJSONGenerator(this.obj, this.options).setupObjPanel(
      page,
      false
    );
    this.survey.addPage(page);
    this.survey.checkErrorsMode = "onValueChanging";
    this.survey.onValueChanged.add((sender, options) => {
      this.onValueChanged(options);
    });
    this.survey.onValueChanging.add((sender, options) => {
      this.onValueChanging(options);
    });
    this.survey.onValidateQuestion.add((sender, options) => {
      this.onValidateQuestion(options);
    });
    this.survey.onGetQuestionTitleActions.add((sender, options) => {
      this.titleActionsCreator.onGetQuestionTitleActions(options);
      this.onGetQuestionTitleActions(options);
    });
    this.survey.onGetPanelTitleActions.add((sender, options) => {
      options.titleActions.splice(0, options.titleActions.length);
    });
    this.survey.onMatrixCellCreated.add((sender, options) => {
      this.onMatrixCellCreated(options);
    });
    this.survey.onMatrixCellValueChanging.add((sender, options) => {
      this.onMatrixCellValueChanging(options);
    });
    this.survey.onMatrixCellValidate.add((sender, options) => {
      this.onMatrixCellValidate(options);
    });
    this.survey.onMatrixCellValueChanged.add((sender, options) => {
      this.onMatrixCellValueChanged(options);
    });
    this.survey.onMatrixAllowRemoveRow.add((sender, options) => {
      options.allow = this.onMatrixAllowRemoveRow(options);
    });
    this.survey.onMatrixRowAdded.add((sender, options) => {
      this.onMatrixRowAdded(options);
    });
    this.survey.onGetMatrixRowActions.add((sender, options) => {
      this.onGetMatrixRowAction(options);
    });
    this.survey.onAfterRenderQuestion.add((sender, options) => {
      this.onAfterRenderQuestion(options);
    });
    this.survey.editingObj = this.obj;
    if (this.objValueChangedCallback) {
      this.objValueChangedCallback();
    }
  }
  public get options(): ISurveyCreatorOptions {
    return this.optionsValue;
  }
  public set options(val: ISurveyCreatorOptions) {
    this.optionsValue = !!val ? val : new EmptySurveyCreatorOptions();
  }
  public get survey() {
    return this.surveyValue;
  }
  public validate(): boolean {
    if (!this.survey) return;
    return !this.survey.hasErrors(true, true);
  }
  public collapseCategory(name: string) {
    var panel = <PanelModel>this.survey.getPanelByName(name);
    if (!!panel) {
      panel.collapse();
    }
  }
  public expandCategory(name: string) {
    var panel = <PanelModel>this.survey.getPanelByName(name);
    if (!!panel) {
      panel.expand();
    }
  }
  public collapseAllCategories() {
    var panels = this.survey.getAllPanels();
    for (var i = 0; i < panels.length; i++) {
      (<PanelModel>panels[i]).collapse();
    }
  }
  public expandAllCategories() {
    var panels = this.survey.getAllPanels();
    for (var i = 0; i < panels.length; i++) {
      (<PanelModel>panels[i]).expand();
    }
  }
  protected createSurvey(json: any): SurveyModel {
    return this.options.createSurvey(json, "property-grid");
  }
  protected getSurveyJSON(): any {
    var res = {};
    setSurveyJSONForPropertyGrid(res);
    delete res["textUpdateMode"];
    return res;
  }
  private onValidateQuestion(options: any) {
    var q = options.question;
    if (!q || !q.property) return;
    if (q.isRequired && Helpers.isValueEmpty(options.value)) {
      options.error = editorLocalization.getString("pe.propertyIsEmpty");
      return;
    }
    options.error = this.options.onGetErrorTextOnValidationCallback(
      q.property.name,
      <any>this.obj,
      options.value
    );
  }
  private onValueChanging(options: any) {
    var q = options.question;
    if (!q || !q.property) return;
    var changingOptions = {
      obj: this.obj,
      propertyName: q.property.name,
      value: options.oldValue,
      newValue: options.value,
      doValidation: false
    };
    this.options.onValueChangingCallback(changingOptions);
    options.value = changingOptions.newValue;
  }
  private onValueChanged(options: any) {
    var q = options.question;
    if (!q || !q.property) return;
    this.options.onSurveyElementPropertyValueChanged(
      q.property,
      this.obj,
      options.value
    );
    this.changeDependedProperties(q);
    PropertyGridEditorCollection.onValueChanged(this.obj, q.property, q);
    if (
      !!this.classNameProperty &&
      options.name === this.classNameProperty &&
      this.classNameValue !== options.value
    ) {
      this.setObj(this.obj);
    }
  }
  private changeDependedProperties(question: Question) {
    var prop: JsonObjectProperty = question.property;
    var properties = prop.getDependedProperties();
    if (!properties) return;
    for (var i = 0; i < properties.length; i++) {
      var name = properties[i];
      var q = this.survey.getQuestionByName(name);
      if (!q) continue;
      if (!Helpers.isTwoValueEquals(q.value, this.survey.getValue(name))) {
        q.value = this.survey.getValue(name);
      }
      PropertyGridEditorCollection.onMasterValueChanged(
        this.obj,
        q.property,
        q
      );
    }
  }

  private onAfterRenderQuestion(options: any) {
    PropertyGridEditorCollection.onAfterRenderQuestion(
      this.obj,
      options.question.property,
      options
    );
  }
  private isCellCreating = false;
  private onMatrixCellCreated(options: any) {
    this.isCellCreating = true;
    PropertyGridEditorCollection.onMatrixCellCreated(
      this.obj,
      options.question.property,
      options
    );
    this.isCellCreating = false;
    var obj = options.row.editingObj;
    if (!obj) return;
    var prop = Serializer.findProperty(obj.getType(), options.columnName);
    if (!prop) return;
    options.cellQuestion.readOnly = PropertyJSONGenerator.isPropertyReadOnly(
      prop,
      this.options,
      obj,
      this.obj,
      options.question.property
    );
  }
  private onMatrixCellValueChanging(options: any) {
    if (this.isCellCreating) return;
    var changingOptions = {
      obj: options.row.editingObj,
      propertyName: options.columnName,
      value: options.oldValue,
      newValue: options.value,
      doValidation: false
    };
    this.options.onValueChangingCallback(changingOptions);
    options.value = changingOptions.newValue;
  }
  private onMatrixCellValidate(options: any) {
    if (this.isCellCreating) return;
    var matrix = <QuestionMatrixDynamicModel>options.question;
    var column = matrix.getColumnByName(options.columnName);
    if (!!column && column.isRequired && Helpers.isValueEmpty(options.value)) {
      options.error = editorLocalization.getString("pe.propertyIsEmpty");
      return;
    }
    options.error = this.options.onGetErrorTextOnValidationCallback(
      options.columnName,
      <any>options.row.editingObj,
      options.value
    );
  }
  private onGetMatrixRowAction(options: any) {
    PropertyGridEditorCollection.onGetMatrixRowAction(
      this.obj,
      options.question.property,
      options,
      (obj: Base): void => {
        this.setObjFromAction(obj, options.question.name);
      }
    );
  }
  private onGetQuestionTitleActions(options: any) {
    PropertyGridEditorCollection.onGetQuestionTitleActions(
      this.obj,
      options.question.property,
      options
    );
  }
  private onMatrixCellValueChanged(options: any) {
    if (this.isCellCreating) return;
    PropertyGridEditorCollection.onMatrixCellValueChanged(
      this.obj,
      options.question.property,
      options
    );
    var rowObj = options.row.editingObj;
    if (!rowObj) return;
    var prop = Serializer.findProperty(rowObj.getType(), options.columnName);
    this.options.onSurveyElementPropertyValueChanged(
      //this.options.onPropertyValueChanged(
      <any>prop,
      options.row.editingObj,
      options.value
    );
  }
  private onMatrixAllowRemoveRow(options: any): boolean {
    var res = PropertyGridEditorCollection.onMatrixAllowRemoveRow(
      this.obj,
      options.question.property,
      options
    );
    res =
      this.options.onCollectionItemDeletingCallback(
        <any>this.obj,
        options.question.property,
        options.question.value,
        options.row.editingObj
      ) && res;
    return this.options.onCanDeleteItemCallback(
      <any>this.obj,
      options.row.editingObj,
      res
    );
  }
  private onMatrixRowAdded(options: any) {
    var item = options.row.editingObj;
    if (Serializer.isDescendantOf(item.getType(), "itemvalue")) {
      this.options.onItemValueAddedCallback(
        <any>this.obj,
        options.question.property.name,
        options.row.editingObj,
        options.question.value
      );
    }
    if (Serializer.isDescendantOf(item.getType(), "matrixdropdowncolumn")) {
      this.options.onMatrixDropdownColumnAddedCallback(
        <any>this.obj,
        options.row.editingObj,
        options.question.value
      );
    }
  }
}

export abstract class PropertyGridEditor implements IPropertyGridEditor {
  constructor() {}
  public abstract fit(prop: JsonObjectProperty): boolean;
  public abstract getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any;
}

export class PropertyGridEditorBoolean extends PropertyGridEditor {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "boolean" || prop.type == "switch";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return {
      type: "boolean",
      default: false,
      renderAs: "checkbox",
      titleLocation: "hidden"
    };
  }
}
export abstract class PropertyGridEditorStringBase extends PropertyGridEditor {
  protected updateMaxLength(prop: JsonObjectProperty, json: any): any {
    if (prop.maxLength > 0) {
      json.maxLength = prop.maxLength;
    }
    return json;
  }
}
export class PropertyGridEditorString extends PropertyGridEditorStringBase {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "string";
  }
  public isDefault() {
    return true;
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return this.updateMaxLength(prop, { type: "text" });
  }
}
export class PropertyGridEditorNumber extends PropertyGridEditor {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "number";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    var res: any = { type: "text", inputType: "number" };
    if (prop.minValue !== undefined) {
      res.min = prop.minValue;
    }
    if (prop.maxValue !== undefined) {
      res.max = prop.maxValue;
    }
    return res;
  }
}
export class PropertyGridEditorText extends PropertyGridEditorStringBase {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type === "text";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return this.updateMaxLength(prop, {
      type: "comment",
      textUpdateMode: "onTyping"
    });
  }
}
export class PropertyGridEditorHtml extends PropertyGridEditorStringBase {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type === "html";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return this.updateMaxLength(prop, {
      type: "comment",
      textUpdateMode: "onTyping"
    });
  }
}
export class PropertyGridEditorColor extends PropertyGridEditor {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "color";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return { type: "text", inputType: "color" };
  }
}
export class PropertyGridEditorStringArray extends PropertyGridEditor {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "string[]";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return { type: "comment" };
  }
  public onCreated(obj: Base, question: Question, prop: JsonObjectProperty) {
    question.valueFromDataCallback = function (val: any): any {
      if (!Array.isArray(val)) return "";
      return val.join("\n");
    };
    question.valueToDataCallback = function (val: any): any {
      if (!val) return [];
      if (Array.isArray(val) && !val["split"]) return val;
      return val.split("\n");
    };
  }
}
export class PropertyGridEditorDropdown extends PropertyGridEditor {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.hasChoices;
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    var choices = prop.getChoices(obj);

    var json: any = {
      type: this.renderAsButtonGroup(prop, choices)
        ? "buttongroup"
        : "dropdown",
      showOptionsCaption: false
    };
    var emptyValueItem: ItemValue = this.getEmptyJsonItemValue(prop, choices);
    if (!!emptyValueItem) {
      json.showOptionsCaption = true;
      json.optionsCaption = emptyValueItem.text;
    }
    return json;
  }
  protected get canRenderAsButtonGroup(): boolean {
    return true;
  }
  protected renderAsButtonGroup(
    prop: JsonObjectProperty,
    choices: Array<any>
  ): boolean {
    if (
      !this.canRenderAsButtonGroup ||
      !choices ||
      choices.length == 0 ||
      choices.length > 4
    )
      return false;
    var charCount = 0;
    for (var i = 0; i < choices.length; i++) {
      var text = this.getLocalizedText(
        prop,
        !!choices[i].value ? choices[i].value : choices[i]
      );
      charCount += !!text ? text.length : 0;
    }
    return charCount < 25; //TODO
  }
  onCreated(obj: Base, question: Question, prop: JsonObjectProperty) {
    this.setChoices(obj, question, prop);
  }
  onMasterValueChanged(
    obj: Base,
    prop: JsonObjectProperty,
    question: Question
  ) {
    this.setChoices(obj, question, prop);
  }
  private setChoicesCore(
    question: Question,
    prop: JsonObjectProperty,
    propChoices: Array<any>
  ) {
    if (!propChoices || !Array.isArray(propChoices) || propChoices.length == 0)
      return;
    question.choices = this.choicesFromPropChoices(prop, propChoices);
  }
  private getLocalizedText(prop: JsonObjectProperty, value: string): string {
    if (prop.name === "locale") {
      let text = editorLocalization.getLocaleName(value);
      if (text) return text;
    }
    if (prop.name === "cellType") {
      let text = editorLocalization.getString("qt." + value);
      if (text) return text;
    }
    if (value === null) return null;
    return editorLocalization.getPropertyValue(value);
  }
  private choicesFromPropChoices(
    prop: JsonObjectProperty,
    propChoices: Array<any>
  ): Array<any> {
    var choices = [];
    for (var i = 0; i < propChoices.length; i++) {
      var jsonItem = this.getJsonItem(prop, propChoices[i]);
      if (!Helpers.isValueEmpty(jsonItem.value)) {
        choices.push(jsonItem);
      }
    }
    return choices;
  }
  private getJsonItem(prop: JsonObjectProperty, item: any): any {
    var jsonItem: any = { value: item.value !== undefined ? item.value : item };
    var text = !!item.text ? item.text : "";
    if (!text) {
      text = this.getLocalizedText(prop, jsonItem.value);
    }
    if (!!text && text != jsonItem.value) {
      jsonItem.text = text;
    }
    return jsonItem;
  }
  private setChoices(obj: Base, question: Question, prop: JsonObjectProperty) {
    var propChoices = prop.getChoices(obj, (choices: any) => {
      this.setChoicesCore(question, prop, choices);
    });
    this.setChoicesCore(question, prop, propChoices);
  }
  private getEmptyJsonItemValue(
    prop: JsonObjectProperty,
    choices: Array<any>
  ): any {
    if (!choices) return null;
    for (var i = 0; i < choices.length; i++) {
      var item = choices[i];
      var value = item.value !== undefined ? item.value : item;
      if (Helpers.isValueEmpty(value)) return this.getJsonItem(prop, item);
    }
    return null;
  }
}

export class PropertyGridEditorSet extends PropertyGridEditorDropdown {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "set";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    var json = super.getJSON(obj, prop, options);
    var hasTagbox = !!Serializer.findClass("tagbox");
    json.type = hasTagbox ? "tagbox" : "checkbox";
    json.hasSelectAll = !hasTagbox;
    return json;
  }
}
export class PropertyGridEditorPage extends PropertyGridEditorDropdown {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.hasChoices && prop.name == "page";
  }
  protected get canRenderAsButtonGroup(): boolean {
    return false;
  }
  onCreated(obj: Base, question: Question, prop: JsonObjectProperty) {
    super.onCreated(obj, question, prop);
    question.valueFromDataCallback = (val: any): any => {
      return !!val ? val.name : "";
    };
    question.valueToDataCallback = (val: any): any => {
      if (!val || !obj || !obj.getSurvey()) return undefined;
      return (<SurveyModel>obj.getSurvey()).getPageByName(val);
    };
  }
}
export class PropertyGridEditorQuestion extends PropertyGridEditor {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "question";
  }
  public getJSON(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): any {
    return {
      type: "dropdown",
      optionsCaption: editorLocalization.getString(
        "pe.conditionSelectQuestion"
      ),
      choices: this.getChoices(obj, prop, options)
    };
  }
  private getChoices(
    obj: Base,
    prop: JsonObjectProperty,
    options: ISurveyCreatorOptions
  ): Array<any> {
    var survey = EditableObject.getSurvey(obj);
    if (!survey) return [];
    var questions = this.getQuestions(survey, obj);
    if (!questions) questions = [];
    var showTitles = !!options && options.showTitlesInExpressions;
    var qItems = questions.map((q) => {
      let text = showTitles ? (<any>q).locTitle.renderedHtml : q.name;
      let value = this.getItemValue(<any>q);
      return { value: value, text: text };
    });
    qItems.sort((el1, el2) => {
      return el1.text.localeCompare(el2.text);
    });

    return qItems;
  }

  protected getQuestions(survey: SurveyModel, obj: Base): Array<Question> {
    return survey.getAllQuestions();
  }

  protected getItemValue(question: Question): any {
    return question.name;
  }
}

export class PropertyGridEditorQuestionSelectBase extends PropertyGridEditorQuestion {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "question_selectbase";
  }

  protected getQuestions(survey: SurveyModel, obj: Base): Array<Question> {
    let questions = super.getQuestions(survey, obj);
    let res = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i] === obj) continue;
      if (Serializer.isDescendantOf(questions[i].getType(), "selectbase")) {
        res.push(questions[i]);
      }
    }
    return res;
  }
}

export class PropertyGridEditorQuestionValue extends PropertyGridEditorQuestion {
  public fit(prop: JsonObjectProperty): boolean {
    return prop.type == "questionvalue";
  }
  protected getItemValue(question: Question): any {
    return question.getValueName();
  }
}

PropertyGridEditorCollection.register(new PropertyGridEditorBoolean());
PropertyGridEditorCollection.register(new PropertyGridEditorString());
PropertyGridEditorCollection.register(new PropertyGridEditorNumber());
PropertyGridEditorCollection.register(new PropertyGridEditorColor());
PropertyGridEditorCollection.register(new PropertyGridEditorText());
PropertyGridEditorCollection.register(new PropertyGridEditorHtml());
PropertyGridEditorCollection.register(new PropertyGridEditorDropdown());
PropertyGridEditorCollection.register(new PropertyGridEditorSet());
PropertyGridEditorCollection.register(new PropertyGridEditorPage());
PropertyGridEditorCollection.register(new PropertyGridEditorStringArray());
PropertyGridEditorCollection.register(new PropertyGridEditorQuestion());
PropertyGridEditorCollection.register(new PropertyGridEditorQuestionValue());
PropertyGridEditorCollection.register(
  new PropertyGridEditorQuestionSelectBase()
);

QuestionFactory.Instance.registerQuestion("buttongroup", (name) => {
  return new QuestionButtonGroupModel(name);
});
