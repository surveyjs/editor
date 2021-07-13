import {
  Base,
  ItemValue,
  property,
  QuestionCheckboxModel,
  QuestionSelectBase,
  SurveyModel
} from "survey-core";
import { CreatorBase } from "../creator-base";
import { DragDropHelper } from "survey-core";
import "./item-value.scss";

export class ItemValueWrapperViewModel extends Base {
  @property({ defaultValue: false }) isNew: boolean;
  @property({ defaultValue: false }) isDragging: boolean;
  constructor(
    public creator: CreatorBase<SurveyModel>,
    public question: QuestionSelectBase,
    public item: ItemValue
  ) {
    super();
    this.isNew = !question.isItemInList(item);
    if (question.noneItem === item) {
    } else if (question.otherItem === item) {
    } else if (
      question.getType() === "checkbox" &&
      (<QuestionCheckboxModel>question).selectAllItem === item
    ) {
    } else if (this.isNew) {
      const nextValue = creator.getNextItemValue(question);
      item.value = nextValue;
    }
    this.subscribeToDragDropHelper();
  }
  dispose() {
    super.dispose();
    this.unsubscribeToDragDropHelper();
  }

  public isDraggableItem(item: ItemValue) {
    return this.question.choices.indexOf(item) !== -1;
  }

  public add(model: ItemValueWrapperViewModel) {
    if (model.question.noneItem === model.item) {
      model.question.hasNone = true;
    } else if (model.question.otherItem === model.item) {
      model.question.hasOther = true;
    } else if (
      model.question.getType() === "checkbox" &&
      (<QuestionCheckboxModel>model.question).selectAllItem === model.item
    ) {
      model.question.hasSelectAll = true;
    } else {
      const itemValue = model.creator.createNewItemValue(model.question);
      model.question.choices.push(itemValue);
      const nextValue = model.creator.getNextItemValue(model.question);
      model.item.value = nextValue;
    }
    this.isNew = !model.question.isItemInList(model.item);
  }
  public remove(model: ItemValueWrapperViewModel) {
    if (model.question.noneItem === model.item) {
      model.question.hasNone = false;
    } else if (model.question.otherItem === model.item) {
      model.question.hasOther = false;
    } else if (
      model.question.getType() === "checkbox" &&
      (<QuestionCheckboxModel>model.question).selectAllItem === model.item
    ) {
      model.question.hasSelectAll = false;
    } else {
      var index = model.question.choices.indexOf(model.item);
      model.question.choices.splice(index, 1);
    }
    this.isNew = !model.question["isItemInList"](model.item);
  }
  @property({ defaultValue: null }) ghostPosition: string;
  private handleDragDropHelperChanges = (sender, options) => {
    if (options.name === "isBottom") {
      this.ghostPosition = this.dragDropHelper.getItemValueGhostPosition(
        this.item
      );
    }
  };
  private subscribeToDragDropHelper = () => {
    this.dragDropHelper.onPropertyChanged.add(this.handleDragDropHelperChanges);
  };
  private unsubscribeToDragDropHelper = () => {
    this.dragDropHelper.onPropertyChanged.remove(
      this.handleDragDropHelperChanges
    );
  };
  startDragItemValue(event: PointerEvent) {
    this.dragDropHelper.startDragItemValue(event, this.question, this.item);
  }
  private get dragDropHelper(): DragDropHelper {
    return this.creator.dragDropHelper;
  }
  get isDraggable() {
    return this.isDraggableItem(this.item);
  }
  public select(model: ItemValueWrapperViewModel, event: Event) {
    model.creator.selectElement(model.question, "choices", false);
    event && event.stopPropagation();
  }
}
