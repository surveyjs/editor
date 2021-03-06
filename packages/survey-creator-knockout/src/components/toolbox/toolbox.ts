import * as ko from "knockout";
import { AdaptiveElementImplementor, ImplementorBase } from "survey-knockout-ui";
import { SurveyCreator } from "../../creator";
import {
  AdaptiveElement,
  AdaptiveActionBarItemWrapper,
  VerticalResponsivityManager,
} from "survey-core";
//import "./toolbox.scss";
import { IQuestionToolboxItem } from "@survey/creator";
const template = require("./toolbox.html");
// import template from "./toolbox.html";

export class ToolboxViewModel extends AdaptiveElement {
  private _categoriesSubscription: ko.Computed;
  public categories = ko.observableArray<any>();
  public creator: SurveyCreator;
  private _isCompact = ko.observable(true);
  private _isCompactSubscription: ko.Computed;
  public get isCompact() {
    return this._isCompact();
  }
  public set isCompact(val: boolean) {
    this._isCompact(val);
  }

  constructor(
    private _categories: any[] | ko.Computed<Array<any>>,
    creator: SurveyCreator,
    isCompact: boolean | ko.Computed<boolean>,
  ) {
    super();

    this.dotsItemPopupModel.horizontalPosition = "right";
    this.dotsItemPopupModel.verticalPosition = "top";
    this.creator = creator;
    this._categoriesSubscription = ko.computed(() => {
      const wrappedItems: AdaptiveActionBarItemWrapper[] = [];
      const categories = ko.unwrap(_categories);
      categories.forEach((category: any, categoryIndex) => {
        new ImplementorBase(category);
        (ko.unwrap(category.items) || []).forEach((item, index) => {
          const wrapper = new AdaptiveActionBarItemWrapper(this, item);
          if (categoryIndex != 0 && index == 0) {
            wrapper.needSeparator = true;
          }
          wrappedItems.push(wrapper);
        });
      });
      this._isCompactSubscription = ko.computed(() => this.isCompact = ko.unwrap(isCompact));
      this.items = wrappedItems;
      this.categories(categories);
    });
    new AdaptiveElementImplementor(this);
  }

  public invisibleItemSelected(model: AdaptiveActionBarItemWrapper): void {
    this.creator.clickToolboxItem((model.wrappedItem as IQuestionToolboxItem).json);
  }

  dispose() {
    this._categoriesSubscription.dispose();
    this._isCompactSubscription.dispose();
  }
}

ko.components.register('svc-toolbox', {
  viewModel: {
    createViewModel: (params: any, componentInfo: any) => {
      const model: ToolboxViewModel = new ToolboxViewModel(params.categories, params.creator, params.isCompact);
      const container = componentInfo.element.querySelector('.svc-toolbox');
      const manager: VerticalResponsivityManager =
        new VerticalResponsivityManager(container, model, 'div.svc-toolbox__tool', 40);
      ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, () => {
        manager.dispose();
        model.dispose();
      });
      return model;
    },
  },
  template: template
});
