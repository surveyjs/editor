import {
  Base,
  SurveyModel,
  QuestionRadiogroupModel,
  QuestionCommentModel,
  QuestionCheckboxModel,
  QuestionTextModel
} from "survey-core";
import { QuestionConverter } from "../src/questionconverter";
import { QuestionConvertMode, settings } from "../src/settings";

test("get converted classes", () => {
  settings.questionConvertMode = QuestionConvertMode.CompatibleTypes;
  var classes = QuestionConverter.getConvertToClasses("radiogroup");
  expect(classes.length >= 3).toBeTruthy();
  expect(classes.indexOf("dropdown") > -1).toBeTruthy();
  classes = QuestionConverter.getConvertToClasses("text");
  expect(classes).toHaveLength(1);
  expect(classes[0]).toEqual("comment");
  settings..convertMode = QuestionConvertMode.AllTypes;
});

test("get converted classes based on available types", () => {
  settings.questionConvertMode = QuestionConvertMode.CompatibleTypes;
  var classes = QuestionConverter.getConvertToClasses("radiogroup", []);
  expect(classes.length >= 3).toBeTruthy();
  classes = QuestionConverter.getConvertToClasses("radiogroup", [
    "dropdown",
    "checkbox"
  ]);
  expect(classes).toHaveLength(2);
  classes = QuestionConverter.getConvertToClasses("radiogroup", [
    "radiogroup",
    "checkbox",
    "text"
  ]);
  expect(classes).toHaveLength(1);
  classes = QuestionConverter.getConvertToClasses("radiogroup", [
    "radiogroup",
    "comment",
    "text"
  ]);
  expect(classes).toHaveLength(0);
  settings.questionConvertMode = QuestionConvertMode.AllTypes;
});

test("Convert question", () => {
  var survey = new SurveyModel();
  var page = survey.addNewPage();
  var panel = page.addNewPanel();
  var q1 = <QuestionRadiogroupModel>page.addNewQuestion("radiogroup");
  var q2 = <QuestionCommentModel>panel.addNewQuestion("comment");
  q1.choices = ["myitem1", "myitem2"];
  q2.placeHolder = "type here";
  QuestionConverter.convertObject(q1, "checkbox");
  QuestionConverter.convertObject(q2, "text");
  expect((<Base>(<any>page.elements[1])).getType()).toEqual("checkbox");
  expect((<Base>(<any>panel.elements[0])).getType()).toEqual("text");
  var newQ1 = <QuestionCheckboxModel>page.elements[1];
  var newQ2 = <QuestionTextModel>panel.elements[0];
  expect(newQ1.choices).toHaveLength(2);
  expect(newQ1.choices[0].value).toEqual("myitem1");
  expect(newQ2.placeHolder).toEqual("type here");
});
test("Allow to convert to all question types", () => {
  var classes = QuestionConverter.getConvertToClasses("text", []);
  expect(classes.length >= 5).toBeTruthy();
  classes = QuestionConverter.getConvertToClasses("radiogroup", [
    "dropdown",
    "checkbox"
  ]);
  expect(classes).toHaveLength(2);
  classes = QuestionConverter.getConvertToClasses("radiogroup", [
    "radiogroup",
    "checkbox",
    "text"
  ]);
  expect(classes).toHaveLength(2);
  classes = QuestionConverter.getConvertToClasses("radiogroup", [
    "radiogroup",
    "comment",
    "text"
  ]);
  expect(classes).toHaveLength(2);
});
