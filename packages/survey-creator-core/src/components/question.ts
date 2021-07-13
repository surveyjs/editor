import {
  SurveyElement,
  SurveyModel,
  SurveyTemplateRendererTemplateData,
  property,
  QuestionHtmlModel,
  PanelModelBase,
  Action,
  PopupModel,
  ListModel,
  Question
} from "survey-core";
import { CreatorBase } from "../creator-base";
import { DragDropHelper } from "survey-core";
import { getLocString } from "../editorLocalization";
import { QuestionConverter } from "../questionconverter";
import { IPortableDragEvent, IPortableMouseEvent } from "../utils/events";
import { isPropertyVisible, propertyExists } from "../utils/utils";
import { ActionContainerViewModel } from "./action-container-view-model";
import "./question.scss";

export class QuestionAdornerViewModel extends ActionContainerViewModel<SurveyModel> {
  @property() isDragged: boolean;

  constructor(
    creator: CreatorBase<SurveyModel>,
    surveyElement: SurveyElement,
    public templateData: SurveyTemplateRendererTemplateData
  ) {
    super(creator, surveyElement);
    this.actionContainer.setItems(this.getContextActions());
  }
  select(model: QuestionAdornerViewModel, event: IPortableMouseEvent) {
    if (!model.surveyElement.isInteractiveDesignElement) {
      return;
    }
    event.stopPropagation();
    event.cancelBubble = true;
    model.creator.selectElement(model.surveyElement);
    return true;
  }
  css() {
    let result = this.creator.isElementSelected(this.surveyElement)
      ? "svc-question__content--selected"
      : "";

    if (this.isEmptyElement) {
      result += " svc-question__content--empty";
    }

    return result;
  }
  dispose() {
    this.surveyElement.unRegisterFunctionOnPropertyValueChanged(
      "isRequired",
      "isRequiredAdorner"
    );
  }
  get isDraggable() {
    return true;
  }

  public get isEmptyElement(): boolean {
    if (this.surveyElement instanceof QuestionHtmlModel) {
      return !this.surveyElement.html;
    }

    if (this.surveyElement instanceof PanelModelBase) {
      const panel = this.surveyElement as any as PanelModelBase;
      return (
        !panel.rows || panel.rows.length <= 0 || panel.elements.length === 0
      );
    }

    return false;
  }

  public get placeholderText(): string {
    if (this.surveyElement instanceof QuestionHtmlModel) {
      return getLocString("ed.htmlPlaceHolder");
    }
    return getLocString("ed.panelPlaceHolder");
  }

  private get dragDropHelper(): DragDropHelper {
    return this.creator.dragDropHelper;
  }

  get isRequired() {
    return (<any>this.surveyElement).isRequired;
  }
  set isRequired(newVal) {
    (<any>this.surveyElement).isRequired = newVal;
  }

  startDragSurveyElement(event: PointerEvent) {
    this.dragDropHelper.startDragSurveyElement(event, <any>this.surveyElement);
    return true;
  }

  private createConverToAction() {
    var currentType = this.surveyElement.getType();
    const convertClasses: string[] = QuestionConverter.getConvertToClasses(
      currentType,
      this.creator.toolbox.itemNames
    );
    const allowChangeType: boolean = convertClasses.length > 0;

    var availableTypes = convertClasses.map((className) => {
      return this.creator.createIActionBarItemByClass(className);
    });
    const popupModel = new PopupModel(
      "sv-list",
      {
        model: new ListModel(
          availableTypes,
          (item: any) => {
            this.creator.convertCurrentQuestion(item.id);
          },
          false
        )
      },
      "bottom",
      "center"
    );

    return new Action({
      id: "convertTo",
      css: "sv-action--first sv-action-bar-item--secondary",
      iconName: "icon-change_16x16",
      title: this.creator.getLocString("qt." + currentType),
      visibleIndex: 0,
      enabled: allowChangeType,
      component: "sv-action-bar-item-dropdown",
      action: (newType) => {
        popupModel.toggleVisibility();
      },
      popupModel: popupModel
    });
  }

  private createRequiredAction() {
    (<Question>this.surveyElement).isRequired;
    const requiredAction = new Action({
      id: "isrequired",
      css: this.isRequired ? "sv-action-bar-item--secondary" : "",
      title: this.creator.getLocString("pe.isRequired"),
      visibleIndex: 20,
      iconName: this.isRequired
        ? "icon-switchactive_16x16"
        : "icon-switchinactive_16x16",
      action: () => {
        if (
          this.creator.isCanModifyProperty(
            <any>this.surveyElement,
            "isRequired"
          )
        ) {
          this.isRequired = !this.isRequired;
        }
      }
    });
    this.surveyElement.registerFunctionOnPropertyValueChanged(
      "isRequired",
      () => {
        requiredAction.iconName = this.isRequired
          ? "icon-switchactive_16x16"
          : "icon-switchinactive_16x16";
        requiredAction.css = this.isRequired
          ? "sv-action-bar-item--secondary"
          : "";
      },
      "isRequiredAdorner"
    );
    return requiredAction;
  }

  protected getContextActions(): Array<Action> {
    if (this.creator.readOnly) return [];

    const items = super.getContextActions();

    let element = this.surveyElement;
    let opts: any = element["allowingOptions"];
    if (!opts) opts = {};

    if (opts.allowChangeType === undefined || opts.allowChangeType) {
      if (!element.isPanel) {
        items.push(this.createConverToAction());
      }
    }

    if (
      (opts.allowChangeRequired === undefined || opts.allowChangeRequired) &&
      typeof element["isRequired"] !== "undefined" &&
      propertyExists(element, "isRequired") &&
      isPropertyVisible(element, "isRequired")
    ) {
      items.push(this.createRequiredAction());
    }

    this.creator.onElementMenuItemsChanged(element, items);
    return items;
  }
  protected duplicate() {
    var newElement = this.creator.fastCopyQuestion(this.surveyElement);
    this.creator.selectElement(newElement);
  }
}
