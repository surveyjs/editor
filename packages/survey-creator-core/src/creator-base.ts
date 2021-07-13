import * as Survey from "survey-core";
import {
  IActionBarItem,
  Base,
  SurveyModel,
  ListModel,
  Question,
  PanelModel,
  PageModel,
  PopupModel,
  property,
  propertyArray,
  IElement,
  Serializer,
  AdaptiveActionContainer,
  Action
} from "survey-core";
import { ISurveyCreatorOptions, settings } from "./settings";
import { editorLocalization } from "./editorLocalization";
import { SurveyJSON5 } from "./json5";
import { DragDropHelper } from "survey-core";
import { QuestionConverter } from "./questionconverter";
import { SurveyTextWorker } from "./textWorker";
import { QuestionToolbox } from "./toolbox";
import { getNextValue, isPropertyVisible, propertyExists } from "./utils/utils";
import { PropertyGridModel } from "./property-grid";
import { ObjType, SurveyHelper } from "./survey-helper";
import { UndoRedoManager, IUndoRedoChange } from "./undoredomanager";
import "./components/creator.scss";
import "./components/string-editor.scss";
import { ICreatorSelectionOwner } from "./selection-owner";
import { PagesController } from "./pages-controller";
import { SelectionHistory } from "./selection-history";

import { TabEmbedPlugin } from "./components/tabs/embed";
import { TabJsonEditorAcePlugin } from "./components/tabs/json-editor-ace";
import { TabJsonEditorTextareaPlugin } from "./components/tabs/json-editor-textarea";
import { TabTestPlugin } from "./components/tabs/test";
import { SurveyLogic } from "./components/tabs/logic";
import { TabTranslationPlugin } from "./components/tabs/translation";
import { TabLogicPlugin } from "./components/tabs/logic-ui";
import { surveyDesignerCss } from "./survey-designer-theme/survey-designer";
import { TabDesignerPlugin } from "./entries";

export interface ICreatorOptions {
  [index: string]: any;
}

export interface ICreatorPlugin {
  activate: () => void;
  deactivate?: () => boolean;
  designerSurveyCreated?: () => void;
  createActions?: (items: Array<Action>) => void;
}

export interface ITabbedMenuItem extends IActionBarItem {
  componentContent: string;
  renderTab?: () => any;
}

export class CreatorToolbarItems extends Base {
  @propertyArray() items: Array<IActionBarItem>;
}

/**
 * Base class for Survey Creator.
 */
export class CreatorBase<T extends SurveyModel>
  extends Survey.Base
  implements ISurveyCreatorOptions, ICreatorSelectionOwner
{
  /**
   * Set it to true to show "JSON Editor" tab and to false to hide the tab
   */
  @property({ defaultValue: false }) showDesignerTab: boolean;
  /**
   * Set it to true to show "JSON Editor" tab and to false to hide the tab
   */
  @property({ defaultValue: false }) showJSONEditorTab: boolean;
  /**
   * Set it to true to show "Test Survey" tab and to false to hide the tab
   */
  @property({ defaultValue: false }) showTestSurveyTab: boolean;
  /**
   * Set it to true to show "Embed Survey" tab and to false to hide the tab
   */
  @property({ defaultValue: false }) showEmbeddedSurveyTab: boolean;
  /**
   * Set it to true to show "Translation" tab and to false to hide the tab
   */
  @property({ defaultValue: false }) showTranslationTab: boolean;
  /**
   * Set it to true to show "Logic" tab and to false to hide the tab
   */
  @property({ defaultValue: false }) showLogicTab: boolean;
  /**
   * You have right to set this property to true if you have bought the commercial licence only.
   * It will remove the text about non-commerical usage on the top of the widget.
   * Setting this property true without having a commercial licence is illegal.
   * @see haveCommercialLicense
   */
  @property({ defaultValue: false }) haveCommercialLicense: boolean;
  public get licenseText() {
    return this.getLocString("survey.license");
  }
  /**
   * A boolean property, false by default. Set it to true to call protected doSave method automatically on survey changing.
   */
  @property({ defaultValue: false }) isAutoSave: boolean;
  @property() showOptions: boolean;
  @property({ defaultValue: false }) showState: boolean;
  @property({ defaultValue: false }) showSearch: boolean;
  @property({ defaultValue: true }) generateValidJSON: boolean;
  @property({ defaultValue: "" }) currentAddQuestionType: string;
  private isRTLValue: boolean = false;
  private alwaySaveTextInPropertyEditorsValue: boolean = false;
  private toolbarValue: AdaptiveActionContainer;

  private pageEditModeValue: "standard" | "single" = "standard";
  /**
   * Set pageEditMode option to "single" to use creator in a single page mode. By default value is "standard".
   * You can set this option in creator constructor only
   */
  public get pageEditMode() {
    return this.pageEditModeValue;
  }

  @property() surveyValue: T;

  public get toolbarItems(): Array<Action> {
    return this.toolbarValue.actions;
  }
  public get toolbar(): AdaptiveActionContainer {
    return this.toolbarValue;
  }
  public dragDropHelper: DragDropHelper;

  private selectedElementValue: Base;
  private newQuestions: Array<any> = [];
  private newPanels: Array<any> = [];
  private newQuestionChangedNames: {};
  private undoRedoManagerValue: UndoRedoManager;
  private pagesControllerValue: PagesController;
  private selectionHistoryControllerValue: SelectionHistory;

  private saveSurveyFuncValue: (
    no: number,
    onSaveCallback: (no: number, isSuccess: boolean) => void
  ) => void;

  @property() viewType: string;

  /**
   * Returns the current show view name. The possible returns values are:
   * "designer", "editor", "test", "embed", "logic" and "translation".
   * @see showDesigner
   * @see showTestSurvey
   * @see showJsonEditor
   * @see showLogicEditor
   * @see showTranslationEditor
   * @see showEmbedEditor
   */
  public get showingViewName(): string {
    return this.viewType;
  }
  public get isDesignerShowing(): boolean {
    return this.viewType === "designer";
  }
  public showDesigner() {
    this.viewType = "designer";
  }
  public get isTestSurveyShowing(): boolean {
    return this.viewType === "test";
  }
  public showTestSurvey() {
    this.viewType = "test";
  }

  protected plugins: { [name: string]: ICreatorPlugin } = {};
  public addPluginTab(
    name: string,
    plugin: ICreatorPlugin,
    title?: string,
    componentContent?: string,
    index?: number
  ) {
    var tab = {
      id: name,
      title: !!title ? title : editorLocalization.getString("ed." + name),
      componentContent: componentContent ? componentContent : "svc-tab-" + name,
      data: plugin,
      action: () => this.makeNewViewActive(name),
      active: () => this.viewType === name
    };
    if (index >= 0 && index < this.tabs.length) {
      this.tabs.splice(index, 0, tab);
    } else {
      this.tabs.push(tab);
    }
    this.addPlugin(name, plugin);
  }
  public addPlugin(name: string, plugin: ICreatorPlugin) {
    this.plugins[name] = plugin;
  }
  public getPlugin(name: string): ICreatorPlugin {
    {
      return this.plugins[name];
    }
  }

  /**
   * The event is called on deleting an element (question/panel/page) from the survey. Typically, when a user click the delete from the element menu.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.element an instance of the deleting element
   * <br/> options.elementType the type of the element: 'question', 'panel' or 'page'.
   * <br/> options.allowing set it to false to cancel the element deleting
   */
  public onElementDeleting: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();

  /**
   * The event is called on setting a readOnly property of the property editor. By default the property.readOnly property is used.
   * You may changed it and make the property editor read only or enabled for a particular object.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties.
   * <br/> options.readOnly a boolean value. It has value equals to options.readOnly property by default. You may change it.
   * <br/> options.parentObj the parent object. It is null for non-nested properties. It is not null for itemvalue or column objects. The parent object is a question (dropdown, radigroup, checkbox, matrices and so on).
   * <br/> options.parentProperty the parent property (Survey.JsonObjectProperty object). It is null for non-nested properties. It is not null for itemvalue or column objects. The parent object is choices, columns, rows, triggers and so on.
   */
  public onGetPropertyReadOnly: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();

  /**
   * The event is fired when the survey creator creates a survey object (Survey.Survey).
   * <br/> sender the survey creator object that fires the event
   * <br/> options.survey the survey object showing in the creator.
   * <br/> options.reason indicates what component of the creator requests the survey. There are several reason types: "designer" - survey for designer survey, "test" - survey for "Test Survey" tab and "conditionEditor", "defaultValueEditor", "restfulEditor" - surveys for different property editors.
   */
  public onSurveyInstanceCreated: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();

  /**
   * The event allows to display the custom name for objects: questions, pages and panels. By default the object name is using. You may show object title by setting showObjectTitles property to true.
   * Use this event, if you want custom display name for objects.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.reason the name of the UI that requests the object display name
   * <br/> options.displayName change this property to show your custom display name for the object
   * @see showObjectTitles
   */
  public onGetObjectDisplayName: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();

  /**
   * Use this event to add/remove/modify the element (question/panel) menu items.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object which property is edited in the Property Editor.
   * <br/> options.items the list of menu items. It has two required fields: text and onClick: function(obj: Survey.Base) {} and optional name field.
   * @see onElementAllowOperations
   */
  public onDefineElementMenuItems: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called before showing a property in the Properties Grid or in the Question Editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties.
   * <br/> options.canShow a boolean value. It is true by default. Set it false to hide the property from the Properties Grid and in the Question Editor.
   * <br/> options.parentObj the parent object. It is null for non-nested properties. It is not null for itemvalue or column objects. The parent object is a question (dropdown, radigroup, checkbox, matrices and so on).
   * <br/> options.parentProperty the parent property (Survey.JsonObjectProperty object). It is null for non-nested properties. It is not null for itemvalue or column objects. The parent object is choices, columns, rows, triggers and so on.
   * <br/>
   * <br/> [Example: Hide a category in the Properties Grid](https://surveyjs.io/Examples/Survey-Creator?id=hidecategoryinpropertiesgrid)
   */
  public onShowingProperty: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * @Deprecated Obsolete, please use onShowingProperty event.
   * The event is called before showing a property in the Property Grid or in Question Editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object, Survey, Page, Panel or Question
   * <br/> options.property the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties.
   * <br/> options.canShow a boolean value. It is true by default. Set it false to hide the property from the Property Grid or in Question Editor
   * <br/> options.parentObj the parent object. It is null for non-nested properties. It is not null for itemvalue or column objects. The parent object is a question (dropdown, radigroup, checkbox, matrices and so on).
   * <br/> options.parentProperty the parent property (Survey.JsonObjectProperty object). It is null for non-nested properties. It is not null for itemvalue or column objects. The parent object is choices, columns, rows, triggers and so on.
   */
  public onCanShowProperty: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = this.onShowingProperty;
  /**
   * The event is called before rendering a delete button in the Property Grid or in Question Editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey Question
   * <br/> options.item the object property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties
   * <br/> options.canDelete a boolean value. It is true by default. Set it false to remove delete button from the Property Grid or in Question Editor
   */
  public onCanDeleteItem: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on deleting a collection item from the Property Editor. For example: column in columns editor or item in choices and so on.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object: Question, Panel, Page or Survey
   * <br/> options.property the collection property (Survey.JsonObjectProperty object). It has name, className, type, visible, readOnly and other properties
   * <br/> options.propertyName the collection property name
   * <br/> options.collection the editing collection where deleting item is located. It is can be columns in the matrices or choices in dropdown question and so on.
   * <br/> options.item the collection item that we are going to delete
   * <br/> options.allowDelete a boolean value. It is true by default. Set it false to abondome the element removing from the collection
   */
  public onCollectionItemDeleting: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on adding a new Survey.ItemValue object. It uses as an element in choices array in Radiogroup, checkbox and dropdown questions or Matrix columns and rows properties.
   * Use this event, to set ItemValue.value and ItemValue.text properties by default or set a value to the custom property.
   * <br/> sender the survey creator object that fires the event
   * <br /> options.obj the object that contains the itemsValues array, for example selector, rating and single choice matrix questions.
   * <br/> options.propertyName  the object property Name. It can be "choices" for selector questions or rateValues for rating question or columns/rows for single choice matrix.
   * <br/> options.newItem a new created Survey.ItemValue object.
   * <br/> options.itemValues an editing Survey.ItemValue array. newItem object is not added yet into this array.
   */
  public onItemValueAdded: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called when a user adds a new column into MatrixDropdown or MatrixDynamic questions. Use it to set some properties of Survey.MatrixDropdownColumn by default, for example name or a custom property.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.matrix a matrix question where column is located, matrix.columns.
   * <br/> options.newColumn a new created Survey.MatrixDropdownColumn object.
   * <br/> options.columns editable columns objects. They can be different from options.matrix.columns. options.columns and options.matrix.columns are equal after user press Apply or Cancel and options.columns will be set to options.matrix.columns or reset to initial state.
   */
  public onMatrixColumnAdded: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * Use this event to control Property Editors UI.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editorOptions  options that can be changed.
   * <br/> options.editorOptions.allowAddRemoveItems a boolean property, true by default. Set it false to disable add/remove items in array properties. For example 'choices', 'columns', 'rows'.
   * <br/> options.editorOptions.allowRemoveAllItems a boolean property, true by default. Set it false to disable remove all items in array properties. For example 'choices', 'columns', 'rows'.
   * <br/> options.editorOptions.showTextView a boolean property, true by default. Set it false to disable "Fast Entry" tab for "choices" property.
   * <br/> options.editorOptions.itemsEntryType a string property, 'form' by default. Set it 'fast' to show "Fast Entry" tab for "choices" property by default.
   */
  public onSetPropertyEditorOptions: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on generation a new name for a new created element.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.element a new created survey element. It can be question, panel or page
   * <br/> options.name a new suggested name, that is unique for the current survey. You can suggest your own name. If it is unique, creator will assign it to the element.
   * <br/> options.isUnique a boolean property, set this property to false, if you want to ask Creator to generate another name
   */
  public onGenerateNewName: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * Use this event to show a custom error in the Question Editor on pressing Apply or OK buttons, if the values are not set correctly. The error will be displayed under the property editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.value the property value.
   * <br/> options.error the error you want to display. Set the empty string (the default value) or null if there is no errors.
   * @see onPropertyValueChanging
   */
  public onPropertyValidationCustomError: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * Use this event to change the value entered in the property editor. You may call a validation, so an end user sees the error immediately
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.value the property value.
   * <br/> options.newValue set the corrected value into this property. Leave it null if you are ok with the entered value.
   * <br/> options.doValidation set the value to true to call the property validation. If there is an error, the user sees it immediately.
   * @see onPropertyValidationCustomError
   */
  public onPropertyValueChanging: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * Use this event to modify the list (name and titles) of the questions available in a condition editor.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.obj the survey object which property is edited in the Property Editor.
   * <br/> options.propertyName  the name of the edited property.
   * <br/> options.editor the instance of Property Editor.
   * <br/> options.list the list of the questions available for condition
   */
  public onConditionQuestionsGetList: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called when a survey is changed in the designer. A new page/question/page is added or existing is removed, a property is changed and so on.
   * <br/> sender the survey creator object that fires the event
   * <br/> options object contains the information about certain modifications
   * <br/> options.type contains string constant describing certain modification
   * <br/> Available values:
   * <br/>
   * <br/> options.type: "ADDED_FROM_TOOLBOX"
   * <br/> options.question: newly added question
   * <br/>
   * <br/> options.type: "PAGE_ADDED"
   * <br/> options.newValue: newly created page
   * <br/>
   * <br/> options.type: "PAGE_MOVED"
   * <br/> options.page: page has been moved
   * <br/> options.indexFrom: pevious index
   * <br/> options.indexTo: new index
   * <br/>
   * <br/> options.type: "QUESTION_CONVERTED"
   * <br/> options.className: the converted class name
   * <br/> options.oldValue: pevious object
   * <br/> options.newValue: the new object, converted from oldVale to the given class name
   * <br/>
   * <br/> options.type: "QUESTION_CHANGED_BY_EDITOR"
   * <br/> options.question: question has been edited in the popup question editor
   * <br/>
   * <br/> options.type: "PROPERTY_CHANGED"
   * <br/> options.name: the name of the property has been changed
   * <br/> options.target: the object containing the changed property
   * <br/> options.oldValue: the previous value of the changed property
   * <br/> options.newValue: the new value of the changed property
   * <br/>
   * <br/> options.type: "OBJECT_DELETED"
   * <br/> options.target: deleted object
   * <br/>
   * <br/> options.type: "VIEW_TYPE_CHANGED"
   * <br/> options.newType: new type of the creator view: editor or designer
   * <br/>
   * <br/> options.type: "DO_DROP"
   * <br/> options.page: the page of the drap/drop operation
   * <br/> options.source: the source dragged object
   * <br/> options.target: the drop target
   * <br/> options.newElement: a new element. It is defined if a user drops question or panel from the toolbox
   * <br/>
   * <br/> options.type: "TRANSLATIONS_CHANGED"
   */
  public onModified: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on adding a new question into the survey. Typically, when a user dropped a Question from the Question Toolbox into designer Survey area.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.question a new added survey question. Survey.Question object
   * <br/> options.page the survey Page object where question has been added.
   */
  public onQuestionAdded: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on adding a new panel into the survey.  Typically, when a user dropped a Panel from the Question Toolbox into designer Survey area.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.panel a new added survey panel. Survey.Panel object
   * <br/> options.page the survey Page object where question has been added.
   */
  public onPanelAdded: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on adding a new page into the survey.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.page the new survey Page object.
   */
  public onPageAdded: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is fired when the survey creator is initialized and a survey object (Survey.Survey) is created.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.survey  the survey object showing in the creator.
   */
  public onDesignerSurveyCreated: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is fired when the survey creator runs the survey in the test mode.
   * <br/> sender the survey creator object that fires the event
   * <br/> options.survey  the survey object showing in the "Test survey" tab.
   */
  public onTestSurveyCreated: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called in case of UI notifications. By default all notifications are done via built-in alert () function.
   * In case of any subscriptions to this event all notifications will be redirected into the event handler.
   * <br/> options.message is a message to show.
   */
  public onNotify: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called before undo happens.
   * <br/> options.canUndo a boolean value. It is true by default. Set it false to hide prevent undo operation.
   */
  public onBeforeUndo: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called before redo happens.
   * <br/> options.canRedo a boolean value. It is true by default. Set it false to hide prevent redo operation.
   */
  public onBeforeRedo: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called after undo happens.
   * <br/> options.state is an undo/redo item.
   */
  public onAfterUndo: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called after redo happens.
   * <br/> options.state is an undo/redo item.
   */
  public onAfterRedo: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called on changing the selected element. You may change the new selected element by changing the property options.newSelectedElement to your own
   * <br/> options.newSelectedElement the element that is going to be selected in the survey desiger: question, panel, page or survey.
   */
  public onSelectedElementChanging: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is called after the selected element is changed.
   * <br/> options.newSelectedElement the new selected element in the survey desiger: question, panel, page or survey.
   */
  public onSelectedElementChanged: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is fired then one need to choose files.
   * <br/> sender the survey creator object that fires the event
   * <br/> input file input HTML element
   * <br/> callback need to be called after files has been chosen
   * @see uploadFile
   */
  public onOpenFileChooser: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * The event is fired on uploading the files.
   * <br/> sender the survey creator object that fires the event
   * <br/> There are two properties in options:
   * <br/> files the Javascript File objects array
   * <br/> callback called on upload complete
   * @see uploadFile
   */
  public onUploadFile: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * This callback is used internally for providing survey JSON text.
   */
  public getSurveyJSONTextCallback: () => { text: string; isModified: boolean };
  /**
   * This callback is used internally for setting survey JSON text.
   */
  public setSurveyJSONTextCallback: (text: string) => void;

  /**
   * You need to set this property to true if you want to use tabs instead of accordion in the popup element's editor.
   */
  public useTabsInElementEditor = false;
  /**
   * You need to set this property to value bigger than 0 to disable adding more logic items in condition than this value.
   */
  public maxLogicItemsInCondition: number = -1;

  /**
   * You need to set this property to true if you want to show titles instead of names in pages editor and object selector.
   * @see onShowObjectDisplayName
   */
  public showObjectTitles = false;

  /**
   * You need to set this property to true if you want to show titles instead of names in expression editor.
   */
  public showTitlesInExpressions = false;
  /**
   * You need to set this property to false to allow your users build expressions visually only, without editing them in text editor.
   */
  public allowEditExpressionsInTextEditor = true;

  /**
   * You need to set this property to number more than 0 to limit the number of columns that users can create for matrix dynamic/matrix dropdown questions.
   */
  public maximumColumnsCount = 0;

  /**
   * Set this property to false to hide the pages selector in the Test Survey Tab
   */
  public showPagesInTestSurveyTab = true;

  /**
   * Set this property to false to hide the device simulator in the Test Survey Tab
   */
  public showSimulatorInTestSurveyTab = true;

  /**
   * Set this property to false to disable pages adding, editing and deleting
   */
  public allowModifyPages = true;

  /**
   * The default value is _"auto"_. It shows the language selector if there are more than two languages are using in the survey.
   * It shows only used languages in the survey.
   * Set this property to _false_ to hide the default language selector in the Test Survey Tab.
   * Set it to _true_ to show this selector even if there is only one language in the survey
   * Set it to _all_ to show the selector with all available languages (30+)
   */
  public showDefaultLanguageInTestSurveyTab: boolean | string = "auto";

  /**
   * Set this property to false to hide the show invisible element checkbox in the Test Survey Tab
   */
  public showInvisibleElementsInTestSurveyTab = true;

  /**
   * Set this property to true if you want to show "page selector" in the toolabar instead of "pages editor"
   */
  public showPageSelectorInToolbar = false;

  @propertyArray() tabs: Array<ITabbedMenuItem>;

  /**
   * Returns the localized string by its id
   * @param str the string id.
   */
  public getLocString(str: string) {
    return editorLocalization.getString(str);
  }

  /**
   * Set it to false to suppress an alert message about error on saving the survey into database.
   */
  public showErrorOnFailedSave: boolean = true;

  protected onSetReadOnly(newVal: boolean) {}

  /**
   * A boolean property, false by default. Set it to true to deny editing.
   */
  public get readOnly() {
    return this.getPropertyValue("readOnly", false);
    //return this.koReadOnly();
  }
  public set readOnly(newVal: boolean) {
    const text = this.text;
    this.setPropertyValue("readOnly", newVal);
    this.onSetReadOnly(newVal);
    this.text = text;
  }

  /**
   * Set it to true to activate RTL support
   */
  public get isRTL() {
    return this.isRTLValue;
  }
  public set isRTL(value: boolean) {
    this.isRTLValue = value;
  }
  /**
   * Get/set the active tab.
   * The following values are available: "designer", "editor", "test", "embed", "logic" and "translation".
   * Please note, not all tabs are visible.
   */
  public get activeTab(): string {
    return this.viewType;
  }
  public set activeTab(val: string) {
    this.makeNewViewActive(val);
  }
  /**
   * Change the active view/tab. It will return false if it can't change the current tab.
   * @param viewName name of new active view (tab). The following values are available: "designer", "editor", "test", "embed", "logic" and "translation".
   */
  public makeNewViewActive(viewName: string): boolean {
    if (viewName == this.viewType) return false;
    if (!this.canSwitchViewType()) return false;
    this.viewType = viewName;
    this.activatePlugin(viewName);
    return true;
  }
  private canSwitchViewType(): boolean {
    const plugin: ICreatorPlugin = this.currentPlugin;
    return !plugin || !plugin.deactivate || plugin.deactivate();
  }
  private activatePlugin(newType: string) {
    const plugin: ICreatorPlugin = this.currentPlugin;
    if (!!plugin) {
      plugin.activate();
    }
  }
  private get currentPlugin(): ICreatorPlugin {
    return this.plugins[this.viewType];
  }

  public static defaultNewSurveyText: string =
    '{ "pages": [ { "name": "page1"}] }';

  public toolbox: QuestionToolbox;
  public get toolboxCategories(): Array<any> {
    return this.toolbox.categories;
  }
  public propertyGrid: PropertyGridModel;

  constructor(protected options: ICreatorOptions, options2?: ICreatorOptions) {
    super();
    if (
      !!options2 ||
      typeof this.options === "string" ||
      this.options instanceof String
    ) {
      this.options = !!options2 ? options2 : {};
      SurveyHelper.warnText(
        "Creator constructor has one parameter, as creator options, in V2."
      );
    }
    this.toolbarValue = new AdaptiveActionContainer();
    this.pagesControllerValue = new PagesController(this);
    this.selectionHistoryControllerValue = new SelectionHistory(this);
    this.setOptions(this.options);
    this.patchMetadata();
    this.initTabs();
    this.initToolbar();
    this.initSurveyWithJSON(
      JSON.parse(CreatorBase.defaultNewSurveyText),
      false
    );
    this.toolbox = new QuestionToolbox(
      this.options && this.options.questionTypes
        ? this.options.questionTypes
        : null
    );
    this.initDragDrop();
    this.propertyGrid = new PropertyGridModel(this.survey as any as Base, this);
  }
  /**
   * Start: Obsolete properties and functins
   */
  public get showToolbox(): string {
    SurveyHelper.warnNonSupported("showToolbox");
    return undefined;
  }
  public set showToolbox(val: string) {
    SurveyHelper.warnNonSupported("showToolbox");
  }
  private showPropertyGridValue: boolean = true;
  public onShowPropertyGridVisiblityChanged: Survey.Event<
    (sender: CreatorBase<T>, options: any) => any,
    any
  > = new Survey.Event<(sender: CreatorBase<T>, options: any) => any, any>();
  /**
   * Set this this property grid false to hide the property grid.
   */
  public get showPropertyGrid(): boolean {
    return this.showPropertyGridValue;
  }
  public set showPropertyGrid(val: boolean) {
    if (<any>val !== true && <any>val !== false) {
      SurveyHelper.warnText(
        "showPropertyGrid propertry grid is a boolean property now."
      );
      return;
    }
    if (this.showPropertyGrid === val) return;
    this.showPropertyGridValue = val;
    this.onShowPropertyGridVisiblityChanged.fire(this, { show: val });
  }
  public rightContainerActiveItem(name: string) {
    SurveyHelper.warnNonSupported("rightContainerActiveItem");
  }
  public leftContainerActiveItem(name: string) {
    SurveyHelper.warnNonSupported("leftContainerActiveItem");
  }
  /**
   * End: Obsolete properties and functins
   */

  public get undoRedoManager(): UndoRedoManager {
    return this.undoRedoManagerValue;
  }
  public undo() {
    if (!this.undoRedoManager) return;
    var options = { canUndo: true };
    this.onBeforeUndo.fire(self, options);
    if (options.canUndo) {
      var item = this.undoRedoManager.undo();
      this.onAfterUndo.fire(self, { state: item });
      this.selectElementAfterUndo();
    }
  }
  public redo() {
    if (!this.undoRedoManager) return;
    const options = { canRedo: true };
    this.onBeforeRedo.fire(self, options);
    if (options.canRedo) {
      const item = this.undoRedoManager.redo();
      this.onAfterRedo.fire(self, { state: item });
      this.selectElementAfterUndo();
    }
  }
  private selectElementAfterUndo() {
    this.selectElementAfterUndoCore(this.selectedElement);
  }
  private selectElementAfterUndoCore(obj: Base) {
    if (
      !!obj &&
      !obj.isDisposed &&
      !!obj.getSurvey() &&
      (!this.isObjQuestion(obj) || !!obj["parent"])
    ) {
      this.selectElement(obj);
      return;
    }
    this.selectElement(this.survey);
  }
  public get pagesController(): PagesController {
    return this.pagesControllerValue;
  }
  public get selectionHistoryController(): SelectionHistory {
    return this.selectionHistoryControllerValue;
  }

  public get currentPage(): PageModel {
    return this.survey.currentPage;
  }
  public set currentPage(value: PageModel) {
    this.survey.currentPage = value;
  }
  public addPage(): PageModel {
    const name: string = SurveyHelper.getNewPageName(this.survey.pages);
    const page: PageModel = this.survey.addNewPage(name);
    this.selectElement(page);
    return page;
  }
  protected initTabs() {
    const tabs: Array<ITabbedMenuItem> = [];
    this.tabs = tabs;
    this.initTabsPlugin();
    if (this.tabs.length > 0) {
      this.makeNewViewActive(this.tabs[0].id);
    }
  }
  private initTabsPlugin(): void {
    if (this.showDesignerTab) {
      new TabDesignerPlugin<T>(this);
    }
    if (this.showTestSurveyTab) {
      new TabTestPlugin(this);
    }
    if (this.showLogicTab) {
      new TabLogicPlugin(this);
    }
    if (this.showJSONEditorTab) {
      if (TabJsonEditorAcePlugin.hasAceEditor()) {
        new TabJsonEditorAcePlugin(this);
      } else {
        new TabJsonEditorTextareaPlugin(this);
      }
    }
    if (this.showTranslationTab) {
      new TabTranslationPlugin(this);
    }
    if (this.showEmbeddedSurveyTab) {
      new TabEmbedPlugin(this);
    }
  }
  private initToolbar() {
    const items: Array<Action> = [];
    for (var key in this.plugins) {
      if (!!this.plugins[key].createActions) {
        this.plugins[key].createActions(items);
      }
    }
    this.toolbarValue.actions = items;
  }

  public getOptions() {
    return this.options || {};
  }

  protected setOptions(options: any): void {
    if (!options) options = {};
    if (!options.hasOwnProperty("generateValidJSON"))
      options.generateValidJSON = true;
    this.options = options;
    this.showDesignerTab =
      typeof options.showDesignerTab !== "undefined"
        ? options.showDesignerTab
        : true;
    this.showLogicTab =
      typeof options.showLogicTab !== "undefined"
        ? options.showLogicTab
        : false;
    this.showJSONEditorTab =
      typeof options.showJSONEditorTab !== "undefined"
        ? options.showJSONEditorTab
        : true;
    this.showTestSurveyTab =
      typeof options.showTestSurveyTab !== "undefined"
        ? options.showTestSurveyTab
        : true;
    this.showEmbeddedSurveyTab =
      typeof options.showEmbeddedSurveyTab !== "undefined"
        ? options.showEmbeddedSurveyTab
        : false;
    this.showTranslationTab =
      typeof options.showTranslationTab !== "undefined"
        ? options.showTranslationTab
        : false;
    this.showLogicTab =
      typeof options.showLogicTab !== "undefined"
        ? options.showLogicTab
        : false;

    this.haveCommercialLicense =
      typeof options.haveCommercialLicense !== "undefined"
        ? options.haveCommercialLicense
        : false;

    this.showObjectTitles =
      typeof options.showObjectTitles !== "undefined"
        ? options.showObjectTitles
        : false;
    this.showTitlesInExpressions =
      typeof options.showTitlesInExpressions !== "undefined"
        ? options.showTitlesInExpressions
        : false;
    this.allowEditExpressionsInTextEditor =
      typeof options.allowEditExpressionsInTextEditor !== "undefined"
        ? options.allowEditExpressionsInTextEditor
        : true;
    if (typeof options.maximumColumnsCount !== "undefined") {
      this.maximumColumnsCount = options.maximumColumnsCount;
    }
    this.useTabsInElementEditor =
      typeof options.useTabsInElementEditor !== "undefined"
        ? options.useTabsInElementEditor
        : false;
    this.maxLogicItemsInCondition =
      typeof options.maxLogicItemsInCondition !== "undefined"
        ? options.maxLogicItemsInCondition
        : -1;
    this.showState =
      typeof options.showState !== "undefined" ? options.showState : false;
    this.showOptions =
      typeof options.showOptions !== "undefined" ? options.showOptions : false;

    this.generateValidJSON = this.options.generateValidJSON;
    this.isAutoSave =
      typeof options.isAutoSave !== "undefined" ? options.isAutoSave : false;
    this.showErrorOnFailedSave =
      typeof options.showErrorOnFailedSave !== "undefined"
        ? options.showErrorOnFailedSave
        : true;
    this.isRTLValue =
      typeof options.isRTL !== "undefined" ? options.isRTL : false;

    if (typeof options.readOnly !== "undefined") {
      this.readOnly = options.readOnly;
    }
    if (typeof options.showPagesInTestSurveyTab !== "undefined") {
      this.showPagesInTestSurveyTab = options.showPagesInTestSurveyTab;
    }
    if (typeof options.showSimulatorInTestSurveyTab !== "undefined") {
      this.showSimulatorInTestSurveyTab = options.showSimulatorInTestSurveyTab;
    }
    if (typeof options.showDefaultLanguageInTestSurveyTab !== "undefined") {
      this.showDefaultLanguageInTestSurveyTab =
        options.showDefaultLanguageInTestSurveyTab;
    }
    if (typeof options.showInvisibleElementsInTestSurveyTab !== "undefined") {
      this.showInvisibleElementsInTestSurveyTab =
        options.showInvisibleElementsInTestSurveyTab;
    }
    if (typeof options.allowModifyPages !== "undefined") {
      this.allowModifyPages = options.allowModifyPages;
    }
    if (typeof options.pageEditMode !== "undefined") {
      this.pageEditModeValue = options.pageEditMode;
      if (this.pageEditModeValue === "single") {
        Survey.Serializer.findProperty("survey", "pages").visible = false;
        Survey.Serializer.findProperty("question", "page").visible = false;
        Survey.Serializer.findProperty("panel", "page").visible = false;
        this.showJSONEditorTab = false;
      }
    }
  }

  private patchMetadata(): void {
    Serializer.findProperty("survey", "title").placeholder =
      "pe.surveyTitlePlaceholder";
    Serializer.findProperty("survey", "description").placeholder =
      "pe.surveyDescriptionPlaceholder";
    const logoPosition: Survey.JsonObjectProperty = Serializer.findProperty(
      "survey",
      "logoPosition"
    );
    logoPosition.defaultValue = "right";
    logoPosition.isSerializable = false;
    logoPosition.visible = false;
    Serializer.findProperty("page", "title").placeholder =
      "pe.pageTitlePlaceholder";
    Serializer.findProperty("page", "description").placeholder =
      "pe.pageDescriptionPlaceholder";
  }

  isCanModifyProperty(obj: Survey.Base, propertyName: string): boolean {
    const property: Survey.JsonObjectProperty = Survey.Serializer.findProperty(
      obj.getType(),
      propertyName
    );
    return (
      !property ||
      !this.onIsPropertyReadOnlyCallback(
        obj,
        property,
        property.readOnly,
        undefined,
        undefined
      )
    );
  }

  onIsPropertyReadOnlyCallback(
    obj: Survey.Base,
    property: Survey.JsonObjectProperty,
    readOnly: boolean,
    parentObj: Survey.Base,
    parentProperty: Survey.JsonObjectProperty
  ): boolean {
    var proposedValue = this.readOnly || readOnly;
    if (this.onGetPropertyReadOnly.isEmpty) return proposedValue;
    var options = {
      obj: obj,
      property: property,
      readOnly: proposedValue,
      propertyName: property.name,
      parentObj: parentObj,
      parentProperty: parentProperty
    };
    this.onGetPropertyReadOnly.fire(this, options);
    return options.readOnly;
  }

  /**
   * The editing survey object (Survey.Survey)
   */
  public get survey(): T {
    return this.surveyValue;
  }
  private existingPages: {};
  protected initSurveyWithJSON(json: any, clearState: boolean) {
    this.existingPages = {};
    const survey = this.createSurvey({});
    survey.css = surveyDesignerCss;
    survey.setDesignMode(true);
    survey.lazyRendering = true;
    survey.setJsonObject(json);
    if (survey.isEmpty) {
      survey.setJsonObject(this.getDefaultSurveyJson());
    }
    survey.pages.forEach((page: PageModel) => {
      this.existingPages[page.id] = true;
    });
    this.onDesignerSurveyCreated.fire(this, { survey: survey });
    // this.survey.render(this.surveyjs);
    /*
    survey.onSelectedElementChanged.add((sender: SurveyModel, options) => {
      if (this.disableSurveySelectedElementChanging) return;
      this.selectedElement = sender["selectedElement"];
    });
    */
    survey.onQuestionAdded.add((sender: SurveyModel, options) => {
      this.doOnQuestionAdded(options.question, options.parentPanel);
    });
    survey.onPanelAdded.add((sender: SurveyModel, options) => {
      this.doOnPanelAdded(options.panel, options.parentPanel);
    });
    survey.onPageAdded.add((sender: SurveyModel, options) => {
      if (!!this.existingPages[options.page.id]) return;
      this.existingPages[options.page.id] = true;
      this.doOnPageAdded(options.page);
    });
    /*
    survey.onPanelRemoved.add((sender: SurveyModel, options) => {
      this.doOnElementRemoved(options.panel);
    });
    survey.onQuestionRemoved.add((sender: SurveyModel, options) => {
      this.doOnElementRemoved(options.question);
    });
    */
    this.undoRedoManagerValue = new UndoRedoManager();
    this.setSurvey(survey);
    var plugin = this.plugins["designer"];
    if (!!plugin && !!plugin.designerSurveyCreated) {
      plugin.designerSurveyCreated();
    }
    survey.onPropertyValueChangedCallback = (
      name: string,
      oldValue: any,
      newValue: any,
      sender: Survey.Base,
      arrayChanges: Survey.ArrayChanges
    ) => {
      this.onSurveyPropertyValueChangedCallback(
        name,
        oldValue,
        newValue,
        sender,
        arrayChanges
      );
    };
    this.undoRedoManager.changesFinishedCallback = (
      changes: IUndoRedoChange
    ) => {
      this.setModified({
        type: "PROPERTY_CHANGED",
        name: changes.propertyName,
        target: changes.object,
        oldValue: changes.oldValue,
        newValue: changes.newValue
      });
    };
  }
  protected initDragDrop() {
    this.dragDropHelper = new DragDropHelper(null, this);

    this.dragDropHelper.onBeforeDrop.add((sender, options) => {
      this.undoRedoManager.startTransaction("drag drop");
    });

    this.dragDropHelper.onAfterDrop.add((sender, options) => {
      this.undoRedoManager.stopTransaction();
      this.selectElement(options.draggedElement);
    });
  }
  private addingObject: Survey.Base;
  private onSurveyPropertyValueChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    sender: Survey.Base,
    arrayChanges: Survey.ArrayChanges
  ) {
    if (
      this.addingObject == sender ||
      !this.undoRedoManager ||
      !this.undoRedoManager.isCorrectProperty(sender, name)
    )
      return;
    this.undoRedoManager.startTransaction(name + " changed");
    this.undoRedoManager.onPropertyValueChanged(
      name,
      oldValue,
      newValue,
      sender,
      arrayChanges
    );
    this.updatePagesController(sender, name);
    this.updateConditionsOnQuestionNameChanged(sender, name, oldValue);
    this.undoRedoManager.stopTransaction();
  }
  private updateConditionsOnQuestionNameChanged(
    obj: Survey.Base,
    propertyName: string,
    oldValue: any
  ) {
    if (!this.isObjQuestion(obj)) return;
    if (propertyName === "name" && !obj["valueName"]) {
      this.updateConditions(oldValue, obj["name"]);
    }
    if (propertyName === "valueName") {
      var oldName = !!oldValue ? oldValue : obj["name"];
      var newName = !!obj["valueName"] ? obj["valueName"] : obj["name"];
      this.updateConditions(oldName, newName);
    }
  }
  private updatePagesController(sender: Survey.Base, name: string) {
    if ((name == "name" || name == "title") && this.isObjPage(sender)) {
      this.pagesController.pageNameChanged(<PageModel>sender);
    }
  }
  private updateConditions(oldName: string, newName: string) {
    if (oldName === newName) return;
    new SurveyLogic(this.survey, this).renameQuestion(oldName, newName);
  }

  private isObjQuestion(obj: Survey.Base) {
    return this.isObjThisType(obj, "question");
  }
  public isObjPage(obj: Survey.Base) {
    return this.isObjThisType(obj, "page");
  }
  private isObjThisType(obj: Survey.Base, typeName: string) {
    var classInfo = Survey.Serializer.findClass(obj.getType());

    while (!!classInfo && !!classInfo.parentName) {
      if (classInfo.name === typeName) return true;
      classInfo = Survey.Serializer.findClass(classInfo.parentName);
    }
    return !!classInfo && classInfo.name === typeName;
  }

  private doOnQuestionAdded(question: Question, parentPanel: any) {
    question.name = this.generateUniqueName(question, question.name);
    var page = this.getPageByElement(question);
    var options = { question: question, page: page };
    this.addingObject = question;
    this.onQuestionAdded.fire(this, options);
    this.addingObject = null;
    /*
    if (parentPanel.elements.indexOf(question) !== -1) {
      this.surveyObjects.addElement(question, parentPanel);
    }
    */
  }
  private doOnPanelAdded(panel: PanelModel, parentPanel: any) {
    var page = this.getPageByElement(panel);
    var options = { panel: panel, page: page };
    this.addingObject = panel;
    this.onPanelAdded.fire(this, options);
    this.addingObject = null;
    /*
    if (parentPanel.elements.indexOf(panel) !== -1) {
      this.surveyObjects.addElement(panel, parentPanel);
    }
    */
  }
  private doOnPageAdded(page: PageModel) {
    var options = { page: page };
    this.addingObject = page;
    this.onPageAdded.fire(this, options);
    this.addingObject = null;
    this.setModified({ type: "PAGE_ADDED", newValue: options.page });
  }
  private getPageByElement(obj: Base): PageModel {
    return this.survey.getPageByElement(<IElement>(<any>obj));
  }

  private getDefaultSurveyJson(): any {
    var json = settings.defaultNewSurveyJSON;
    if (
      json["pages"] &&
      json["pages"]["length"] > 0 &&
      json["pages"][0]["name"]
    ) {
      json["pages"][0]["name"] =
        editorLocalization.getString("ed.newPageName") + "1";
    }
    return json;
  }

  protected setSurvey(survey: T) {
    if (!!this.surveyValue) {
      this.surveyValue.dispose();
    }
    this.surveyValue = survey;
    this.selectElement(survey);
    this.pagesController.onSurveyChanged();
    this.selectionHistoryController.reset();
  }

  private getSurveyTextFromDesigner() {
    var json = (<any>this.survey).toJSON();
    if (this.options && this.options.generateValidJSON) {
      return JSON.stringify(json, null, 1);
    }
    return new SurveyJSON5().stringify(json, null, 1);
  }

  protected setTextValue(value: string) {
    if (!!this.setSurveyJSONTextCallback) {
      this.setSurveyJSONTextCallback(value);
    }
  }

  /**
   * Set JSON as text  into survey. Clear undo/redo states optionally.
   * @param value JSON as text
   * @param clearState default false. Set this parameter to true to clear undo/redo states.
   */
  public changeText(value: string, clearState = false) {
    this.setTextValue(value);
    var textWorker = new SurveyTextWorker(value);
    if (textWorker.isJsonCorrect) {
      this.initSurveyWithJSON(textWorker.survey.toJSON(), clearState);
    } else {
      this.viewType = "editor";
    }
  }

  /**
   * The Survey JSON as a text. Use it to get Survey JSON or change it.
   * @see JSON
   */
  public get text(): string {
    if (!!this.getSurveyJSONTextCallback) {
      return this.getSurveyJSONTextCallback().text;
    }
    return this.getSurveyTextFromDesigner();
  }
  public set text(value: string) {
    this.changeText(value, true);
  }

  public getSurveyJSON(): any {
    if (this.viewType != "editor") {
      return new Survey.JsonObject().toJsonObject(this.survey);
    }
    var surveyJsonText = this.text;
    var textWorker = new SurveyTextWorker(surveyJsonText);
    if (textWorker.isJsonCorrect) {
      return new Survey.JsonObject().toJsonObject(textWorker.survey);
    }
    return null;
  }

  public getObjectDisplayName(
    obj: Survey.Base,
    reason: string = undefined,
    displayName: string = undefined
  ): string {
    if (!displayName) {
      displayName = SurveyHelper.getObjectName(obj, this.showObjectTitles);
    }
    var options = { obj: obj, displayName: displayName, reason: reason };
    this.onGetObjectDisplayName.fire(this, options);
    return options.displayName;
  }

  public createSurvey(json: any = {}, reason: string = "designer"): T {
    const survey: T = this.createSurveyCore(json, reason); // new surveyType(json);
    if (reason != "designer" && reason != "test") {
      (<any>survey).locale = editorLocalization.currentLocale;
    }
    this.onSurveyInstanceCreated.fire(this, { survey: survey, reason: reason });
    return survey;
  }
  protected createSurveyCore(json: any = {}, reason: string): T {
    throw new Error("createSurveyCore method should be overridden/implemented");
  }
  /**
   * Returns the creator state. It may return empty string or "saving" and "saved".
   */
  public get state(): string {
    return this.getPropertyValue("state");
  }
  protected setState(value: string) {
    this.setPropertyValue("state", value);
  }

  public setModified(options: any = null) {
    this.setState("modified");
    this.onModified.fire(this, options);
    this.isAutoSave && this.doAutoSave();
  }
  /**
   * This function triggers user notification (via the alert() function if no onNotify event handler added).
   * @see onNotify
   */
  public notify(msg: string) {
    if (this.onNotify.isEmpty) {
      alert(msg);
    } else {
      this.onNotify.fire(this, { message: msg });
    }
  }

  protected convertQuestion(obj: Survey.Question, className: string) {
    var newQuestion = QuestionConverter.convertObject(obj, className);
    this.setModified({
      type: "QUESTION_CONVERTED",
      className: className,
      oldValue: obj,
      newValue: newQuestion
    });
    return newQuestion;
  }

  /**
   * The Survey JSON. Use it to get Survey JSON or change it.
   * @see text
   */
  public get JSON(): any {
    return (<any>this.survey).toJSON();
  }
  public set JSON(val: any) {
    if (this.viewType == "editor") {
      this.setTextValue(JSON.stringify(val));
    } else {
      this.initSurveyWithJSON(val, true);
    }
  }

  protected doClickQuestionCore(
    element: IElement,
    modifiedType: string = "ADDED_FROM_TOOLBOX",
    index: number = -1
  ) {
    if (this.survey.pageCount == 0) {
      this.survey.addNewPage();
    }
    var parent = this.currentPage;
    var elElement = this.survey.selectedElement;
    if (elElement && elElement.parent) {
      parent = elElement.parent;
      if (index < 0) {
        index = parent.elements.indexOf(this.survey.selectedElement);
        if (index > -1) index++;
      }
    }
    parent.addElement(element, index);
    this.setModified({ type: modifiedType, question: element });
  }

  public setNewNames(element: Survey.ISurveyElement) {
    this.newQuestions = [];
    this.newPanels = [];
    this.newQuestionChangedNames = {};
    this.setNewNamesCore(element);
    this.updateNewElementExpressions(element);
  }
  private updateNewElementExpressions(element: Survey.ISurveyElement) {
    var survey = this.createSurvey({}, "updateNewElementExpressions");
    survey.setDesignMode(true);
    if (element.isPage) {
      survey.addPage(<Survey.PageModel>element);
    } else {
      survey.addNewPage("p1");
      survey.pages[0].addElement(<IElement>element);
    }
    var logic = new SurveyLogic(survey);
    for (var key in this.newQuestionChangedNames) {
      logic.renameQuestion(key, this.newQuestionChangedNames[key]);
    }
  }

  protected getAllQuestions(): Array<any> {
    var result = [];
    for (var i = 0; i < this.survey.pages.length; i++) {
      this.addElements(this.survey.pages[i].elements, false, result);
    }
    this.addElements(this.newPanels, false, result);
    this.addElements(this.newQuestions, false, result);
    return result;
  }

  protected getAllPanels(): Array<any> {
    var result = [];
    for (var i = 0; i < this.survey.pages.length; i++) {
      this.addElements(this.survey.pages[i].elements, true, result);
    }
    this.addElements(this.newPanels, true, result);
    this.addElements(this.newQuestions, true, result);
    return result;
  }

  protected addElements(
    elements: Array<any>,
    isPanel: boolean,
    result: Array<any>
  ) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].isPanel === isPanel) {
        result.push(elements[i]);
      }
      this.addElements(SurveyHelper.getElements(elements[i]), isPanel, result);
    }
  }

  protected getNewName(type: string): string {
    if (type == "page") return SurveyHelper.getNewPageName(this.survey.pages);
    return type == "panel" || type == "flowpanel"
      ? this.getNewPanelName()
      : this.getNewQuestionName();
  }
  protected getNewQuestionName(): string {
    return SurveyHelper.getNewQuestionName(this.getAllQuestions());
  }
  protected getNewPanelName(): string {
    return SurveyHelper.getNewPanelName(this.getAllPanels());
  }

  protected setNewNamesCore(element: Survey.ISurveyElement) {
    var elType = element["getType"]();
    var newName = this.getNewName(elType);
    if (newName != element.name) {
      this.newQuestionChangedNames[element.name] = newName;
      element.name = newName;
    }
    if (element.isPanel || elType == "page") {
      if (element.isPanel) {
        this.newPanels.push(element);
      }
      var panel = <Survey.PanelModelBase>(<any>element);
      for (var i = 0; i < panel.elements.length; i++) {
        this.setNewNamesCore(panel.elements[i]);
      }
    } else {
      this.newQuestions.push(element);
    }
  }

  public createNewElement(json: any): IElement {
    var newElement = Survey.Serializer.createClass(json["type"]);
    new Survey.JsonObject().toObject(json, newElement);
    this.setNewNames(newElement);
    return newElement;
  }

  public copyElement(element: Survey.Base): IElement {
    var json = new Survey.JsonObject().toJsonObject(element);
    json.type = element.getType();
    return this.createNewElement(json);
  }

  /**
   * Copy a question to the active page
   * @param question A copied Survey.Question
   */
  public fastCopyQuestion(question: Survey.Base): Survey.IElement {
    var newElement = this.copyElement(question);
    var index = !!question["parent"]
      ? question["parent"].elements.indexOf(question) + 1
      : -1;
    this.doClickQuestionCore(newElement, "ELEMENT_COPIED", index);
    return newElement;
  }
  /**
   * Get or set the current selected object in the Creator. It can be a question, panel, page or survey itself.
   */
  public get selectedElement(): Base {
    return this.selectedElementValue;
  }
  public set selectedElement(val: Base) {
    this.selectElement(val);
  }
  /**
   * @Deprecated Obsolete. Please use deleteCurrentElement.
   * @see deleteCurrentElement
   */
  public deleteCurrentObject() {
    this.deleteCurrentElement();
  }
  /**
   * Delete a currently selected element in the survey. It can be a question, a panel or a page.
   */
  public deleteCurrentElement() {
    this.deleteObject(this.selectedElement);
  }
  /**
   * Delete an element in the survey. It can be a question, a panel or a page.
   * @param element a survey element.
   */
  public deleteElement(element: Survey.Base) {
    this.deleteObject(element);
  }
  /**
   * Create a new page with the same elements and place it next to the current one. It returns the new created Survey.Page
   * @param page A copied Survey.Page
   */
  public copyPage(page: PageModel): PageModel {
    var newPage = <PageModel>(<any>this.copyElement(page));
    var index = this.survey.pages.indexOf(page);
    if (index > -1) {
      this.survey.pages.splice(index + 1, 0, newPage);
    } else {
      this.survey.pages.push(newPage);
    }
    return newPage;
  }

  protected deleteObjectCore(obj: any) {
    var objType = SurveyHelper.getObjectType(obj);
    if (objType == ObjType.Page) {
      this.survey.removePage(obj);
    } else {
      this.deletePanelOrQuestion(obj, objType);
    }
    this.setModified({
      type: "OBJECT_DELETED",
      target: obj
    });
    this.updateConditionsOnRemove(obj);
  }
  private getNextPage(page: PageModel): PageModel {
    var index = this.survey.pages.indexOf(page);
    if (index < this.survey.pages.length - 1) index++;
    else index--;
    if (index < 0) index = 0;
    if (index < this.survey.pages.length) return this.survey.pages[index];
    return null;
  }
  protected deleteObject(obj: any) {
    var options = {
      element: obj,
      elementType: SurveyHelper.getObjectType(obj),
      allowing: true
    };
    this.onElementDeleting.fire(this, options);
    if (!options.allowing) return;
    this.deleteObjectCore(obj);
  }
  protected updateConditionsOnRemove(obj: any) {
    var objType = SurveyHelper.getObjectType(obj);
    var questions;
    if (objType == ObjType.Question) {
      questions = [obj];
    } else {
      var questions = obj.questions;
    }
    if (!questions) return;
    // TODO: remove SurveyLogic call here
    var logic = new SurveyLogic(<any>this.survey, <any>this);
    for (var i = 0; i < questions.length; i++) {
      logic.removeQuestion(questions[i].getValueName());
    }
  }

  public isElementSelected(element: Base): boolean {
    if (!element || element.isDisposed) return false;
    return element.getPropertyValue("isSelectedInDesigner");
  }

  public selectElement(element: any, propertyName?: string, focus = true) {
    var oldValue = this.selectedElement;
    if (oldValue !== element) {
      this.selectedElementValue = this.onSelectingElement(element);
      if (oldValue !== this.selectedElementValue) {
        if (!!oldValue && !oldValue.isDisposed) {
          oldValue.setPropertyValue("isSelectedInDesigner", false);
        }
        if (!!this.selectedElementValue) {
          this.selectedElementValue.setPropertyValue(
            "isSelectedInDesigner",
            true
          );
        }
      }
    }
    if (oldValue !== element || !!propertyName) {
      this.selectionChanged(this.selectedElement, propertyName, focus);
    }
  }

  private onSelectingElement(val: Base): Base {
    var options = { newSelectedElement: val };
    this.onSelectedElementChanging.fire(this, options);
    return options.newSelectedElement;
  }

  /**
   * Collapse certain property editor tab (category) in properties panel/grid
   * name - tab category name
   * @see collapseAllPropertyGridCategories
   * @see expandPropertyGridCategory
   * @see expandAllPropertyGridCategories
   */
  public collapsePropertyGridCategory(name: string) {
    if (!!this.propertyGrid) {
      this.propertyGrid.collapseCategory(name);
    }
  }
  /**
   * Expand certain property editor tab (category) in properties panel/grid
   * name - tab category name
   * @see collapsePropertyGridCategory
   * @see collapseAllPropertyGridCategories
   * @see expandAllPropertyGridCategories
   */
  public expandPropertyGridCategory(name: string) {
    if (!!this.propertyGrid) {
      this.propertyGrid.expandCategory(name);
    }
  }
  /**
   * Expand all property editor tabs (categories) in properties panel/grid
   * @see collapsePropertyGridCategory
   * @see expandPropertyGridCategory
   * @see expandAllPropertyGridCategories
   */
  public collapseAllPropertyGridCategories() {
    if (!!this.propertyGrid) {
      this.propertyGrid.collapseAllCategories();
    }
  }
  /**
   * Expand all property editor tabs (categories) in properties panel/grid
   * @see collapsePropertyGridCategory
   * @see collapseAllPropertyGridCategories
   * @see expandPropertyGridCategory
   */
  public expandAllPropertyGridCategories() {
    if (!!this.propertyGrid) {
      this.propertyGrid.expandAllCategories();
    }
  }
  /**
   * @Deprecated Obsolete. Collapse all property editor tabs (categories) in properties panel/grid
   * @see collapseAllPropertyGridCategories
   *
   */
  public collapseAllPropertyTabs(): void {
    this.collapseAllPropertyGridCategories();
  }

  /**
   * @Deprecated Obsolete. Expand all property editor tabs (categories) in properties panel/grid
   * @see expandAllPropertyGridCategories
   */
  public expandAllPropertyTabs(): void {
    this.expandAllPropertyGridCategories();
  }

  /**
   * @Deprecated Obsolete. Expand certain property editor tab (category) in properties panel/grid
   * name - tab category name
   * @see expandPropertyGridCategory
   */
  public expandPropertyTab(name: string): void {
    this.expandPropertyGridCategory(name);
  }

  /**
   * @Deprecated Obsolete. Collapse certain property editor tab (category) in properties panel/grid
   * name - tab category name
   * @see collapsePropertyGridCategory
   */
  public collapsePropertyTab(name: string): void {
    this.collapsePropertyGridCategory(name);
  }

  /**
   * Check for errors in property grid and adorners of the selected elements.
   * Returns true if selected element is null or there is no errors.
   */
  public validateSelectedElement(): boolean {
    var isValid = true;
    if (!this.selectedElement) return isValid;
    if (!!this.propertyGrid) {
      isValid = this.propertyGrid.validate();
    }
    /*
    var options = { errors: [] };
    this.onValidateSelectedElement.fire(this, options);
    return isValid && options.errors.length == 0;
    */
    return isValid;
  }
  private selectionChanged(element: Base, propertyName?: string, focus = true) {
    if (
      !!element &&
      typeof element.getType === "function" &&
      element.getType() === "page"
    ) {
      this.survey.currentPage = <PageModel>element;
    } else if (!!element && !!element["page"]) {
      this.survey.currentPage = element["page"];
    } else {
      this.survey.currentPage = undefined;
    }
    this.selectionHistoryController.onObjSelected(element);
    if (this.propertyGrid) {
      this.propertyGrid.obj = element;
      if (!!propertyName) {
        this.propertyGrid.selectProperty(propertyName, focus);
      }
    }
    var options = { newSelectedElement: element };
    this.onSelectedElementChanged.fire(this, options);
  }
  public clickToolboxItem(newElement: any) {
    if (!this.readOnly) {
      if (newElement["getType"] === undefined) {
        newElement = this.createNewElement(newElement);
      }
      this.doClickQuestionCore(newElement);
      this.selectElement(newElement);
    }
  }
  public getJSONForNewElement(json: any): any {
    var newElement: Base = <any>this.createNewElement(json);
    json = newElement.toJSON();
    json["type"] = newElement.getType();
    return json;
  }
  /**
   * Open file chooser dialog
   * @param input file input element
   * @param onFilesChosen a call back function to process chosen files
   */
  public chooseFiles(
    input: HTMLInputElement,
    onFilesChosen: (files: File[]) => void
  ) {
    if (this.onOpenFileChooser.isEmpty) {
      if (!window["FileReader"]) return;
      input.value = "";
      input.onchange = (event) => {
        if (!window["FileReader"]) return;
        if (!input || !input.files || input.files.length < 1) return;
        let files = [];
        for (let i = 0; i < input.files.length; i++) {
          files.push(input.files[i]);
        }
        onFilesChosen(files);
      };
      input.click();
    } else {
      this.onOpenFileChooser.fire(this, {
        input: input,
        callback: onFilesChosen
      });
    }
  }
  /**
   * Upload the files on a server
   * @param files files to upload
   * @param uploadingCallback a call back function to get the status on uploading the file and operation result - URI of the uploaded file
   */
  public uploadFiles(
    files: File[],
    uploadingCallback: (status: string, data: any) => any
  ) {
    if (this.onUploadFile.isEmpty) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        uploadingCallback("success", fileReader.result);
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      this.onUploadFile.fire(this, {
        files: files || [],
        callback: uploadingCallback
      });
    }
  }

  protected deletePanelOrQuestion(obj: Survey.Base, objType: ObjType): void {
    var parent = obj["parent"];
    var elements = parent.elements;
    var objIndex = elements.indexOf(obj);
    if (objIndex == elements.length - 1) {
      objIndex--;
    }
    obj["delete"]();
    this.selectElement(objIndex > -1 ? elements[objIndex] : parent);
  }
  protected onCanShowObjectProperty(
    object: any,
    property: Survey.JsonObjectProperty,
    showMode: string,
    parentObj: any,
    parentProperty: Survey.JsonObjectProperty
  ): boolean {
    var options = {
      obj: object,
      property: property,
      canShow: true,
      showMode: showMode,
      parentObj: parentObj,
      parentProperty: parentProperty
    };
    this.onCanShowProperty.fire(this, options);
    return options.canShow;
  }
  protected canDeleteItem(
    object: any,
    item: Survey.Base,
    allowDelete: boolean
  ): boolean {
    var options = { obj: object, item: item, canDelete: allowDelete };
    this.onCanDeleteItem.fire(this, options);
    return options.canDelete;
  }
  private getErrorOnPropertyChanging(
    obj: Survey.Base,
    propertyName: string,
    value: any
  ): string {
    if (propertyName !== "name") return null;
    if (SurveyHelper.getObjectType(obj) === ObjType.Unknown) return null;
    var hasError = false;
    if (SurveyHelper.getObjectType(obj) === ObjType.Column) {
      hasError = !!(<any>obj).colOwner
        ? !this.isNameUniqueInArray((<any>obj).colOwner.columns, obj, value)
        : false;
    } else {
      hasError = this.generateUniqueName(obj, value) !== value;
    }

    return hasError ? this.getLocString("pe.propertyNameIsNotUnique") : null;
  }
  protected generateUniqueName(el: Survey.Base, newName: string): string {
    var options = { element: el, name: newName, isUnique: true };
    do {
      if (!options.isUnique) {
        options.name = SurveyHelper.generateNewName(options.name);
      }
      while (!this.isNameUnique(el, options.name)) {
        options.name = SurveyHelper.generateNewName(options.name);
      }
      options.isUnique = true;
      var oldName = options.name;
      this.onGenerateNewName.fire(this, options);
      if (oldName != options.name) {
        options.isUnique = this.isNameUnique(el, options.name);
      }
    } while (!options.isUnique);
    return options.name;
  }
  protected isNameUnique(el: Survey.Base, newName: string): boolean {
    if (!this.isNameUniqueInArray(this.survey.pages, el, newName)) return false;
    if (!this.isNameUniqueInArray(this.survey.getAllPanels(), el, newName))
      return false;
    return this.isNameUniqueInArray(this.survey.getAllQuestions(), el, newName);
  }
  private isNameUniqueInArray(
    elements: Array<any>,
    el: Survey.Base,
    newName: string
  ): boolean {
    if (!Array.isArray(elements)) return true;
    newName = newName.toLowerCase();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] != el && elements[i].name.toLowerCase() == newName)
        return false;
    }
    return true;
  }
  protected doPropertyGridChanged() {}

  //implements ISurveyCreatorOptions
  get alwaySaveTextInPropertyEditors(): boolean {
    return this.alwaySaveTextInPropertyEditorsValue;
  }
  set alwaySaveTextInPropertyEditors(value: boolean) {
    this.alwaySaveTextInPropertyEditorsValue = value;
  }
  onCanShowPropertyCallback(
    object: any,
    property: Survey.JsonObjectProperty,
    showMode: string = null,
    parentObj: any,
    parentProperty: Survey.JsonObjectProperty
  ): boolean {
    return this.onCanShowObjectProperty(
      object,
      property,
      showMode,
      parentObj,
      parentProperty
    );
  }
  onCanDeleteItemCallback(
    object: any,
    item: Survey.Base,
    allowDelete: boolean
  ): boolean {
    return this.canDeleteItem(object, item, allowDelete);
  }
  onCollectionItemDeletingCallback(
    obj: Survey.Base,
    property: Survey.JsonObjectProperty,
    collection: Array<Survey.Base>,
    item: Survey.Base
  ): boolean {
    if (this.onCollectionItemDeleting.isEmpty) return true;
    var options = {
      obj: obj,
      property: property,
      propertyName: property.name,
      collection: collection,
      item: item,
      allowDelete: true
    };
    this.onCollectionItemDeleting.fire(this, options);
    return options.allowDelete;
  }
  onItemValueAddedCallback(
    obj: Survey.Base,
    propertyName: string,
    itemValue: Survey.ItemValue,
    itemValues: Array<Survey.ItemValue>
  ) {
    var options = {
      obj: obj,
      propertyName: propertyName,
      newItem: itemValue,
      itemValues: itemValues
    };
    this.onItemValueAdded.fire(this, options);
  }
  onMatrixDropdownColumnAddedCallback(
    matrix: Survey.Question,
    column: Survey.MatrixDropdownColumn,
    columns: Array<Survey.MatrixDropdownColumn>
  ) {
    var options = { newColumn: column, matrix: matrix, columns: columns };
    this.onMatrixColumnAdded.fire(this, options);
  }
  onSetPropertyEditorOptionsCallback(
    propertyName: string,
    obj: Survey.Base,
    editorOptions: any
  ) {
    var options = {
      propertyName: propertyName,
      obj: obj,
      editorOptions: editorOptions
    };
    this.onSetPropertyEditorOptions.fire(this, options);
  }
  onGetErrorTextOnValidationCallback(
    propertyName: string,
    obj: Survey.Base,
    value: any
  ): string {
    var error = this.getErrorOnPropertyChanging(obj, propertyName, value);
    if (!!error) return error;
    var options = {
      propertyName: propertyName,
      obj: obj,
      value: value,
      error: ""
    };
    this.onPropertyValidationCustomError.fire(this, options);
    return options.error;
  }
  onValueChangingCallback(options: any) {
    this.onPropertyValueChanging.fire(this, options);
  }
  public onSurveyElementPropertyValueChanged(
    property: Survey.JsonObjectProperty,
    obj: any,
    newValue: any
  ) {
    /* 
    //TODO We likely do not need this callback and can remove it for V2
    //We called "PROPERTY_CHANGED" from obj.propertyValueChanged with undoRedoManager object
    var oldValue = obj[property.name];
    this.setModified({
      type: "PROPERTY_CHANGED",
      name: property.name,
      target: obj,
      oldValue: oldValue,
      newValue: newValue,
    });
    //TODO add a flag to a property, may change other properties
    if (
      property.name == "hasComment" ||
      property.name == "hasNone" ||
      property.name == "hasOther" ||
      property.name == "hasSelectAll" ||
      property.name == "locale"
    ) {
      this.doPropertyGridChanged();
    }
    */
  }
  onGetElementEditorTitleCallback(obj: Survey.Base, title: string): string {
    return title;
  }
  onConditionQuestionsGetListCallback(
    propertyName: string,
    obj: Survey.Base,
    editor: any,
    list: any[]
  ) {
    var options = {
      propertyName: propertyName,
      obj: obj,
      editor: editor,
      list: list
    };
    this.onConditionQuestionsGetList.fire(this, options);
    if (options.list !== list) {
      list.splice(0, list.length);
      for (var i = 0; i < options.list.length; i++) {
        list.push(options.list[i]);
      }
    }
  }
  startUndoRedoTransaction(name: string = "") {
    this.undoRedoManager.startTransaction(name);
  }
  stopUndoRedoTransaction() {
    this.undoRedoManager.stopTransaction();
  }
  /**
   * The delay on saving survey JSON on autoSave in ms. It is 500 ms by default.
   * If during this period of time an end-user modify survey, then the last version will be saved only. Set to 0 to save immediately.
   * @see isAutoSave
   */
  public autoSaveDelay: number = 500;
  private autoSaveTimerId = null;
  protected doAutoSave() {
    if (this.autoSaveDelay <= 0) {
      this.doSave();
      return;
    }
    if (!!this.autoSaveTimerId) {
      clearTimeout(this.autoSaveTimerId);
    }
    var self = this;
    this.autoSaveTimerId = setTimeout(function () {
      clearTimeout(self.autoSaveTimerId);
      self.autoSaveTimerId = null;
      self.doSave();
    }, this.autoSaveDelay);
  }
  saveNo: number = 0;
  protected doSave() {
    this.setState("saving");
    if (this.saveSurveyFunc) {
      this.saveNo++;
      this.saveSurveyFunc(this.saveNo, (no: number, isSuccess: boolean) => {
        if (this.saveNo !== no) return;
        if (isSuccess) {
          this.setState("saved");
        } else {
          if (this.showErrorOnFailedSave) {
            this.notify(this.getLocString("ed.saveError"));
          }
          this.setState("modified");
        }
      });
    }
  }

  /**
   * Assign to this property a function that will be called on clicking the 'Save' button or on any change if isAutoSave equals true.
   * @see isAutoSave
   */
  public get saveSurveyFunc() {
    return this.saveSurveyFuncValue;
  }
  public set saveSurveyFunc(value: any) {
    this.saveSurveyFuncValue = value;
    //TODO
    //this.koShowSaveButton(value != null && !this.isAutoSave);
  }
  public convertCurrentQuestion(newType: string) {
    var el = this.selectedElement;
    if (SurveyHelper.getObjectType(el) !== ObjType.Question) return;
    this.undoRedoManager.startTransaction("Convert question");
    el = this.convertQuestion(<Survey.Question>el, newType);
    this.selectElement(el);
    this.undoRedoManager.stopTransaction();
  }

  public get addNewQuestionText() {
    return (
      "Add " +
      ((!!this.currentAddQuestionType &&
        editorLocalization.getString("qt." + this.currentAddQuestionType)) ||
        "Question")
    );
  }

  public getQuestionTypeSelectorModel(beforeAdd: () => void) {
    var availableTypes = this.toolbox.itemNames.map((className) => {
      return this.createIActionBarItemByClass(className);
    });
    const popupModel = new PopupModel(
      "sv-list",
      {
        model: new ListModel(
          availableTypes,
          (item: any) => {
            this.currentAddQuestionType = item.id;
            this.addNewQuestionInPage(beforeAdd);
            popupModel.toggleVisibility();
          },
          false
        )
      },
      "bottom",
      "center"
    );

    return {
      iconName: "icon-dots",
      action: () => {
        popupModel.toggleVisibility();
      },
      popupModel: popupModel
    };
  }
  public addNewQuestionInPage(beforeAdd: () => void) {
    if (this.undoRedoManager) {
      this.undoRedoManager.startTransaction("add new page");
    }
    beforeAdd();
    const newElement = Survey.ElementFactory.Instance.createElement(
      this.currentAddQuestionType || "text",
      "q1"
    );
    this.setNewNames(newElement);
    this.clickToolboxItem(newElement);

    if (this.undoRedoManager) {
      this.undoRedoManager.stopTransaction();
    }
  }
  createIActionBarItemByClass(className: string): IActionBarItem {
    return {
      title: this.getLocString("qt." + className),
      id: className,
      iconName: "icon-" + className
    };
  }

  public onElementMenuItemsChanged(element: any, items: Action[]) {
    this.onDefineElementMenuItems.fire(this, {
      obj: element,
      items: items
    });
  }
  public getNextItemValue(question: Survey.QuestionSelectBase) {
    const itemText = Survey.surveyLocalization.getString("choices_Item");
    const values = question.choices.map((item: Survey.ItemValue) => item.value);
    const nextValue = getNextValue(itemText, values);
    return nextValue;
  }
  public createNewItemValue(question: Survey.QuestionSelectBase) {
    const nextValue = this.getNextItemValue(question);
    // TODO: get item type from question
    if (question.getType() === "imagepicker") {
      return new Survey.ImageItemValue(nextValue);
    }
    return new Survey.ItemValue(nextValue);
  }
}

export class StylesManager {
  public static get currentTheme(): string {
    SurveyHelper.warnNonSupported("StylesManager");
    return undefined;
  }
  public static set currentTheme(val: string) {
    SurveyHelper.warnNonSupported("StylesManager");
  }
  public static applyTheme(name?: string) {
    SurveyHelper.warnNonSupported("StylesManager");
  }
}

export function getElementWrapperComponentName(
  element: any,
  reason: string,
  isPopupEditorContent: boolean
): string {
  if (reason === "logo-image") {
    return "svc-logo-image";
  }
  if (
    reason === "cell" ||
    reason === "column-header" ||
    reason === "row-header"
  ) {
    return "svc-matrix-cell";
  }
  if (!element.parentQuestionValue && !element.isContentElement) {
    if (element instanceof Question) {
      if (element.getType() == "dropdown") {
        return isPopupEditorContent
          ? "svc-cell-dropdown-question"
          : "svc-dropdown-question";
      }
      if (element.getType() == "image") {
        return "svc-image-question";
      }
      if (element.getType() == "rating") {
        return "svc-rating-question";
      }
      return isPopupEditorContent ? "svc-cell-question" : "svc-question";
    }
  }
  return undefined;
}
export function isStringEditable(element: any, name: string): boolean {
  return (
    (!element.parentQuestionValue && !element.isContentElement) ||
    element.isEditableTemplateElement
  );
}
