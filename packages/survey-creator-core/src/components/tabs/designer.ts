import {
  Base,
  PageModel,
  property,
  SurveyModel,
  Action
} from "survey-core";
import { ICreatorPlugin, CreatorBase } from "../../creator-base";
import { DragDropHelper } from "survey-core";
import "./designer.scss";

export class TabDesignerViewModel<T extends SurveyModel> extends Base {
  @property() newPage: PageModel;
  @property({ defaultValue: false }) showNewPage: boolean;
  public creator: CreatorBase<T>;

  private createNewPage() {
    const newPage: PageModel = this.survey.createNewPage("");
    this.creator.setNewNames(newPage);
    newPage.onFirstRendering();
    newPage.updateCustomWidgets();
    newPage.setWasShown(true);
    newPage.setSurveyImpl(this.survey);
    newPage["_addToSurvey"] = () => {
      newPage["_addToSurvey"] = undefined;
      this.survey.addPage(newPage);
    };
    var checkNewElementHandler = (sender: SurveyModel, options: any) => {
      if (options.name === "elements" && newPage.elements.length > 0) {
        newPage.onPropertyChanged.remove(checkNewElementHandler);
        if (this.survey.pages.indexOf(newPage) > -1) return;
        this.creator.startUndoRedoTransaction("Add new page");
        this.survey.addPage(newPage);
        this.creator.stopUndoRedoTransaction();
      }
    };
    newPage.onPropertyChanged.add(checkNewElementHandler);
    this.newPage = newPage;
    DragDropHelper.newGhostPage = newPage;
  }

  constructor(creator: CreatorBase<T>) {
    super();
    this.creator = creator;
    this.initSurvey();
  }
  get survey() {
    return this.creator.survey;
  }
  private checkNewPageHandler: (sender: SurveyModel, options: any) => void;
  private surveyOnPropertyChanged: (sender: SurveyModel, options: any) => void;
  public initSurvey() {
    if (!this.survey) return;
    this.showNewPage = false;
    this.newPage = undefined;
    this.checkNewPageHandler = (sender: SurveyModel, options: any) => {
      this.checkNewPage();
    };
    this.surveyOnPropertyChanged = (sender: SurveyModel, options: any) => {
      if (options.name !== "pages") return;
      this.checkNewPage();
    };
    this.survey.onPropertyChanged.add(this.surveyOnPropertyChanged);
    this.survey.onQuestionAdded.add(this.checkNewPageHandler);
    this.survey.onQuestionRemoved.add(this.checkNewPageHandler);
    this.survey.onPanelAdded.add(this.checkNewPageHandler);
    this.survey.onPanelRemoved.add(this.checkNewPageHandler);

    this.checkNewPage();
  }
  public dispose() {
    super.dispose();
    this.survey.onPropertyChanged.remove(this.surveyOnPropertyChanged);
    this.survey.onQuestionAdded.remove(this.checkNewPageHandler);
    this.survey.onQuestionRemoved.remove(this.checkNewPageHandler);
    this.survey.onPanelAdded.remove(this.checkNewPageHandler);
    this.survey.onPanelRemoved.remove(this.checkNewPageHandler);
  }
  private checkNewPage() {
    if (this.canShowNewPage) {
      var pages = this.survey.pages;
      if (
        !this.newPage ||
        (pages.length > 0 && this.newPage === pages[pages.length - 1])
      ) {
        this.createNewPage();
        this.showNewPage = true;
      }
    } else {
      this.showNewPage = false;
      this.newPage = undefined;
    }
  }
  private get canShowNewPage(): boolean {
    if (!this.survey || this.creator.pageEditMode === "single") return false;
    const pages: PageModel[] = this.survey.pages;
    return pages.length === 0 || pages[pages.length - 1].elements.length > 0;
  }
}

export class TabDesignerPlugin<T extends SurveyModel>
  implements ICreatorPlugin
{
  public model: TabDesignerViewModel<T>;
  private undoAction: Action;
  private redoAction: Action;
  private surveySettingsAction: Action;
  constructor(private creator: CreatorBase<T>) {
    creator.addPluginTab("designer", this);
  }
  public activate(): void {
    this.model = new TabDesignerViewModel<T>(this.creator);
    this.undoAction && (this.undoAction.visible = true);
    this.redoAction && (this.redoAction.visible = true);
    this.surveySettingsAction && (this.surveySettingsAction.visible = true);
  }
  public deactivate(): boolean {
    this.model = undefined;

    this.undoAction.visible = false;
    this.redoAction.visible = false;
    this.surveySettingsAction.visible = false;
    return true;
  }
  public designerSurveyCreated(): void {
    if (!this.model) return;
    this.model.initSurvey();
    if (!!this.creator.undoRedoManager) {
      this.creator.undoRedoManager.canUndoRedoCallback = () => {
        this.updateUndeRedoActions();
      };
    }
  }
  public createActions(items: Array<Action>) {
    this.undoAction = new Action({
      id: "icon-undo",
      iconName: "icon-undo",
      title: "Undo",
      showTitle: false,
      visible: this.creator.viewType === "designer",
      action: () => this.creator.undo()
    });
    this.redoAction = new Action({
      id: "icon-redo",
      iconName: "icon-redo",
      title: "Redo",
      showTitle: false,
      visible: this.creator.viewType === "designer",
      action: () => this.creator.redo()
    });
    this.surveySettingsAction = new Action({
      id: "icon-settings",
      iconName: "icon-settings",
      needSeparator: true,
      action: () => {
        if (!this.creator.showPropertyGrid) {
          this.creator.showPropertyGrid = true;
        } else {
          this.creator.selectElement(this.creator.survey);
        }
      },
      active: this.isSurveySelected,
      visible: this.creator.viewType === "designer",
      title: "Settings",
      showTitle: false
    });
    items.push(this.undoAction);
    items.push(this.redoAction);
    items.push(this.surveySettingsAction);
    this.updateUndeRedoActions();
    this.creator.onSelectedElementChanged.add((sender, options) => {
      this.surveySettingsAction.active = this.isSettingsActive;
    });
    this.creator.onShowPropertyGridVisiblityChanged.add((sender, options) => {
      this.surveySettingsAction.active = this.isSettingsActive;
    });
  }
  private updateUndeRedoActions() {
    if (!this.creator.undoRedoManager) return;
    this.undoAction.active = this.creator.undoRedoManager.canUndo();
    this.redoAction.active = this.creator.undoRedoManager.canRedo();
  }
  private get isSurveySelected(): boolean {
    return this.creator.isElementSelected(<any>this.creator.survey);
  }
  private get isSettingsActive(): boolean {
    return this.creator.showPropertyGrid && this.isSurveySelected;
  }
}
