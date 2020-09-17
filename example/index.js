if (!window["%hammerhead%"]) {
  //   var titleAdorner = {
  //     getCss: () => {
  //       return "mu_title";
  //     },
  //     afterRender: (domEl, model) => {
  //       var decoration = document.createElement("div");
  //       decoration.innerHTML = "";
  //       domEl.appendChild(decoration);
  //     }
  //   };

  //   SurveyCreator.registerAdorner("title", titleAdorner);

  // SurveyCreator.editorLocalization.currentLocale = "fr";

  // SurveyCreator.removeAdorners(["mainRoot"]);

  // Survey.Survey.cssType = "bootstrap";
  // Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  // SurveyCreator.editorLocalization.currentLocale = "hu";
  // SurveyCreator.StylesManager.applyTheme("winter");

  //color customization
  // var mainColor = "#0065FF";
  // var mainHoverColor = "#60C5FB";
  // var textColor = "#4a4a4a";
  // var headerColor = "#4a4a4a";
  // var headerBackgroundColor = "#4a4a4a";
  // var bodyContainerBackgroundColor = "#f8f8f8";

  // var defaultThemeColorsSurvey = Survey.StylesManager.ThemeColors["default"];
  // defaultThemeColorsSurvey["$main-color"] = mainColor;
  // defaultThemeColorsSurvey["$main-hover-color"] = mainHoverColor;
  // defaultThemeColorsSurvey["$text-color"] = textColor;
  // defaultThemeColorsSurvey["$header-color"] = headerColor;
  // defaultThemeColorsSurvey["$header-background-color"] = headerBackgroundColor;
  // defaultThemeColorsSurvey[
  //   "$body-container-background-color"
  // ] = bodyContainerBackgroundColor;

  // var defaultThemeColorsEditor =
  //   SurveyCreator.StylesManager.ThemeColors["default"];
  // defaultThemeColorsEditor["$primary-color"] = mainColor;
  // defaultThemeColorsEditor["$secondary-color"] = mainColor;
  // defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
  // defaultThemeColorsEditor["$primary-text-color"] = textColor;
  // defaultThemeColorsEditor["$selection-border-color"] = mainColor;

  Survey.StylesManager.applyTheme();
  SurveyCreator.StylesManager.applyTheme();
  //
  
  SurveyCreator.SurveyJSONEditor.aceBasePath = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.10/";


  // var options = {
  //   questionTypes: [
  //     "text",
  //     "checkbox",
  //     "radiogroup",
  //     "dropdown",
  //     "comment",
  //     "rating",
  //     "imagepicker",
  //     "boolean",
  //     "html",
  //     "file",
  //     "expression"
  //   ],
  //   pageEditMode: "single"
  // };

  Survey.Serializer.addProperties("survey",
    [
      {
        name: "pdfOrientation",
        category: "PDF",
        default: "auto",
        choices: ["auto", "portrait", "landscape"],
        isSerializable: false
      },
      {
        name: "pdfFormatType",
        category: "PDF",
        default: "default",
        choices: ["custom", "default", "a0", "a1", "a2", "a3",
          "a4", "a5", "a6", "a7", "a8", "a9", "a10",
          "b0", "b1", "b2", "b3", "b4", "b5", "b6",
          "b7", "b8", "b9", "b10", "c0", "c1", "c2",
          "c3", "c4", "c5", "c6", "c7", "c8", "c9",
          "c10", "dl", "letter", "government-letter",
          "legal", "junior-legal", "ledger", "tabloid",
          "credit-card"],
        isSerializable: false
      },
      {
        name: "pdfFormatWidth:number",
        category: "PDF",
        default: 210.0,
        dependsOn: "pdfFormatType",
        visibleIf: function (obj) {
          return obj.pdfFormatType === "custom";
        },
        isSerializable: false
      },
      {
        name: "pdfFormatHeight:number",
        category: "PDF",
        default: 297.0,
        dependsOn: "pdfFormatType",
        visibleIf: function (obj) {
          return obj.pdfFormatType === "custom";
        },
        isSerializable: false
      },
      {
        name: "pdfFontSize:number",
        category: "PDF",
        default: SurveyPDF.DocOptions.FONT_SIZE,
        isSerializable: false
      },
      {
        name: "pdfMarginTop:number",
        category: "PDF",
        default: 10.0,
        isSerializable: false
      },
      {
        name: "pdfMarginBottom:number",
        category: "PDF",
        default: 10.0,
        isSerializable: false
      },
      {
        name: "pdfMarginLeft:number",
        category: "PDF",
        default: 10.0,
        isSerializable: false
      },
      {
        name: "pdfMarginRight:number",
        category: "PDF",
        default: 10.0,
        isSerializable: false
      },
      {
        name: "pdfMode",
        category: "PDF",
        default: "edit",
        choices: ["edit", "display"],
        isSerializable: false
      }
    ]
  );

  var creator = new SurveyCreator.SurveyCreator("editorElement" /*, options*/);

  var savePdfCallback = function() {
    var options = {
      fontSize: creator.survey.pdfFontSize,
      margins: {
        left: creator.survey.pdfMarginLeft,
        right: creator.survey.pdfMarginRight,
        top: creator.survey.pdfMarginTop,
        bot: creator.survey.pdfMarginBottom
      }
    };
    if (creator.survey.pdfOrientation !== "auto") {
      options.orientation = creator.survey.pdfOrientation;
    }
    if (creator.survey.pdfFormatType === "custom") {
      options.format =
        [creator.survey.pdfFormatWidth, creator.survey.pdfFormatHeight]
    }
    else if (creator.survey.pdfFormatType !== "default") {
      options.format = creator.survey.pdfFormatType;
    }
    var surveyPDF = new SurveyPDF.SurveyPDF(creator.JSON, options);
    surveyPDF.data = creator.surveyLiveTester.survey.data;
    surveyPDF.mode = creator.survey.pdfMode;
    surveyPDF.save("filename");
  };

  creator.surveyLiveTester.toolbarItems.push({
    id: "svd-save-pdf",
    // title: getLocString("pe.simulator"),
    title: "Save PDF",
    // visible: ko.computed(() => this.simulatorEnabled),
    visible: true,
    // tooltip: getLocString("pe.simulator"),
    toolpit: "Save PDF",
    component: "svd-button",
    // action: ko.computed({
    //   read: () => this.koActiveDevice(),
    //   write: (val: any) => this.koActiveDevice(val)
    // }),
    action: savePdfCallback
  });

  // creator.showToolbox = "right";
  // creator.showPropertyGrid = "right";
  // creator.rightContainerActiveItem("toolbox");
  // creator.toolbarItems.splice(2, 5);
  // creator.placeholderHtml = `
  //   <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
  //     <img src="./drag-image.svg"/>
  //     <div style="font-size: 16px; max-width: 210px;">
  //       Drag and drop a question to start designing your form
  //     </div>
  //   </div>`;

  creator.saveSurveyFunc = function(saveNo, callback) {
    alert("ok");
    callback(saveNo, true);
  };

  window.creator = creator;
}
