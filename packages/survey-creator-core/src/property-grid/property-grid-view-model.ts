import {
  Base,
  SurveyModel,
  property,
  propertyArray,
  IActionBarItem,
  PopupModel
} from "survey-core";
import { PropertyGridModel } from "./index";
import { SelectionHistory } from "../selection-history";
import { SurveyHelper } from "../surveyHelper";
import { ObjectSelectorModel } from "./object-selector";
import { CreatorBase } from "../creator-base";
import { editorLocalization } from "../editorLocalization";

export class PropertyGridViewModel<T extends SurveyModel> extends Base {
  @property() survey: SurveyModel;
  @propertyArray() toolbarItems: Array<IActionBarItem>;
  @property() title: string;
  @property() hasPrev: boolean;
  @property() hasNext: boolean;
  @property({ defaultValue: true }) visible: boolean;
  private onPropertyGridVisibilityChanged;
  constructor(private creator: CreatorBase<T>) {
    super();
    this.onPropertyGridVisibilityChanged = (
      sender: CreatorBase<T>,
      options: any
    ) => {
      if (this.isDisposed) return;
      this.visible = options.show;
    };
    this.creator.onShowPropertyGridVisiblityChanged.add(
      this.onPropertyGridVisibilityChanged
    );
    this.visible = this.creator.showPropertyGrid;
    this.model.objValueChangedCallback = () => {
      this.onSurveyChanged();
    };
    this.model.changedFromActionCallback = (
      obj: Base,
      propertyName: string
    ) => {
      if (!!this.selectionController) {
        this.selectionController.selectFromAction(obj, propertyName);
      }
    };
    this.toolbarItems.push({
      id: "svd-grid-hide",
      iconName: "icon-hide",
      component: "sv-action-bar-item",
      title: editorLocalization.getString("ed.hide"),
      showTitle: false,
      action: () => {
        this.creator.showPropertyGrid = false;
      }
    });
    this.toolbarItems.push({
      id: "svd-grid-history-prev",
      iconName: "icon-prev",
      component: "sv-action-bar-item",
      title: editorLocalization.getString("ed.previous"),
      showTitle: false,
      enabled: () => this.hasPrev,
      action: () => {
        this.selectionController.prev();
      }
    });
    this.toolbarItems.push({
      id: "svd-grid-history-next",
      iconName: "icon-next",
      component: "sv-action-bar-item",
      title: editorLocalization.getString("ed.next"),
      showTitle: false,
      enabled: () => this.hasNext,
      action: () => {
        this.selectionController.next();
      }
    });
    const selectorModel = new ObjectSelectorModel(
      (obj: Base, reason: string, displayName: string) => {
        return this.model.options.getObjectDisplayName(
          obj,
          reason,
          displayName
        );
      }
    );
    const selectorPopupModel: PopupModel = new PopupModel(
      "svc-object-selector",
      {
        model: selectorModel
      },
      "bottom",
      "left"
    );
    this.toolbarItems.push({
      id: "svd-grid-object-selector",
      title: () => this.title,
      css: "sv-action--last sv-action-bar-item--secondary",
      iconName: "icon-more",
      component: "sv-action-bar-item-dropdown",
      action: () => {
        selectorModel.show(
          this.selectionController.creator.survey,
          this.model.obj,
          (obj: Base) => {
            this.selectionController.selectFromAction(obj, "name");
            selectorPopupModel.toggleVisibility();
          }
        );
        selectorPopupModel.toggleVisibility();
      },
      popupModel: selectorPopupModel
    });
    this.onSurveyChanged();
  }
  public dispose() {
    if (!!this.creator && !this.isDisposed) {
      this.creator.onShowPropertyGridVisiblityChanged.remove(
        this.onPropertyGridVisibilityChanged
      );
    }
    super.dispose();
  }
  private get model(): PropertyGridModel {
    return this.creator.propertyGrid;
  }
  private get selectionController(): SelectionHistory {
    return this.creator.selectionHistoryController;
  }
  private onSurveyChanged() {
    this.survey = this.model.survey;
    if (!!this.survey) {
      this.survey.onValueChanged.add((sender: SurveyModel, options: any) => {
        if (options.name == "name" || options.name == "title") {
          this.updateTitle();
        }
      });
    }
    this.updateTitle();
    if (this.selectionController) {
      this.hasPrev = this.selectionController.hasPrev;
      this.hasNext = this.selectionController.hasNext;
    }
  }
  private updateTitle() {
    this.title = this.getTitle();
  }
  private getTitle(): string {
    var obj = this.model.obj;
    if (!obj) return "";
    var displayName = SurveyHelper.getObjectName(
      obj,
      this.model.options.showObjectTitles
    );
    return this.model.options.getObjectDisplayName(
      obj,
      "property-grid",
      displayName
    );
  }
}
