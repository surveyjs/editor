import {
  PropertyGridModel,
  PropertyGridEditorCollection
} from "../../src/property-grid";
import {
  Base,
  JsonObjectProperty,
  QuestionTextModel,
  QuestionCheckboxModel,
  QuestionDropdownModel,
  QuestionMatrixDynamicModel,
  PanelModel,
  SurveyModel,
  SurveyTriggerRunExpression,
  ExpressionValidator,
  CalculatedValue,
  HtmlConditionItem,
  QuestionMultipleTextModel,
  UrlConditionItem,
  QuestionCompositeModel,
  ItemValue,
  Question,
  MatrixDropdownColumn,
  SurveyTriggerSetValue,
  QuestionMatrixModel,
  Serializer,
  QuestionPanelDynamicModel,
  QuestionMatrixDropdownModel,
  IActionBarItem,
  QuestionRatingModel,
  QuestionCustomModel
} from "survey-core";
import {
  ISurveyCreatorOptions,
  EmptySurveyCreatorOptions
} from "../../src/settings";

export * from "../../src/property-grid/matrices";
export * from "../../src/property-grid/condition";
export * from "../../src/property-grid/restfull";
import { CellsEditor } from "../../src/property-grid/cells-survey";
import {
  PropertyGridValueEditor,
  PropertyGridRowValueEditor
} from "../../src/property-grid/values";
import {
  SurveyQuestionEditorTabDefinition,
  SurveyQuestionProperties
} from "../../src/question-editor/properties";

export class PropertyGridModelTester extends PropertyGridModel {
  constructor(obj: Base, options: ISurveyCreatorOptions = null) {
    PropertyGridEditorCollection.clearHash();
    super(obj, options);
  }
}
test("Check property grid survey options", () => {
  const oldValue = Serializer.findProperty(
    "survey",
    "showProgressBar"
  ).defaultValue;
  Serializer.findProperty("survey", "showProgressBar").defaultValue = "top";
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  expect(propertyGrid.survey.showNavigationButtons).toEqual("none");
  expect(propertyGrid.survey.showProgressBar).toEqual("off");
  Serializer.findProperty("survey", "showProgressBar").defaultValue = oldValue;
});

test("Create survey with editingObj", () => {
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  expect(propertyGrid.survey.getValue("name")).toEqual("q1");
  var nameQuestion = propertyGrid.survey.getQuestionByName("name");
  expect(nameQuestion).toBeTruthy();
  expect(nameQuestion.title).toEqual("Name");
  nameQuestion.value = "q2";
  expect(question.name).toEqual("q2");
});
test("Check tabs creating", () => {
  var question = new QuestionCheckboxModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var generalPanel = <PanelModel>propertyGrid.survey.getPanelByName("general");
  expect(generalPanel).toBeTruthy();
  expect(generalPanel.title).toEqual("General");
  var actions = generalPanel.getTitleActions();
  expect(actions).toHaveLength(0);
  var choicesPanel = <PanelModel>propertyGrid.survey.getPanelByName("choices");
  expect(choicesPanel).toBeTruthy();
  expect(choicesPanel.title).toEqual("Choices");
});
test("Stop doing it because of title actions - Hide question title if property is first in tab and has the same title as tab", () => {
  var question = new QuestionCheckboxModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var choicesQuestion = propertyGrid.survey.getQuestionByName("choices");
  expect(choicesQuestion).toBeTruthy();
  expect(choicesQuestion.titleLocation).toEqual("default");
  expect(choicesQuestion.title).toEqual("Choices");
});

test("boolean property editor (boolean/switch)", () => {
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var startWithNewLineQuestion =
    propertyGrid.survey.getQuestionByName("startWithNewLine");
  var isRequiredQuestion = propertyGrid.survey.getQuestionByName("isRequired");
  expect(startWithNewLineQuestion).toBeTruthy(); //"property for startWithNewLine is created"
  expect(isRequiredQuestion).toBeTruthy(); // "property for isRequired is created"
  expect(startWithNewLineQuestion.getType()).toEqual("boolean"); // "property for startWithNewLine is created"
  expect(isRequiredQuestion.getType()).toEqual("boolean"); // "property for isRequired is created"
  expect(startWithNewLineQuestion.value).toEqual(true); // "startWithNewLine default value is true"
  expect(isRequiredQuestion.value).toEqual(false); //"isRequired default value is false"
  question.isRequired = true;
  expect(isRequiredQuestion.value).toEqual(true); //"isRequired is true now");
  isRequiredQuestion.value = false;
  expect(question.isRequired).toEqual(false); //"isRequired is false again - two way bindings"
});
test("dropdown property editor", () => {
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var titleLocationQuestion =
    propertyGrid.survey.getQuestionByName("titleLocation");
  expect(titleLocationQuestion.getType()).toEqual("dropdown"); //"correct property editor is created"
  expect(titleLocationQuestion.choices.length).toEqual(5); // "There are five choices"
  expect(titleLocationQuestion.value).toEqual("default"); //"the value is correct"
  question.titleLocation = "top";
  expect(titleLocationQuestion.value).toEqual("top"); //"property editor react on value chage"
  titleLocationQuestion.value = "bottom";
  expect(question.titleLocation).toEqual("bottom"); //"property editor change the question property"
});
test("dropdown property editor localization", (): any => {
  var survey = new SurveyModel();
  var propertyGrid = new PropertyGridModelTester(survey);
  var questionDescriptionLocationQuestion =
    propertyGrid.survey.getQuestionByName("questionDescriptionLocation");
  expect(questionDescriptionLocationQuestion.getType()).toEqual("buttongroup"); //"correct property editor is created" //since choices.length < 5 buttongroup rendered instead of dropdown
  expect(questionDescriptionLocationQuestion.choices[0].value).toEqual(
    "underInput"
  );
  expect(questionDescriptionLocationQuestion.choices[0].text).toEqual(
    "under input"
  );

  var showPreviewQuestion = propertyGrid.survey.getQuestionByName(
    "showPreviewBeforeComplete"
  );
  expect(showPreviewQuestion.getType()).toEqual("dropdown"); //"correct property editor is created" a lot of text
  expect(showPreviewQuestion.choices[0].value).toEqual("noPreview");
  expect(showPreviewQuestion.choices[0].text).toEqual("no preview");

  var localeQuestion = propertyGrid.survey.getQuestionByName("locale");
  expect(localeQuestion.getType()).toEqual("dropdown"); //"correct property editor is created"
  expect(localeQuestion.showOptionsCaption).toBeTruthy();
  expect(localeQuestion.optionsCaption).toEqual("Default (english)");
});

test("dropdown property editor, get choices on callback", () => {
  var choices = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  var callback = null;
  Serializer.addProperty("survey", {
    name: "region",
    choices: function (obj, choicesCallback) {
      callback = choicesCallback;
      return [];
    }
  });
  var survey = new SurveyModel();
  var propertyGrid = new PropertyGridModelTester(survey);
  var setQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("region")
  );
  expect(setQuestion.choices).toHaveLength(0);
  callback(choices);
  expect(setQuestion.choices).toHaveLength(5);
  Serializer.removeProperty("survey", "region");
});

test("set property editor", () => {
  Serializer.addProperty("question", {
    name: "prop1:set",
    choices: ["item1", "item2", "item3"]
  });
  var question = new QuestionTextModel("q1");
  question.prop1 = ["item1", "item3"];
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("prop1");
  expect(editQuestion.getType()).toEqual("checkbox");
  expect(editQuestion.choices.length).toEqual(3);
  expect(editQuestion.value).toHaveLength(2);
  expect(editQuestion.value[0]).toEqual("item1");
  expect(editQuestion.value[1]).toEqual("item3");
  question.prop1 = ["item2"];
  expect(editQuestion.value).toHaveLength(1);
  expect(editQuestion.value[0]).toEqual("item2");
  editQuestion.value = ["item2", "item3"];
  expect(question.prop1).toHaveLength(2);
  expect(question.prop1[0]).toEqual("item2");
  expect(question.prop1[1]).toEqual("item3");
  Serializer.removeProperty("question", "prop1");
});

test("string[] property editor", () => {
  var question = new QuestionTextModel("q1");
  question.dataList = ["item1", "item2"];
  var propertyGrid = new PropertyGridModelTester(question);
  var dataListQuestion = propertyGrid.survey.getQuestionByName("dataList");
  expect(dataListQuestion.getType()).toEqual("comment");
  expect(dataListQuestion.value).toEqual("item1\nitem2");
  dataListQuestion.value = "item1\nitem2\nitem3";
  expect(question.dataList).toHaveLength(3);
  expect(question.dataList[2]).toEqual("item3");
});
test("itemvalue[] property editor", () => {
  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  expect(choicesQuestion).toBeTruthy(); //"choices property editor created");
  expect(choicesQuestion.getType()).toEqual("matrixdynamic"); //"It is a matrix");
  expect(choicesQuestion.columns).toHaveLength(2); //"There are two columns");
  expect(choicesQuestion.visibleRows).toHaveLength(3); //"There are three elements"
  expect(choicesQuestion.visibleRows[0].cells[0].value).toEqual(1); //"the first cell value is 3"
  choicesQuestion.addRow();
  expect(question.choices).toHaveLength(4); // "There are 4 items now");
  expect(question.choices[3].getType()).toEqual("itemvalue"); //correct class created
  expect(choicesQuestion.visibleRows[3].cells[0].value).toEqual(4);
  expect(question.choices[3].value).toEqual(4); //"The last item value is 4");
  question.choices[1].text = "Item 2";
  expect(choicesQuestion.visibleRows[1].cells[1].value).toEqual("Item 2"); // "the second cell in second row is correct"
  question.choices[2].value = 333;
  expect(choicesQuestion.visibleRows[2].cells[0].value).toEqual(333); //"the first cell in third row is correct"
});
test("itemvalue[] property editor + detail panel", () => {
  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  var row = choicesQuestion.visibleRows[0];
  expect(row.hasPanel).toEqual(true); //"There is a detail panel here");
  row.showDetailPanel();
  expect(row.detailPanel).toBeTruthy(); //"Detail panel is showing");
  expect(row.detailPanel.getQuestionByName("value")).toBeTruthy(); //"value property is here"
});

test("column[] property editor", (): any => {
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.addColumn("col3");
  var propertyGrid = new PropertyGridModelTester(question);
  var columnsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  expect(columnsQuestion).toBeTruthy(); //"choices property editor created");
  expect(columnsQuestion.getType()).toEqual("matrixdynamic"); //"It is a matrix";
  expect(columnsQuestion.columns).toHaveLength(3); //"There are three columns");
  expect(columnsQuestion.columns[1].title).toEqual("Name");
  expect(columnsQuestion.visibleRows).toHaveLength(3); //"There are three elements"
  expect(columnsQuestion.visibleRows[0].cells[1].value).toEqual("col1"); //"the second cell value is 'col1'"
  columnsQuestion.visibleRows[0].cells[1].value = "col11";
  expect(question.columns[0].name).toEqual("col11"); //"column name has been changed"

  columnsQuestion.addRow();
  expect(question.columns).toHaveLength(4); //"There are 4 items now");
  expect(question.columns[3].getType()).toEqual("matrixdropdowncolumn"); //"Object created correctly"
  expect(question.columns[3].name).toEqual("col4"); //"Object created correctly"
  question.columns[1].title = "Column 2";
  expect(columnsQuestion.visibleRows[1].cells[2].value).toEqual("Column 2"); //"the third cell in second row is correct"
});

test("surveypages property editor", () => {
  var survey = new SurveyModel();
  survey.addNewPage("page1");
  survey.addNewPage("page2");
  survey.addNewPage("page3");
  var propertyGrid = new PropertyGridModelTester(survey);
  var pagesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("pages")
  );
  expect(pagesQuestion).toBeTruthy();
  expect(pagesQuestion.getType()).toEqual("matrixdynamic");
  expect(pagesQuestion.columns).toHaveLength(2);
  expect(pagesQuestion.columns[0].cellType).toEqual("text");
  expect(pagesQuestion.columns[0].title).toEqual("Name");
  expect(pagesQuestion.visibleRows).toHaveLength(3);
  expect(pagesQuestion.visibleRows[0].cells[0].value).toEqual("page1");
  expect(pagesQuestion.visibleRows[0].cells[1].value).toBeFalsy();
  pagesQuestion.visibleRows[0].cells[1].value = "My Page 1";
  expect(survey.pages[0].title).toEqual("My Page 1");

  pagesQuestion.addRow();
  expect(survey.pages).toHaveLength(4);
  expect(survey.pages[3].getType()).toEqual("page");
  expect(survey.pages[3].name).toEqual("page4");
  survey.pages[1].title = "Page 2";
  expect(pagesQuestion.visibleRows[1].cells[1].value).toEqual("Page 2");
});

test("Change editingObj of the property grid", () => {
  var question = new QuestionTextModel("q1");
  var question2 = new QuestionTextModel("q2");
  var propertyGrid = new PropertyGridModelTester(question);
  expect(propertyGrid.survey.getValue("name")).toEqual("q1"); //"name property value is set for the first editingObj"
  propertyGrid.obj = question2;
  expect(propertyGrid.survey.getValue("name")).toEqual("q2"); //"name property value is set for the second editingObj"
});
test("Check objValueChangedCallback", () => {
  var count = 0;
  var objValueChangedCallback = () => {
    count++;
  };
  var question = new QuestionTextModel("q1");
  var question2 = new QuestionTextModel("q2");
  var propertyGrid = new PropertyGridModelTester(question);
  propertyGrid.objValueChangedCallback = objValueChangedCallback;
  expect(count).toEqual(0); //"objValueChangedCallback isn't called");
  propertyGrid.obj = question2;
  expect(count).toEqual(1); //"objValueChangedCallback is called after changing obj value"
  propertyGrid.obj = question2;
  expect(count).toEqual(1); //"objValueChangedCallback isn't called after setting same obj value"
  propertyGrid.obj = question;
  expect(count).toEqual(2); //"objValueChangedCallback is called after changing obj value"
});
test("Support property visibleIf attribute", () => {
  var question = new QuestionCheckboxModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var otherTextPropEd = propertyGrid.survey.getQuestionByName("otherText");
  expect(otherTextPropEd).toBeTruthy(); //otherText is here
  expect(otherTextPropEd.isVisible).toEqual(false); //It hidden by default
  question.hasOther = true;
  expect(otherTextPropEd.isVisible).toEqual(true); //We show it now
});
test("Show property editor for condition/expression", () => {
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  expect(propertyGrid.survey.getQuestionByName("visibleIf")).toBeTruthy(); //visibleIf is here
  expect(
    propertyGrid.survey.getQuestionByName("defaultValueExpression")
  ).toBeTruthy(); //defaultValueExpression is here
});
test("Test options.allowEditExpressionsInTextEditor", () => {
  var question = new QuestionTextModel("q1");
  var options = new EmptySurveyCreatorOptions();
  options.allowEditExpressionsInTextEditor = false;
  var propertyGrid = new PropertyGridModelTester(question, options);
  var conditionQuestion = propertyGrid.survey.getQuestionByName("visibleIf");
  var expressionQuestion = propertyGrid.survey.getQuestionByName(
    "defaultValueExpression"
  );
  expect(conditionQuestion.isReadOnly).toBeTruthy();
  expect(expressionQuestion.isReadOnly).toBeFalsy();

  options.allowEditExpressionsInTextEditor = true;
  propertyGrid = new PropertyGridModelTester(question, options);
  conditionQuestion = propertyGrid.survey.getQuestionByName("visibleIf");
  expressionQuestion = propertyGrid.survey.getQuestionByName(
    "defaultValueExpression"
  );
  expect(conditionQuestion.isReadOnly).toBeFalsy();
  expect(expressionQuestion.isReadOnly).toBeFalsy();
});

test("Support question property editor", () => {
  var survey = new SurveyModel({
    elements: [
      { type: "text", name: "q1" },
      { type: "text", name: "q2" }
    ],
    triggers: [{ type: "skiptrigger", gotoName: "q2" }]
  });
  var trigger = survey.triggers[0];
  var propertyGrid = new PropertyGridModelTester(trigger);
  var gotoNamePropEd = propertyGrid.survey.getQuestionByName("gotoName");
  expect(gotoNamePropEd).toBeTruthy();
  expect(gotoNamePropEd.choices).toHaveLength(2);
  expect(gotoNamePropEd.choices[0].value).toEqual("q1");
  expect(gotoNamePropEd.value).toEqual("q2");
});

test("Support select base question property editor", () => {
  var survey = new SurveyModel({
    elements: [
      { type: "text", name: "q1" },
      { type: "text", name: "q2" },
      { type: "checkbox", name: "q3" },
      { type: "dropdown", name: "q4" }
    ]
  });
  var question = <QuestionDropdownModel>survey.getQuestionByName("q4");
  var propertyGrid = new PropertyGridModelTester(question);
  var gotoNamePropEd = propertyGrid.survey.getQuestionByName(
    "choicesFromQuestion"
  );
  expect(gotoNamePropEd).toBeTruthy();
  expect(gotoNamePropEd.choices).toHaveLength(1);
  expect(gotoNamePropEd.choices[0].value).toEqual("q3");
  expect(question.choicesFromQuestion).toBeFalsy();
  gotoNamePropEd.value = "q3";
  expect(question.choicesFromQuestion).toEqual("q3");
});

test("Validators property editor", () => {
  var question = new QuestionTextModel("q1");
  question.validators.push(new ExpressionValidator());
  var propertyGrid = new PropertyGridModelTester(question);
  var validatorsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("validators")
  );
  expect(validatorsQuestion).toBeTruthy(); //visibleIf is here
  expect(validatorsQuestion.columns).toHaveLength(1);
  expect(validatorsQuestion.visibleRows).toHaveLength(1);
  var validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[0].cells[0].question
  );
  expect(validatorTypeQuestion.getType()).toEqual("dropdown");
  expect(validatorTypeQuestion.showOptionsCaption).toBeFalsy();
  expect(validatorTypeQuestion.value).toEqual("expressionvalidator");
  var validatorCount = question.getSupportedValidators().length;
  expect(validatorTypeQuestion.choices).toHaveLength(validatorCount);
  validatorsQuestion.addRow();
  expect(question.validators).toHaveLength(2);
  expect(question.validators[1].getType()).toEqual("expressionvalidator");

  validatorTypeQuestion.value = "numericvalidator";
  expect(question.validators[0].getType()).toEqual("numericvalidator");
  expect(question.validators[1].getType()).toEqual("expressionvalidator");
  expect(validatorsQuestion.visibleRows[0].cells[0].value).toEqual(
    "numericvalidator"
  );
  expect(validatorsQuestion.visibleRows[1].cells[0].value).toEqual(
    "expressionvalidator"
  );
  validatorsQuestion.visibleRows[1].showDetailPanel();
  validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName(
    "text"
  ).value = "validator2 text";
  expect(question.validators[1].text).toEqual("validator2 text");
  validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[1].cells[0].question
  );
  validatorTypeQuestion.value = "numericvalidator";
  expect(
    validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName("text")
      .value
  ).toEqual("validator2 text");
  expect(
    validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName("minValue")
  ).toBeTruthy();
  expect(question.validators[0].getType()).toEqual("numericvalidator");
  expect(question.validators[1].getType()).toEqual("numericvalidator");
});
test("Validators property editor for column", () => {
  var matrix = new QuestionMatrixDynamicModel("q1");
  var column = matrix.addColumn("col1");
  column.cellType = "text";
  column.validators.push(new ExpressionValidator());
  var propertyGrid = new PropertyGridModelTester(column);
  var validatorsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("validators")
  );
  expect(validatorsQuestion).toBeTruthy(); //visibleIf is here
  expect(validatorsQuestion.columns).toHaveLength(1);
  expect(validatorsQuestion.visibleRows).toHaveLength(1);
  var validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[0].cells[0].question
  );
  expect(validatorTypeQuestion.getType()).toEqual("dropdown");
  expect(validatorTypeQuestion.showOptionsCaption).toBeFalsy();
  expect(validatorTypeQuestion.value).toEqual("expressionvalidator");
  var validatorCount = column.templateQuestion.getSupportedValidators().length;
  expect(validatorTypeQuestion.choices).toHaveLength(validatorCount);
  validatorsQuestion.addRow();
  expect(column.validators).toHaveLength(2);
  expect(column.validators[1].getType()).toEqual("expressionvalidator");

  validatorTypeQuestion.value = "numericvalidator";
  expect(column.validators[0].getType()).toEqual("numericvalidator");
  expect(column.validators[1].getType()).toEqual("expressionvalidator");
  expect(validatorsQuestion.visibleRows[0].cells[0].value).toEqual(
    "numericvalidator"
  );
  expect(validatorsQuestion.visibleRows[1].cells[0].value).toEqual(
    "expressionvalidator"
  );
  validatorsQuestion.visibleRows[1].showDetailPanel();
  validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName(
    "text"
  ).value = "validator2 text";
  expect(column.validators[1].text).toEqual("validator2 text");
  validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[1].cells[0].question
  );
  validatorTypeQuestion.value = "numericvalidator";
  expect(
    validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName("text")
      .value
  ).toEqual("validator2 text");
  expect(
    validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName("minValue")
  ).toBeTruthy();
  expect(column.validators[0].getType()).toEqual("numericvalidator");
  expect(column.validators[1].getType()).toEqual("numericvalidator");
});

test("Triggers property editor", () => {
  var survey = new SurveyModel();
  survey.triggers.push(new SurveyTriggerRunExpression());
  var propertyGrid = new PropertyGridModelTester(survey);
  var triggersQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("triggers")
  );
  expect(triggersQuestion).toBeTruthy(); //visibleIf is here
  expect(triggersQuestion.visibleRows).toHaveLength(1);
  var triggerTypeQuestion = triggersQuestion.visibleRows[0].cells[0].question;
  expect(triggerTypeQuestion.getType()).toEqual("dropdown");
  expect(triggerTypeQuestion.value).toEqual("runexpressiontrigger");
  expect(triggerTypeQuestion.choices).toHaveLength(5);
  triggersQuestion.addRow();
  expect(survey.triggers).toHaveLength(2);
  expect(survey.triggers[1].getType()).toEqual("runexpressiontrigger");

  triggerTypeQuestion.value = "completetrigger";
  expect(survey.triggers[0].getType()).toEqual("completetrigger");
  expect(survey.triggers[1].getType()).toEqual("runexpressiontrigger");
  expect(triggersQuestion.visibleRows[0].cells[0].value).toEqual(
    "completetrigger"
  );
  expect(triggersQuestion.visibleRows[1].cells[0].value).toEqual(
    "runexpressiontrigger"
  );
  triggersQuestion.visibleRows[1].showDetailPanel();
  triggersQuestion.visibleRows[1].detailPanel.getQuestionByName(
    "expression"
  ).value = "{q1} = 1";
  expect(survey.triggers[1].expression).toEqual("{q1} = 1");
  triggerTypeQuestion = <QuestionDropdownModel>(
    triggersQuestion.visibleRows[1].cells[0].question
  );
  expect(triggerTypeQuestion.showOptionsCaption).toBeFalsy();
  triggerTypeQuestion.value = "completetrigger";
  expect(
    triggersQuestion.visibleRows[1].detailPanel.getQuestionByName("expression")
      .value
  ).toEqual("{q1} = 1");
  expect(survey.triggers[0].getType()).toEqual("completetrigger");
  expect(survey.triggers[1].getType()).toEqual("completetrigger");
});

test("calculatedValues property editor", () => {
  var survey = new SurveyModel();
  survey.calculatedValues.push(new CalculatedValue("var1", "{q1}=1"));
  var propertyGrid = new PropertyGridModelTester(survey);
  var calcValuesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("calculatedValues")
  );
  expect(calcValuesQuestion).toBeTruthy();
  expect(calcValuesQuestion.visibleRows).toHaveLength(1);
  expect(calcValuesQuestion.columns).toHaveLength(2);
  expect(calcValuesQuestion.columns[0].cellType).toEqual("text");
  expect(calcValuesQuestion.columns[1].cellType).toEqual("text");
  calcValuesQuestion.visibleRows[0].showDetailPanel();
  var expQ =
    calcValuesQuestion.visibleRows[0].detailPanel.getQuestionByName(
      "expression"
    );
  expect(expQ).toBeTruthy();
  expect(expQ.value).toEqual("{q1}=1");
  expQ.value = "{q1}=2";
  expect(survey.calculatedValues[0].expression).toEqual("{q1}=2");
  calcValuesQuestion.addRow();
  expect(survey.calculatedValues).toHaveLength(2);
  expect(survey.calculatedValues[1].name).toEqual("var2");
});

test("htmlConditions property editor", () => {
  var survey = new SurveyModel();
  survey.completedHtmlOnCondition.push(new HtmlConditionItem("{q1}=1"));
  var propertyGrid = new PropertyGridModelTester(survey);
  var htmlConditionsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("completedHtmlOnCondition")
  );
  expect(htmlConditionsQuestion).toBeTruthy();
  expect(htmlConditionsQuestion.visibleRows).toHaveLength(1);
  htmlConditionsQuestion.visibleRows[0].showDetailPanel();
  var expQ =
    htmlConditionsQuestion.visibleRows[0].detailPanel.getQuestionByName(
      "expression"
    );
  expect(expQ).toBeTruthy();
  expect(expQ.value).toEqual("{q1}=1");
  expQ.value = "{q1}=2";
  expect(survey.completedHtmlOnCondition[0].expression).toEqual("{q1}=2");
  htmlConditionsQuestion.addRow();
  expect(survey.completedHtmlOnCondition).toHaveLength(2);
});
test("urlconditions property editor", () => {
  var survey = new SurveyModel();
  survey.navigateToUrlOnCondition.push(new UrlConditionItem("{q1}=1", "url1"));
  var propertyGrid = new PropertyGridModelTester(survey);
  var urlConditionsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("navigateToUrlOnCondition")
  );
  expect(urlConditionsQuestion).toBeTruthy();
  expect(urlConditionsQuestion.visibleRows).toHaveLength(1);
  urlConditionsQuestion.visibleRows[0].showDetailPanel();
  var expQ =
    urlConditionsQuestion.visibleRows[0].detailPanel.getQuestionByName(
      "expression"
    );
  expect(expQ).toBeTruthy();
  expect(expQ.value).toEqual("{q1}=1");
  expQ.value = "{q1}=2";
  expect(survey.navigateToUrlOnCondition[0].expression).toEqual("{q1}=2");
  urlConditionsQuestion.addRow();
  expect(survey.navigateToUrlOnCondition).toHaveLength(2);
});

test("QuestionMultipleTextModel items property editor", () => {
  var question = new QuestionMultipleTextModel("q1");
  question.addItem("item1", "Item 1");
  var propertyGrid = new PropertyGridModelTester(question);
  var itemsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("items")
  );
  expect(itemsQuestion).toBeTruthy();
  var rows = itemsQuestion.visibleRows;
  expect(rows).toHaveLength(1);
  var nameQuestion = rows[0].getQuestionByName("name");
  expect(nameQuestion.value).toEqual("item1");
  nameQuestion.value = "item11";
  expect(question.items[0].name).toEqual("item11");
  question.items[0].name = "item1";
  rows[0].showDetailPanel();
  var titleQ =
    itemsQuestion.visibleRows[0].detailPanel.getQuestionByName("title");
  expect(titleQ).toBeTruthy();
  expect(titleQ.value).toEqual("Item 1");
  titleQ.value = "item 2";
  expect(question.items[0].title).toEqual("item 2");
  itemsQuestion.addRow();
  expect(question.items).toHaveLength(2);
  expect(question.items[1].name).toEqual("item2");
});
test("QuestionMultipleTextModel items property editor + validators editor", () => {
  var multipleQuestion = new QuestionMultipleTextModel("q1");
  var textItem = multipleQuestion.addItem("item1", "Item 1");
  var propertyGrid = new PropertyGridModelTester(multipleQuestion);
  var itemsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("items")
  );
  expect(itemsQuestion).toBeTruthy();
  var rows = itemsQuestion.visibleRows;
  rows[0].showDetailPanel();
  var validatorsQuestion = <QuestionMatrixDynamicModel>(
    rows[0].detailPanel.getQuestionByName("validators")
  );
  expect(validatorsQuestion).toBeTruthy(); //visibleIf is here
  expect(validatorsQuestion.columns).toHaveLength(1);
  expect(validatorsQuestion.visibleRows).toHaveLength(0);
  validatorsQuestion.addRow();
  expect(validatorsQuestion.visibleRows).toHaveLength(1);
  expect(validatorsQuestion.visibleRows[0].editingObj.getType()).toEqual(
    "expressionvalidator"
  );
  expect(textItem.validators).toHaveLength(1);
  expect(textItem.validators[0].getType()).toEqual("expressionvalidator");
  var validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[0].cells[0].question
  );
  expect(validatorTypeQuestion.getType()).toEqual("dropdown");
  expect(validatorTypeQuestion.showOptionsCaption).toBeFalsy();
  expect(validatorTypeQuestion.value).toEqual("expressionvalidator");
  var validatorCount = textItem.editor.getSupportedValidators().length;
  expect(validatorTypeQuestion.choices).toHaveLength(validatorCount);
  validatorsQuestion.addRow();
  expect(textItem.validators).toHaveLength(2);
  expect(textItem.validators[1].getType()).toEqual("expressionvalidator");
  expect(validatorsQuestion.visibleRows[1].editingObj.getType()).toEqual(
    "expressionvalidator"
  );
  validatorsQuestion.visibleRows[0].editingObj["data"] = "test";
  expect(textItem.validators[0]["data"]).toEqual("test");
  validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[0].cells[0].question
  );
  validatorTypeQuestion.value = "numericvalidator";
  expect(textItem.validators[0].getType()).toEqual("numericvalidator");
  expect(textItem.validators[1].getType()).toEqual("expressionvalidator");
  expect(validatorsQuestion.visibleRows[0].cells[0].value).toEqual(
    "numericvalidator"
  );
  expect(validatorsQuestion.visibleRows[0].editingObj["data"]).toBeFalsy();
  validatorsQuestion.visibleRows[0].showDetailPanel();
  expect(
    validatorsQuestion.visibleRows[0].detailPanel.getQuestionByName("minValue")
  ).toBeTruthy();
  expect(validatorsQuestion.visibleRows[1].cells[0].value).toEqual(
    "expressionvalidator"
  );
  validatorsQuestion.visibleRows[1].showDetailPanel();
  validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName(
    "text"
  ).value = "validator2 text";
  expect(textItem.validators[1].text).toEqual("validator2 text");
  validatorTypeQuestion = <QuestionDropdownModel>(
    validatorsQuestion.visibleRows[1].cells[0].question
  );
  validatorTypeQuestion.value = "numericvalidator";
  expect(
    validatorsQuestion.visibleRows[1].detailPanel.getQuestionByName("text")
      .value
  ).toEqual("validator2 text");
  expect(textItem.validators[0].getType()).toEqual("numericvalidator");
  expect(textItem.validators[1].getType()).toEqual("numericvalidator");
});

test("bindings property editor", () => {
  var survey = new SurveyModel({
    elements: [
      { type: "text", name: "q2" },
      { type: "matrixdynamic", name: "q1", bindings: { rowCount: "q2" } },
      { type: "text", name: "q3" }
    ]
  });
  var matrix = <QuestionMatrixDynamicModel>survey.getQuestionByName("q1");
  var propertyGrid = new PropertyGridModelTester(matrix);
  var bindingsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("bindings")
  );
  expect(bindingsQuestion).toBeTruthy();
  expect(bindingsQuestion.getType()).toEqual("matrixdropdown");
  expect(bindingsQuestion.visibleRows).toHaveLength(1);
  expect(bindingsQuestion.visibleRows[0].rowName).toEqual("rowCount");
  expect(bindingsQuestion.columns).toHaveLength(1);
  var q = bindingsQuestion.visibleRows[0].cells[0].question;
  expect(q.choices).toHaveLength(3);
  expect(q.value).toEqual("q2");
  q.value = "q3";
  expect(matrix.bindings.getValueNameByPropertyName("rowCount")).toEqual("q3");
});
test("restfull property editor", () => {
  var question = new QuestionDropdownModel("q1");
  question.choicesByUrl.url = "myUrl";
  var propertyGrid = new PropertyGridModelTester(question);
  var restFullQuestion = <QuestionCompositeModel>(
    propertyGrid.survey.getQuestionByName("choicesByUrl")
  );
  expect(restFullQuestion).toBeTruthy();
  expect(restFullQuestion.getType()).toEqual("propertygrid_restfull");
  var urlQuestion = restFullQuestion.contentPanel.getQuestionByName("url");
  expect(urlQuestion).toBeTruthy();
  expect(urlQuestion.value).toEqual("myUrl");
  urlQuestion.value = "myUrl2";
  expect(question.choicesByUrl.url).toEqual("myUrl2");
});
test("options.readOnly is true", () => {
  var options = new EmptySurveyCreatorOptions();
  options.readOnly = true;
  var question = new QuestionDropdownModel("q1");
  var propertyGrid = new PropertyGridModelTester(question, options);
  expect(propertyGrid.survey.mode).toEqual("display");
});
test("options.onCanShowPropertyCallback and property visibility", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCanShowPropertyCallback = (
    object: any,
    property: JsonObjectProperty,
    showMode: string,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    return property.name == "name" || property.name == "renderAs";
  };
  var question = new QuestionDropdownModel("q1");
  var propertyGrid = new PropertyGridModelTester(question, options);
  expect(propertyGrid.survey.getQuestionByName("name").isVisible).toEqual(true);
  expect(propertyGrid.survey.getQuestionByName("isRequired").isVisible).toEqual(
    false
  );
});
test("options.onIsPropertyReadOnlyCallback and property enable/disable", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onIsPropertyReadOnlyCallback = (
    object: any,
    property: JsonObjectProperty,
    readOnly: boolean,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    return property.name == "name" || property.name == "renderAs";
  };
  var question = new QuestionDropdownModel("q1");
  var propertyGrid = new PropertyGridModelTester(question, options);
  expect(propertyGrid.survey.getQuestionByName("name").isReadOnly).toEqual(
    true
  );
  expect(
    propertyGrid.survey.getQuestionByName("isRequired").isReadOnly
  ).toEqual(false);
});

test("property visibleIf attribute and options.onCanShowPropertyCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCanShowPropertyCallback = (
    object: any,
    property: JsonObjectProperty,
    showMode: string,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    return false;
  };
  var question = new QuestionCheckboxModel("q1");
  var propertyGrid = new PropertyGridModelTester(question, options);
  var otherTextPropEd = propertyGrid.survey.getQuestionByName("otherText");
  expect(otherTextPropEd.isVisible).toEqual(false);
  question.hasOther = true;
  expect(otherTextPropEd.isVisible).toEqual(false);
});
test("restfull property editor and options.onCanShowPropertyCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCanShowPropertyCallback = (
    object: any,
    property: JsonObjectProperty,
    showMode: string,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    return property.name == "choicesByUrl" || property.name == "url";
  };
  var question = new QuestionDropdownModel("q1");
  question.choicesByUrl.url = "myUrl";
  var propertyGrid = new PropertyGridModelTester(question);
  var restFullQuestion = <QuestionCompositeModel>(
    propertyGrid.survey.getQuestionByName("choicesByUrl")
  );
  expect(restFullQuestion).toBeTruthy();
  expect(restFullQuestion.getType()).toEqual("propertygrid_restfull");
  var urlQuestion = restFullQuestion.contentPanel.getQuestionByName("url");
  expect(urlQuestion.visible).toEqual(true);
  var pathQuestion = restFullQuestion.contentPanel.getQuestionByName("path");
  expect(pathQuestion.visible).toEqual(true);

  urlQuestion.value = "myUrl2";
  expect(question.choicesByUrl.url).toEqual("myUrl2");
});
test("itemvalue[] property editor + detail panel + options.onCanShowPropertyCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCanShowPropertyCallback = (
    object: any,
    property: JsonObjectProperty,
    showMode: string,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    return property.name !== "enableIf";
  };
  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  var row = choicesQuestion.visibleRows[0];
  row.showDetailPanel();
  expect(row.detailPanel.getQuestionByName("visibleIf").visible).toBeTruthy();
  expect(row.detailPanel.getQuestionByName("enableIf").visible).toBeFalsy();
});
test("itemvalue[] property editor + detail panel + options.onIsPropertyReadOnlyCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onIsPropertyReadOnlyCallback = (
    object: any,
    property: JsonObjectProperty,
    readOnly: boolean,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    if (!parentObj || !parentProperty) return readOnly;
    return (
      property.name == "enableIf" &&
      parentObj.getType() == "matrixdropdown" &&
      parentProperty.name == "rows"
    );
  };
  var question = new QuestionMatrixDropdownModel("q1");
  question.rows = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("rows")
  );
  var row = choicesQuestion.visibleRows[0];
  row.showDetailPanel();
  expect(row.detailPanel.getQuestionByName("visibleIf").readOnly).toEqual(
    false
  );
  expect(row.detailPanel.getQuestionByName("enableIf").readOnly).toEqual(true);
});

test("itemvalue[] property editor + create columns + options.onCanShowPropertyCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCanShowPropertyCallback = (
    object: any,
    property: JsonObjectProperty,
    showMode: string,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    return showMode != "list" || property.name !== "text";
  };
  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  expect(choicesQuestion.columns).toHaveLength(1);
  expect(choicesQuestion.columns[0].name).toEqual("value");

  question = new QuestionDropdownModel("q1");
  propertyGrid = new PropertyGridModelTester(question, options);
  choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  expect(choicesQuestion.columns).toHaveLength(1);
});

test("itemvalue[] property editor  + create columns + options.onIsPropertyReadOnlyCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onIsPropertyReadOnlyCallback = (
    object: any,
    property: JsonObjectProperty,
    readOnly: boolean,
    parentObj: any,
    parentProperty: JsonObjectProperty
  ): boolean => {
    if (!parentObj || !parentProperty) return readOnly;
    return (
      property.name == "value" &&
      parentObj.getType() == "matrixdropdown" &&
      parentProperty.name == "rows"
    );
  };
  var question = new QuestionMatrixDropdownModel("q1");
  question.rows = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("rows")
  );
  expect(choicesQuestion.columns).toHaveLength(2);
  var rows = choicesQuestion.visibleRows;
  expect(choicesQuestion.columns[0].name).toEqual("value");
  expect(rows[0].cells[0].question.value).toEqual(1);
  expect(rows[0].cells[0].question.isReadOnly).toBeTruthy();
  expect(rows[0].cells[1].question.isReadOnly).toBeFalsy();
  expect(rows[1].cells[0].question.isReadOnly).toBeTruthy();
  expect(rows[1].cells[1].question.isReadOnly).toBeFalsy();
});

test("options.onCollectionItemDeletingCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCollectionItemDeletingCallback = (
    obj: Base,
    property: JsonObjectProperty,
    collection: Array<Base>,
    item: Base
  ): boolean => {
    //check all properties
    return (
      item["name"] == "page3" &&
      property.name == "pages" &&
      collection.length == 3 &&
      obj.getType() == "survey"
    );
  };
  var survey = new SurveyModel();
  survey.addNewPage("page1");
  survey.addNewPage("page2");
  survey.addNewPage("page3");
  var propertyGrid = new PropertyGridModelTester(survey, options);
  var pagesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("pages")
  );
  var rows = pagesQuestion.visibleRows;
  expect(pagesQuestion.canRemoveRow(rows[0])).toBeFalsy();
  expect(pagesQuestion.canRemoveRow(rows[1])).toBeFalsy();
  expect(pagesQuestion.canRemoveRow(rows[2])).toBeTruthy();
});
test("options.onCanDeleteItemCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onCanDeleteItemCallback = (
    object: any,
    item: Base,
    allowDelete: boolean
  ): boolean => {
    //check all properties
    return item["name"] == "col2" && object.getType() == "matrixdynamic";
  };
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.addColumn("col3");
  var propertyGrid = new PropertyGridModelTester(question, options);
  var columnsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  var rows = columnsQuestion.visibleRows;
  expect(columnsQuestion.canRemoveRow(rows[0])).toBeFalsy();
  expect(columnsQuestion.canRemoveRow(rows[1])).toBeTruthy();
  expect(columnsQuestion.canRemoveRow(rows[2])).toBeFalsy();
});
test("options.onItemValueAddedCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onItemValueAddedCallback = (
    obj: Base,
    propertyName: string,
    itemValue: ItemValue,
    itemValues: Array<ItemValue>
  ) => {
    itemValue.text =
      obj.getType() +
      ":" +
      propertyName +
      "," +
      itemValue.value +
      "," +
      itemValues.length.toString();
  };

  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  var rows = choicesQuestion.visibleRows;
  choicesQuestion.addRow();
  expect(question.choices).toHaveLength(4);
  expect(question.choices[3].text).toEqual("dropdown:choices,4,4");
});
test("options.onMatrixDropdownColumnAddedCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onMatrixDropdownColumnAddedCallback = (
    matrix: Question,
    column: MatrixDropdownColumn,
    columns: Array<MatrixDropdownColumn>
  ) => {
    column.title = matrix.name + ":" + columns.length;
  };
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.addColumn("col3");
  var propertyGrid = new PropertyGridModelTester(question, options);
  var columnsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  var rows = columnsQuestion.visibleRows;
  columnsQuestion.addRow();
  expect(question.columns[3].title).toEqual("q1:4");
});
test("options.onSetPropertyEditorOptionsCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  var propName = "";
  var object = null;
  options.onSetPropertyEditorOptionsCallback = (
    propertyName: string,
    obj: Base,
    options: any
  ) => {
    if (propertyName != "choices") return;
    propName = propertyName;
    object = obj;
    options.allowAddRemoveItems = false;
    //TODO we do not have these functionality yet
    //options.allowRemoveAllItems
    //options.showTextView
    //options.itemsEntryType
  };

  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var choicesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("choices")
  );
  expect(propName).toEqual("choices");
  expect(object.getType()).toEqual("dropdown");
  expect(choicesQuestion.allowAddRows).toEqual(false);
  expect(choicesQuestion.allowRemoveRows).toEqual(false);
});

test("options.onValueChangingCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onValueChangingCallback = (options: any) => {
    if (options.propertyName != "name") return;
    if (options.obj.getType() == "dropdown" && options.newValue.length > 3) {
      options.newValue = options.newValue.substring(0, 3);
    }
  };

  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var nameQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("name")
  );
  nameQuestion.value = "q2";
  expect(question.name).toEqual("q2");
  nameQuestion.value = "qq22";
  expect(question.name).toEqual("qq2");
});

test("options.onGetErrorTextOnValidationCallback", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onGetErrorTextOnValidationCallback = (
    propertyName: string,
    obj: Base,
    value: any
  ): string => {
    if (propertyName != "name") return;
    if (obj.getType() != "dropdown" || value.length != 3) return "No3Letters";
    return null;
  };

  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var nameQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("name")
  );
  nameQuestion.value = "q2";
  expect(nameQuestion.errors).toHaveLength(1);
  expect(nameQuestion.errors[0].text).toEqual("No3Letters");
  expect(question.name).toEqual("q1");
  nameQuestion.value = "qq2";
  expect(nameQuestion.errors).toHaveLength(0);
  expect(question.name).toEqual("qq2");
});
test("options.onPropertyValueChanged", () => {
  var options = new EmptySurveyCreatorOptions();
  var changedValue = "";
  options.onSurveyElementPropertyValueChanged = (
    // options.onPropertyValueChanged = (
    property: JsonObjectProperty,
    obj: any,
    newValue: any
  ) => {
    if (property.name != "name") return;
    if (obj.getType() == "dropdown") {
      changedValue = newValue;
    }
  };

  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3];
  var propertyGrid = new PropertyGridModelTester(question, options);
  var nameQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("name")
  );
  nameQuestion.value = "q2";
  expect(changedValue).toEqual("q2");
  nameQuestion.value = "qq22";
  expect(changedValue).toEqual("qq22");
});

test("options.onValueChangingCallback in matrix", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onValueChangingCallback = (options: any) => {
    if (options.propertyName != "name") return;
    if (
      options.obj.getType() == "matrixdropdowncolumn" &&
      options.newValue.length > 5
    ) {
      options.newValue = options.newValue.substring(0, 5);
    }
  };
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.addColumn("col3");
  var propertyGrid = new PropertyGridModelTester(question, options);
  var columnsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  columnsQuestion.visibleRows[0].getQuestionByColumnName("name").value =
    "col1234";
  expect(question.columns[0].name).toEqual("col12");
});
test("options.onGetErrorTextOnValidationCallback in matrix", () => {
  var options = new EmptySurveyCreatorOptions();
  options.onGetErrorTextOnValidationCallback = (
    propertyName: string,
    obj: Base,
    value: any
  ): string => {
    if (propertyName != "name") return;
    if (obj.getType() != "matrixdropdowncolumn" || value.length != 5)
      return "No5Letters";
    return null;
  };
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.addColumn("col3");
  var propertyGrid = new PropertyGridModelTester(question, options);
  var columnsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  columnsQuestion.visibleRows[0].getQuestionByColumnName("name").value =
    "col1234";
  expect(question.columns[0].name).toEqual("col1");
  columnsQuestion.visibleRows[0].getQuestionByColumnName("name").value =
    "col12";
  expect(question.columns[0].name).toEqual("col12");
});
test("options.onPropertyValueChanged in matrix", () => {
  var options = new EmptySurveyCreatorOptions();
  var changedValue = "";
  options.onSurveyElementPropertyValueChanged = (
    // options.onPropertyValueChanged = (
    property: JsonObjectProperty,
    obj: any,
    newValue: any
  ) => {
    if (property.name != "name") return;
    if (obj.getType() == "matrixdropdowncolumn") {
      changedValue = newValue;
    }
  };
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.addColumn("col3");
  var propertyGrid = new PropertyGridModelTester(question, options);
  var columnsQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  columnsQuestion.visibleRows[0].getQuestionByColumnName("name").value =
    "col1234";
  expect(changedValue).toEqual("col1234");
});

test("DefaultValue editor", () => {
  PropertyGridEditorCollection.register(new PropertyGridValueEditor());
  var question = new QuestionDropdownModel("q1");
  question.choices = [1, 2, 3, 4, 5];
  question.defaultValue = 2;
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("defaultValue");
  expect(editQuestion).toBeTruthy();
  expect(editQuestion.getType()).toEqual("propertygrid_value");
  expect(editQuestion.value).toEqual(2);
  expect(editQuestion.contentQuestion.html).toEqual("2");
  expect(editQuestion.isReadOnly).toBeFalsy();
  var editor = <PropertyGridValueEditor>(
    PropertyGridEditorCollection.getEditor(editQuestion.property)
  );
  const titleActions = editQuestion.getTitleActions();
  expect(titleActions).toHaveLength(2);
  expect(titleActions[1].disabled).toBeFalsy();
  expect(editor).toBeTruthy();
  var valueEditor = editor.createPropertyEditorSetup(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  var valueQuestion = valueEditor.editSurvey.getQuestionByName("question");
  expect(valueQuestion).toBeTruthy();
  expect(valueQuestion.value).toEqual(2);
  valueQuestion.value = 4;
  valueEditor.apply();
  expect(question.defaultValue).toEqual(4);
  editor.clearPropertyValue(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  expect(question.defaultValue).toBeFalsy();
});
test("DefaultValue editor, use display value", () => {
  PropertyGridEditorCollection.register(new PropertyGridValueEditor());
  var question = new QuestionCheckboxModel("q1");
  question.choices = [
    { value: 1, text: "Item 1" },
    { value: 2, text: "Item 2" }
  ];
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("defaultValue");
  var htmlQuestion = editQuestion.contentQuestion;
  expect(htmlQuestion.html).toEqual("Value is empty");
  question.defaultValue = [1, 2];
  expect(htmlQuestion.html).toEqual("Item 1, Item 2");
  question.defaultValue = undefined;
  expect(htmlQuestion.html).toEqual("Value is empty");
});

test("DefaultValue editor for invisible values", () => {
  PropertyGridEditorCollection.register(new PropertyGridValueEditor());
  var question = new QuestionDropdownModel("q1");
  question.visibleIf = "{q2} = 1";
  question.visible = false;
  question.choices = [
    { value: 1, visibleIf: "{q2} = 2}" },
    { value: 2, enableIf: "{q2} = 2}" },
    3
  ];
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("defaultValue");
  var editor = <PropertyGridValueEditor>(
    PropertyGridEditorCollection.getEditor(editQuestion.property)
  );
  var valueEditor = editor.createPropertyEditorSetup(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  var valueQuestion = valueEditor.editSurvey.getQuestionByName("question");
  expect(valueQuestion).toBeTruthy();
  expect(valueQuestion.isVisible).toBeTruthy();
  expect(valueQuestion.visibleChoices).toHaveLength(3);
  expect(valueQuestion.visibleChoices[1].isEnabled).toBeTruthy();
});

test("DefaultRowValue editor", () => {
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  question.rowCount = 2;
  question.defaultRowValue = { col1: 1, col2: 2 };
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("defaultRowValue");
  expect(editQuestion).toBeTruthy();
  var editor = <PropertyGridRowValueEditor>(
    PropertyGridEditorCollection.getEditor(editQuestion.property)
  );
  expect(editor).toBeTruthy();
  var valueEditor = editor.createPropertyEditorSetup(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  var valueQuestion = valueEditor.editSurvey.getQuestionByName("question");
  expect(valueQuestion).toBeTruthy();
  expect(valueQuestion.value).toEqual([{ col1: 1, col2: 2 }]);
  valueQuestion.value = [{ col1: 3, col2: 4 }];
  valueEditor.apply();
  expect(question.defaultRowValue).toEqual({ col1: 3, col2: 4 });
  editor.clearPropertyValue(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  expect(question.defaultRowValue).toBeFalsy();
});
test("DefaultPanelValue editor", () => {
  var question = new QuestionPanelDynamicModel("q1");
  question.template.addNewQuestion("text", "q1");
  question.template.addNewQuestion("text", "q2");
  question.panelCount = 2;
  question.defaultPanelValue = { q1: 1, q2: 2 };
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("defaultPanelValue");
  expect(editQuestion).toBeTruthy();
  var editor = <PropertyGridRowValueEditor>(
    PropertyGridEditorCollection.getEditor(editQuestion.property)
  );
  expect(editor).toBeTruthy();
  var valueEditor = editor.createPropertyEditorSetup(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  var valueQuestion = valueEditor.editSurvey.getQuestionByName("question");
  expect(valueQuestion).toBeTruthy();
  expect(valueQuestion.value).toEqual([{ q1: 1, q2: 2 }]);
  valueQuestion.value = [{ q1: 3, q2: 4 }];
  valueEditor.apply();
  expect(question.defaultPanelValue).toEqual({ q1: 3, q2: 4 });
  editor.clearPropertyValue(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  expect(question.defaultPanelValue).toBeFalsy();
});
test("Matrix cells editor", () => {
  var question = new QuestionMatrixModel("q1");
  question.columns = ["col1", "col2"];
  question.rows = ["row1", "row2"];
  question.cells.setJson({
    default: { col1: "dCol1" },
    row1: { col1: "val1" },
    row2: { col2: "val2" }
  });
  expect(question.cells.getJson()).toEqual({
    default: { col1: "dCol1" },
    row1: { col1: "val1" },
    row2: { col2: "val2" }
  });
  var propertyGrid = new PropertyGridModelTester(question);
  var editQuestion = propertyGrid.survey.getQuestionByName("cells");
  expect(editQuestion).toBeTruthy();
  var editor = <PropertyGridRowValueEditor>(
    PropertyGridEditorCollection.getEditor(editQuestion.property)
  );
  expect(editor).toBeTruthy();
  var valueEditor = editor.createPropertyEditorSetup(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  var valueQuestion = valueEditor.editSurvey.getQuestionByName("question");
  expect(valueQuestion).toBeTruthy();
  expect(valueQuestion.value).toEqual({
    default: { col1: "dCol1" },
    row1: { col1: "val1" },
    row2: { col2: "val2" }
  });
  valueQuestion.value = {
    default: { col2: "dCol2" },
    row1: { col2: "val3" },
    row2: { col1: "val4" }
  };
  valueEditor.apply();
  expect(question.cells.getJson()).toEqual({
    default: { col2: "dCol2" },
    row1: { col2: "val3" },
    row2: { col1: "val4" }
  });
  editor.clearPropertyValue(
    question,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  expect(question.cells.getJson()).toBeFalsy();
});
test("trigger value editor", () => {
  var survey = new SurveyModel({
    elements: [
      { type: "dropdown", name: "q1", choices: [1, 2, 3, 4, 5] },
      { type: "text", name: "q2" }
    ],
    triggers: [
      {
        type: "setvalue",
        expression: "{q2} = 1",
        setToName: "q1",
        setValue: 1
      }
    ]
  });
  var trigger = <SurveyTriggerSetValue>survey.triggers[0];

  var propertyGrid = new PropertyGridModelTester(trigger);
  var editQuestion = propertyGrid.survey.getQuestionByName("setValue");
  expect(editQuestion).toBeTruthy();
  var editor = <PropertyGridRowValueEditor>(
    PropertyGridEditorCollection.getEditor(editQuestion.property)
  );
  expect(editor).toBeTruthy();
  var valueEditor = editor.createPropertyEditorSetup(
    trigger,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  var valueQuestion = valueEditor.editSurvey.getQuestionByName("question");
  expect(valueQuestion).toBeTruthy();
  expect(valueQuestion.value).toEqual(1);
  expect(valueQuestion.choices).toHaveLength(5);
  valueQuestion.value = 3;
  valueEditor.apply();
  expect(trigger.setValue).toEqual(3);
  editor.clearPropertyValue(
    trigger,
    editQuestion.property,
    editQuestion,
    new EmptySurveyCreatorOptions()
  );
  expect(trigger.setValue).toBeFalsy();
});
test("Create setvalue trigger", () => {
  var survey = new SurveyModel({
    elements: [
      { type: "dropdown", name: "q1", choices: [1, 2, 3, 4, 5] },
      { type: "text", name: "q2" }
    ]
  });
  var propertyGrid = new PropertyGridModelTester(survey);
  var triggersQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("triggers")
  );
  expect(triggersQuestion).toBeTruthy();
  expect(triggersQuestion.detailPanelShowOnAdding).toBeTruthy();
  triggersQuestion.addRow();
  expect(triggersQuestion.visibleRows[0].detailPanel).toBeTruthy();
  triggersQuestion.visibleRows[0].getQuestionByName("triggerType").value =
    "setvaluetrigger";
  var setValueQuestion = <QuestionCustomModel>(
    triggersQuestion.visibleRows[0].detailPanel.getQuestionByName("setValue")
  );
  expect(setValueQuestion).toBeTruthy();
  expect(setValueQuestion.isVisible).toBeFalsy();
  var setToNameQuestion =
    triggersQuestion.visibleRows[0].detailPanel.getQuestionByName("setToName");
  expect(setToNameQuestion).toBeTruthy();
  setToNameQuestion.value = "q1";
  expect(setValueQuestion.isVisible).toBeTruthy();
  var actions = setValueQuestion.getTitleActions();
  expect(actions).toHaveLength(2);
  actions[1].action();
  setValueQuestion.value = 2;
  expect(setValueQuestion.contentQuestion.html).toEqual("2");
  expect(survey.triggers).toHaveLength(1);
  var trigger = <SurveyTriggerSetValue>survey.triggers[0];
  expect(trigger.getType()).toEqual("setvaluetrigger");
  expect(trigger.setToName).toEqual("q1");
  expect(trigger.setValue).toEqual(2);
  actions[0].action();
  expect(trigger.setValue).toBeFalsy();
  expect(setValueQuestion.value).toBeFalsy();
  expect(setValueQuestion.contentQuestion.html).toEqual("Value is empty");
});
test("Support maximumColumnsCount option", () => {
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  var options = new EmptySurveyCreatorOptions();
  options.maximumColumnsCount = 3;
  var propertyGrid = new PropertyGridModelTester(question, options);
  var editQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  expect(editQuestion.maxRowCount).toEqual(3);
  var actions = editQuestion.getTitleActions();

  var addAction = undefined;
  for (var i = 0; i < actions.length; i++) {
    if (actions[i].id == "add-item") {
      addAction = actions[i];
      break;
    }
  }
  expect(addAction).toBeTruthy();
  expect(addAction.enabled()).toBeTruthy();
  question.addColumn("col3");
  expect(addAction.enabled()).toBeFalsy();
});
test("Edit columns in property grid", () => {
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  var options = new EmptySurveyCreatorOptions();
  var propertyGrid = new PropertyGridModelTester(question, options);
  var editQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("columns")
  );
  var rows = editQuestion.visibleRows;
  var actions: Array<IActionBarItem> = [];
  propertyGrid.survey.getUpdatedMatrixRowActions(
    editQuestion,
    rows[0],
    actions
  );
  expect(actions).toHaveLength(1);
  expect(actions[0].id).toEqual("svd-grid-edit-column");
  actions[0].action();
  expect(propertyGrid.obj["name"]).toEqual("col1");
  expect(propertyGrid.survey.getQuestionByName("cellType")).toBeTruthy();
  expect(propertyGrid.survey.getQuestionByName("name").value).toEqual("col1");
  propertyGrid.survey.getQuestionByName("name").value = "col3";
  expect(question.columns[0].name).toEqual("col3");
  propertyGrid.survey.getQuestionByName("cellType").value = "text";
  expect(question.columns[0].cellType).toEqual("text");
});
test("Change cellType in the column in property grid", () => {
  var question = new QuestionMatrixDynamicModel("q1");
  question.addColumn("col1");
  question.addColumn("col2");
  var options = new EmptySurveyCreatorOptions();
  var propertyGrid = new PropertyGridModelTester(question.columns[0], options);
  expect(propertyGrid.survey.getQuestionByName("name").value).toEqual("col1");
  var cellTypQuestion = propertyGrid.survey.getQuestionByName("cellType");
  expect(cellTypQuestion).toBeTruthy();
  expect(cellTypQuestion.getType()).toEqual("dropdown");
  expect(cellTypQuestion.value).toEqual("default");
  expect(propertyGrid.survey.getQuestionByName("hasNone")).toBeFalsy();
  cellTypQuestion.value = "checkbox";
  expect(question.columns[0].cellType).toEqual("checkbox");
  expect(propertyGrid.survey.getQuestionByName("name").value).toEqual("col1");
  expect(propertyGrid.survey.getQuestionByName("hasNone")).toBeTruthy();
});
test("Validate Selected Element Errors", (): any => {
  var titleProp = Serializer.findProperty("question", "title");
  var oldIsRequired = titleProp.isRequired;
  titleProp.isRequired = true;
  var question = new QuestionTextModel("q1");
  var options = new EmptySurveyCreatorOptions();
  var propertyGrid = new PropertyGridModelTester(question, options);
  expect(propertyGrid.validate()).toBeFalsy();
  var titleQuestion = propertyGrid.survey.getQuestionByName("title");
  expect(titleQuestion.errors).toHaveLength(1);
  expect(titleQuestion.errors[0].getText()).toEqual("Please enter a value");
  titleQuestion.value = "Question 1";
  expect(propertyGrid.validate()).toBeTruthy();
  expect(titleQuestion.errors).toHaveLength(0);
  expect(question.title).toEqual("Question 1");
  titleProp.isRequired = oldIsRequired;
});
test("Validate Selected Element Errors", () => {
  var question = new QuestionTextModel("q1");
  var options = new EmptySurveyCreatorOptions();
  var propertyGrid = new PropertyGridModelTester(question, options);
  expect(propertyGrid.survey.getQuestionByName("name")).toBeTruthy();
  propertyGrid.obj = null;
  expect(propertyGrid.survey.getQuestionByName("name")).toBeFalsy();
});
test("Change page", () => {
  var survey = new SurveyModel();
  survey.addNewPage("page1");
  survey.addNewPage("page2");
  var question = survey.pages[0].addNewQuestion("text", "q1");
  var options = new EmptySurveyCreatorOptions();
  var propertyGrid = new PropertyGridModelTester(question, options);
  var pageQuestion = <QuestionDropdownModel>(
    propertyGrid.survey.getQuestionByName("page")
  );
  expect(pageQuestion).toBeTruthy();
  expect(pageQuestion.choices).toHaveLength(2);
  expect(question.page.name).toEqual("page1");
  expect(pageQuestion.value).toEqual("page1");
  pageQuestion.value = "page2";
  expect(question.page.name).toEqual("page2");
});
test("Expand/collapse categories", () => {
  var question = new QuestionTextModel("q1");
  var options = new EmptySurveyCreatorOptions();
  var propertyGrid = new PropertyGridModelTester(question, options);
  var generalPanel = <PanelModel>propertyGrid.survey.getPanelByName("general");
  var logicPanel = <PanelModel>propertyGrid.survey.getPanelByName("logic");
  expect(generalPanel.isExpanded).toBeTruthy();
  propertyGrid.collapseCategory("general");
  expect(generalPanel.isExpanded).toBeFalsy();
  propertyGrid.expandCategory("general");
  expect(generalPanel.isExpanded).toBeTruthy();

  expect(logicPanel.isExpanded).toBeFalsy();
  propertyGrid.expandAllCategories();
  expect(logicPanel.isExpanded).toBeTruthy();
  propertyGrid.collapseAllCategories();
  expect(logicPanel.isExpanded).toBeFalsy();
});
test("add item into rates", () => {
  var question = new QuestionRatingModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var rateValuesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("rateValues")
  );
  expect(rateValuesQuestion).toBeTruthy();
  expect(rateValuesQuestion.rowCount).toEqual(0);
  rateValuesQuestion.addRow();
  expect(question.rateValues).toHaveLength(1);
  expect(question.rateValues[0].value).toEqual("item1");
});

test("add item into rates", () => {
  var question = new QuestionRatingModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var rateValuesQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("rateValues")
  );
  expect(rateValuesQuestion).toBeTruthy();
  expect(rateValuesQuestion.rowCount).toEqual(0);
  rateValuesQuestion.addRow();
  expect(question.rateValues).toHaveLength(1);
  expect(question.rateValues[0].value).toEqual("item1");
});
test("Change survey locale", () => {
  var survey = new SurveyModel();
  survey.setDesignMode(true);
  survey.fromJSON({
    title: {
      default: "title en",
      de: "title de"
    }
  });
  var propertyGrid = new PropertyGridModelTester(survey);
  var localeQuestion = <QuestionDropdownModel>(
    propertyGrid.survey.getQuestionByName("locale")
  );
  var titleQuestion = <QuestionDropdownModel>(
    propertyGrid.survey.getQuestionByName("title")
  );
  expect(titleQuestion.value).toEqual("title en");
  localeQuestion.value = "de";
  expect(survey.locale).toEqual("de");
  expect(titleQuestion.value).toEqual("title de");
});
test("DependedOn properties, dynamic choices", () => {
  Serializer.addProperty("question", "targetEntity");
  Serializer.addProperty("question", {
    name: "targetField",
    dependsOn: "targetEntity",
    choices: function (obj) {
      return getChoicesByEntity(obj);
    }
  });
  function getChoicesByEntity(obj: any): Array<any> {
    var entity = !!obj ? obj["targetEntity"] : null;
    var choices = [];
    if (!entity) return choices;
    choices.push({ value: "entity" });
    choices.push({ value: entity + " 1", text: entity + " 1" });
    choices.push({ value: entity + " 2", text: entity + " 2" });
    return choices;
  }

  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var entityQuestion = propertyGrid.survey.getQuestionByName("targetEntity");
  var targetQuestion = <QuestionDropdownModel>(
    propertyGrid.survey.getQuestionByName("targetField")
  );

  expect(targetQuestion.visibleChoices).toHaveLength(0);
  entityQuestion.value = "Account";
  expect(targetQuestion.visibleChoices).toHaveLength(3);
  expect(targetQuestion.visibleChoices[1].value).toEqual("Account 1");

  Serializer.removeProperty("question", "targetEntity");
  Serializer.removeProperty("question", "targetField");
});

test("showOptionsCaption for dropdown with empty choice item", () => {
  Serializer.addProperty("question", {
    name: "test",
    choices: function (obj) {
      var choices = [];
      choices.push({ value: "", text: "Empty value" });
      for (var i = 1; i <= 10; i++) {
        choices.push({ value: i, text: "Value" + i.toString() });
      }
      return choices;
    }
  });
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var testQuestion = propertyGrid.survey.getQuestionByName("test");
  expect(testQuestion.getType()).toEqual("dropdown");
  expect(testQuestion.choices).toHaveLength(10);
  expect(testQuestion.showOptionsCaption).toBeTruthy();
  expect(testQuestion.optionsCaption).toEqual("Empty value");

  Serializer.removeProperty("question", "test");
});
test("property editor show help as description", () => {
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var defaultValueExpressionQuestion = <QuestionMatrixDynamicModel>(
    propertyGrid.survey.getQuestionByName("defaultValueExpression")
  );
  var actions = defaultValueExpressionQuestion.getTitleActions();
  expect(
    defaultValueExpressionQuestion.description.indexOf(
      "You can use curly brackets"
    ) > -1
  ).toBeTruthy();
  expect(actions).toHaveLength(2);
  expect(actions[1].id).toEqual("property-grid-help");
  expect(defaultValueExpressionQuestion.descriptionLocation).toEqual("hidden");
  actions[1].action();
  expect(defaultValueExpressionQuestion.descriptionLocation).toEqual(
    "underTitle"
  );
  actions[1].action();
  expect(defaultValueExpressionQuestion.descriptionLocation).toEqual("hidden");
});
test("Use maxLength property attribute", () => {
  Serializer.findProperty("question", "name").maxLength = 10;
  Serializer.findProperty("question", "title").maxLength = 20;
  var question = new QuestionTextModel("q1");
  var propertyGrid = new PropertyGridModelTester(question);
  var nameQuestion = <QuestionTextModel>(
    propertyGrid.survey.getQuestionByName("name")
  );
  expect(nameQuestion.getType()).toEqual("text");
  expect(nameQuestion.maxLength).toEqual(10);
  var titleQuestion = <QuestionTextModel>(
    propertyGrid.survey.getQuestionByName("title")
  );
  expect(titleQuestion.getType()).toEqual("comment");
  expect(titleQuestion.maxLength).toEqual(20);
});
