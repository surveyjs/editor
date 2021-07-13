if (!window["%hammerhead%"]) {
  // SurveyCreator.SurveyJSONEditor.aceBasePath = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.10/";

  Survey.StylesManager.applyTheme("modern");
  SurveyCreator.editorLocalization.currentLocale = "en";
  let options = {
    // showTestSurveyTab: false,
    // showJSONEditorTab: false
    showLogicTab: true,
    showTranslationTab: true,
    showEmbeddedSurveyTab: true
  };
  let creator = new SurveyCreator.SurveyCreator(options);
  let json = {
    completedHtml:
      "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    completedHtmlOnCondition: [
      {
        expression: "{nps_score} > 8",
        html:
          "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
      },
      {
        expression: "{nps_score} < 7",
        html:
          "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br/>"
      }
    ],
    pages: [
      {
        name: "page1",
        title: "page1 -- title",
        description: "page1 -- description",
        elements: [
          {
            type: "text",
            name: "question11"
          },
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)"
          },
          {
            type: "checkbox",
            name: "promoter_features",
            visibleIf: "{nps_score} >= 9",
            title: "What features do you value the most?",
            isRequired: true,
            validators: [
              {
                type: "answercount",
                text: "Please select two features maximum.",
                maxCount: 2
              }
            ],
            hasOther: true,
            choices: [
              "Performance",
              "Stability",
              "User Interface",
              "Complete Functionality"
            ],
            otherText: "Other feature:",
            colCount: 2
          },
          {
            type: "comment",
            name: "passive_experience",
            visibleIf: "{nps_score} > 6  and {nps_score} < 9",
            title: "What is the primary reason for your score?"
          },
          {
            type: "comment",
            name: "disappointed_experience",
            visibleIf: "{nps_score} notempty",
            title:
              "What do you miss and what was disappointing in your experience with us?"
          }
        ]
      },
      {
        name: "page2",
        elements: [
          {
            type: "checkbox",
            name: "question4",
            choices: ["item1", "item2", "item3"]
          }
        ]
      },
      {
        name: "page3",
        elements: [
          {
            type: "dropdown",
            name: "question5",
            choices: ["item1", "item2", "item3"]
          }
        ]
      },
      {
        name: "page4",
        elements: [
          {
            type: "rating",
            name: "question6"
          }
        ]
      }
    ],
    showQuestionNumbers: "off"
  };

  let json2 = {
    title: "QA Review Form",
    pages: [
      {
        name: "CoverPage_Section",
        elements: [
          {
            type: "text",
            name: "TodaysDate",
            title: "Today's Date",
            isRequired: true,
            inputType: "date",
            max: "2999-12-31"
          },
          {
            type: "text",
            name: "ReviewMonthYear",
            startWithNewLine: false,
            title: "Review Month/Year",
            isRequired: true,
            inputType: "month"
          },
          {
            type: "dropdown",
            name: "NFSC",
            title: "Center",
            isRequired: true,
            choices: [
              "Virgil E. Brown",
              "SMBC",
              "Southgate",
              "Old Brooklyn",
              "JET",
              "SNAP to Skills",
              "Quincy"
            ],
            choicesOrder: "asc"
          },
          {
            type: "dropdown",
            name: "Reviewer",
            startWithNewLine: false,
            title: "Reviewer",
            isRequired: true,
            choices: [
              "Abshire, Ed",
              "Adams, Jaime",
              "Allen, Melodie",
              "Armah, Gwendolyn",
              "Banas, Bradley",
              "Beachum, Tiffany",
              "Benjamin, Lawana",
              "Boswell, Deanna",
              "Bouldin, Tamika",
              "Bradford-Davis, Erin",
              "Bridges, Tracy",
              "Brooks, Shafiaah",
              "Caldwell, Cheri",
              "Catlin, Terry",
              "Chapman-Cameron, Carmen",
              "Charles, Francis",
              "Coggins, Leisha",
              "Collins, Ivelisse",
              "Collins, Renee",
              "Curry, Faye",
              "Davis, Chaiyeh",
              "De La Cruz, Pamela",
              "Denton, Argina",
              "Ekpe, Enefiok",
              "Ekpe, Anwangabasi",
              "Evans, Leah",
              "Evans, Lisa",
              "Ferguson, Heidi",
              "Fisher, Donna",
              "Franklin, Tashanda",
              "Frierson Caver, Martinese",
              "Galarza, Simone",
              "Garcia, Nelson",
              "Gregg, Melissa",
              "Harper, Mary",
              "Hayes, Kenetta",
              "Hills, William",
              "Jackson-Days, Rochelle",
              "Johnson, Ryan",
              "Johnson-Williams, Veda",
              "Kennedy, Leslie",
              "King, Teresa",
              "Laureano, Maria",
              "Lawrence, Catherine",
              "Little, Tasia",
              "Lobue, Emily",
              "Lovelace, Quartese",
              "Lynch, Margaret",
              "Masarik, Kelly",
              "Mason, Sharonda",
              "Maxwell, Lawren",
              "Mcalpine, Eric",
              "Merritt, Shirley",
              "Milton, Deshon",
              "Mixon, Darryl",
              "Morgan, Melanie",
              "Mosher, Paul",
              "Moss, Lisa",
              "Nassar, Nicole",
              "Novish, Christopher",
              "Perlatti, Joseph",
              "Petro, James",
              "Reese, Marcy Ellen",
              "Richmond, Tanya",
              "Rizk, Naseem",
              "Roberson, Nichelle",
              "Robertson, Cassandra",
              "Scott, Alicka",
              "Sekanic, Tanya",
              "Shoemaker, Karalyn",
              "Simms, Ronnie",
              "Sledge, Crystal",
              "Smith, Dora",
              "Stacey, Nicole",
              "Stewart, Kimberly",
              "Stitt, Eric",
              "Tenney, Turkessa",
              "Thomas, Anthony",
              "Thornton, Stephanie",
              "Thornton-Saleem, Shareefah",
              "Vargas-Bremer, Mayralie",
              "Veney, Candace",
              "Walsh, Katherine",
              "White, Jeriesha",
              "White, Shawn",
              "Wilson, Nicole",
              "Worthy, Lorene",
              "Other"
            ],
            choicesOrder: "asc"
          },
          {
            type: "dropdown",
            name: "EligSpec",
            startWithNewLine: false,
            title: "Eligibility Specialist",
            isRequired: true,
            choices: [
              "Abshire, Lisa",
              "Acton, Angela",
              "Adams, Valencia",
              "Adamson, Cassandra",
              "Abduljabar, Mouyad",
              "Agee, Derricka",
              "Albritton, Nathaniel",
              "Allen, Melodie",
              "Amegashie, Domonik",
              "Ames, Danielle",
              "Anderson, Armar",
              "Anderson, Michael",
              "Andrews, Tiarra",
              "Aquilino, Madonna",
              "Armstrong, Stepfannie",
              "Ashba, Lisa",
              "Barber, Desiree",
              "Basit, Rahim",
              "Beachum, Tiffany",
              "Beamon, Joy",
              "Beavers, Dibri",
              "Beckert, Esther",
              "Beebout, Melissa",
              "Beeman, Anashia",
              "Bell, Kaponika",
              "Beniard, Lisa",
              "Berry, Del'alicia",
              "Berry, Detra",
              "Betts, Vincenza",
              "Blackmon, Pamela",
              "Blanton, Chardonae",
              "Boddie, Michelle",
              "Bolden-Jones, Sequia",
              "Booker, Angyne",
              "Bordeaux, Susan",
              "Boswell, Evelyn",
              "Boyd, Lashana",
              "Boyd, Monica",
              "Bozeman, Traci",
              "Bozeman, Celeste",
              "Bradford, Jasmine",
              "Bradley-Duru, Jacqueline",
              "Brooks, Samantha",
              "Brown, Stacey",
              "Brown, Tameko",
              "Brown, Gina",
              "Brown, Carla",
              "Brown, Cynthia",
              "Brown, Theresa",
              "Brown, Yvonne",
              "Bruce, Stephenie",
              "Bryant, Dakeita",
              "Brye, Bernadette",
              "Bunch, Christie",
              "Burnett, Mary",
              "Burton, Venee",
              "Calaway, Valisa",
              "Caldwell, Cheri",
              "Calloway, Jennifer",
              "Camacho, Myrna",
              "Carr, Tischia",
              "Carrion, Judy",
              "Carruthers, Veronica",
              "Chambliss, Alforniece",
              "Chang, Elizabeth",
              "Childress, Martin",
              "Childs, Karen",
              "Churn, Michael",
              "Clemmons, LaTylia",
              "Cochran, Terrie",
              "Colasent, Desiree",
              "Coleman, Sharon",
              "Collins, Christopher",
              "Cook, Michelle",
              "Cook, Latoya",
              "Cook, Paula",
              "Cooper, Zina",
              "Corey, Michael",
              "Cotton, Chamille",
              "Crawford, Prenesha",
              "Crawford, Paige",
              "Crespo, Christina",
              "Cromity, Lesley",
              "Cross, David",
              "Crossen, Alexandra",
              "Cruz, Edith",
              "Curlee, Jaquetta",
              "Curtis, Latasha",
              "Davidson, Tonya",
              "Davis, Kirsten",
              "Davis, Rochelle",
              "Davis, Connie",
              "Davis, Donnell",
              "De Jesus, Oscar",
              "Deal, Nicole",
              "Dean, Tracey",
              "Deberry, Cynthia",
              "Dennis, Crystal",
              "Dennis, Charisse",
              "Diaz Rosado, Janette",
              "Dickson, Miesha",
              "Dickson, Remicka",
              "Dixon, Isaac",
              "Djulvezan, Stel",
              "Dreher, Jennifer",
              "Duncan, Latisha",
              "Dugan, Marissa",
              "Dunn, Sade",
              "Dupree, Tonia",
              "Early, Adriane",
              "Edwards, Lauren",
              "Edwards, Takara",
              "Elkurd, Oruba",
              "Ensley, Domonique",
              "Eppinger, Christine",
              "Equale, Suzanne",
              "Evans-Flowers, Tinia",
              "Fischer, Barbara",
              "Fisher, Bernette",
              "Flanagan, Diana",
              "Floyd, Naomi",
              "Fluker, Bria",
              "Foster, Mary",
              "Francis-Boyd, Dora",
              "Franklin, Romel",
              "Freeman, Robyn",
              "Fullerton, Amber",
              "Gainer, Casaundra",
              "Gantman, Yelena",
              "Garner, Deonne",
              "Gilbert, Michele",
              "Giles, Renee",
              "Gill, Marie",
              "Glass, Tiera",
              "Gloster, Gekia",
              "Godenswager, Cathleen",
              "Golden, Kameela",
              "Goss, Arecia",
              "Gotsch, Jason",
              "Grant, April",
              "Griffin, Jennifer",
              "Green, Linda",
              "Greenlee, Tranell",
              "Griffin, Tameka",
              "Guardalabene, David",
              "Haggerty, Elsa",
              "Hall, Phylicia",
              "Hall, Tanisha",
              "Hall, Brenda",
              "Hamilton, Arianna",
              "Hammock, Karla",
              "Harris, Tangie",
              "Hart, Katrenia",
              "Havergne, Jasmine",
              "Hawkins, Cherrie",
              "Haynes, Sylvia",
              "Haynes-Rollins, Carol",
              "Heaird, Veronica",
              "Heiskell, Ali'Zaye",
              "Hemphill, Keith",
              "Hennes, Dalton",
              "Henry, Tanisha",
              "Hettle, Kelly",
              "Hibbitt, Felita",
              "Higham, Timothy",
              "Hill, Dushawn",
              "Hill, Gina",
              "Hill, Savonnah",
              "Hipfl, Jennifer",
              "Hodges, Leman",
              "Hollinger, Michael",
              "Holmes, Lester",
              "Holmes, Tiffany",
              "Horsley, Kai",
              "Horton, Kenya",
              "Houston, Marilyn",
              "Huffman, Nicole",
              "Ianni, Melissa",
              "Ingram-Scott, Arlette",
              "Ivory, Paula",
              "Jabbaar, Roshan",
              "Jackson, Raquel",
              "James, Yvette",
              "James-Agee, Brinda",
              "Jarvis, Roseanne",
              "Jawhari, Raya",
              "Jeffries, Veronica",
              "Johnson, Talia",
              "Johnson, Kisha",
              "Johnson, Sherelle",
              "Johnson, Stacy",
              "Johnson, Siobahn",
              "Johnson, Takiyah",
              "Johnson, Rancia",
              "Johnson, Evelyn",
              "Jones, William",
              "Keen, Stacy",
              "Keller, Tonja",
              "Kelley, Ryan",
              "Keovisay, Sandy",
              "Kimpo, Karl",
              "King, Iesha",
              "King, Nancy",
              "King, Salethia",
              "King, Algeria",
              "King, Elaine",
              "King-Chapman, Kimberly",
              "Kovach, Victoria",
              "Kozlowski, Margaret",
              "Kristoff, Brett",
              "Krupa, Shelley",
              "Kyles, Ronnie",
              "Labossiere, Angela",
              "Lang-Johnson, Tara",
              "Lastery, Joseph",
              "Latham, Eileen",
              "Lawson, Nicole",
              "Lee, Briana",
              "Lee, Elizabeth",
              "Lee, Tanesha",
              "Legg, Alice",
              "Lewis-Alexander, Vivian",
              "Lindsey, Raven",
              "Linn, Catherine",
              "Little, Dwanda",
              "Lockett, Dejenaba",
              "Lopez, Ashley",
              "Love, Paula",
              "Ludy, Oceana",
              "Lwin, Yamin",
              "Lynch, Stacey",
              "Lytle, Dayvon",
              "Mack, La'stacia",
              "Mague, Renethia",
              "Mancuso, Donna",
              "Marks, Tiffany",
              "Marshall, Ken",
              "Mason, Sharonda",
              "Maye, Keonya",
              "McClendon, Aletha",
              "Mcfadden, Kenneth",
              "Mcintosh, Sheryl",
              "Mckenzie, Deanna",
              "Mcnamee, Mary",
              "Meeks, Jacqueline",
              "Melendez, Rene",
              "Miller, Lashonda",
              "Miller, Linda",
              "Miller, Angela",
              "Miller, Avaunte",
              "Mills, De'lynia",
              "Milton, Carmencita",
              "Mitchell, Donnie",
              "Mitsionis, Alexia",
              "Moore, Latoya",
              "Moore, Tara",
              "Morales Fletcher, Eneida",
              "Morgan, Shennen",
              "Morris, Jameeka",
              "Morris, Tanisha",
              "Morton, Philshanna",
              "Mucha, Brittany",
              "Murdock, Yvette",
              "Murtha, Carol Ann",
              "Nabolle, Christelle",
              "Nettgen, Krystina",
              "Nichols, Laseanda",
              "Nicholson, Felicia",
              "Nickelberry, Syeina",
              "Norris, Michael",
              "O'Neal, Laura",
              "O'Neal, Monica",
              "O'Neal, Toshia",
              "Obojski, Keith",
              "Ojukwu, Marcel",
              "Okun, Marina",
              "Orr, Lisa",
              "Pankratz, Susan",
              "Parker, Octavia",
              "Parker-McKinley, Shani",
              "Payton, Mashanta",
              "Pennyman, Woncina",
              "Petro, Laura",
              "Peters, Haley",
              "Phan, Allison",
              "Phillips, Derenda",
              "Phillips, Tiffany",
              "Pierce, Djuan",
              "Pippens Hawley, Carla",
              "Pittmon, Dorian",
              "Polian, Kelly",
              "Pope, Aenea",
              "Pophal, Kathleen",
              "Powe, Renea",
              "Prempeh, Jamila",
              "Price, Jessica",
              "Prude, Heyward",
              "Pruitt, Danyale",
              "Quinn, Kevin",
              "Radic Cvijic, Mirjana",
              "Radon, Melissa",
              "Reed, Kimberly",
              "Reed, Schenee",
              "Reese, Antwanette",
              "Reines, Cynthia",
              "Reust, Lindsay",
              "Reynolds-Ladson, Geanifer",
              "Richardson, Lovell",
              "Richardson, Monica",
              "Rivera Perez, Janete",
              "Robinson, Angelita",
              "Robinson, Antionette",
              "Robinson, Juanita",
              "Rodic, Nemanja",
              "Rodriguez, Maria",
              "Rogers, Sean",
              "Roldan, Angelica",
              "Roney, Ricketta",
              "Rondo, Monica",
              "Rosa, Elizabeth",
              "Rossman, Tiffany",
              "Royster, Noelia",
              "Russell, Michelle",
              "Russo, Christine",
              "Sabo, Kelly",
              "Sakach, Sharon",
              "Sample, Tracy",
              "Sanders, Sharon",
              "Sands, Kim",
              "Santiago, Victoria",
              "Sasala, Steven",
              "Savchuk, Rehina",
              "Schmolz, Julieanna",
              "Scott, Jimmie",
              "Scott, Elise",
              "Seidel-Boykin, Lillian",
              "Settles, Cathy",
              "Settles, Shani",
              "Sharp, Versie",
              "Shepherd, Valerie",
              "Sherrill, Denise",
              "Short, Rachel",
              "Sizemore, Jon",
              "Slaughter, Yoshika",
              "Small, Pamela",
              "Smith, Brad",
              "Smith, Bridgette",
              "Smith, Carlton",
              "Smith, Kira",
              "Smith, Maria",
              "Smith, Tia",
              "Smith, Rosalind",
              "Smyser, Marjorie",
              "Solano, Fanny",
              "Starr, Kristopher",
              "Stevenson, Breon",
              "StewartWilson, Kierra",
              "Stojanovic, Marina",
              "Strayhand Gray, Paula",
              "Strong, Oretta",
              "Strong, Bridgette",
              "Stubbs, Ivy",
              "Sudberry, Monica",
              "Suliman, Yasmine",
              "Sykes, Vanessa",
              "Taras, Susan",
              "Taylor, Angelina",
              "Taylor, Tyisha",
              "Terrell, Gayle",
              "Thomas, Wallace",
              "Thomas, Dana",
              "Thomas, Markita",
              "Thomas, Alzavier",
              "Tiell, Lisa",
              "Tirado, Sophia",
              "Torres, Angel",
              "Trecarichi, Linda",
              "Trice, Katrina",
              "Twyman, Darius",
              "Vactor, Dora Rae",
              "Valero, Joana",
              "Vallos, Anastasia",
              "Vance, Lindsay",
              "Veney, Candace",
              "Virant, Jennifer",
              "Vogt, Eric",
              "Vuyancih, Tiana",
              "Waite, Eileen",
              "Waite, Gail",
              "Walker, Aliyma",
              "Walker, Britney",
              "Ward, Cathy",
              "Watkins, James",
              "Watts-Lawrence, Tamika",
              "Weaver, Adrianne",
              "Weaver, Charniece",
              "Webb, Katrina",
              "Webb, Kristian",
              "Webb, Renetha",
              "Wells, Linda",
              "West, Chanel",
              "Westley, Royceanne",
              "Wharton, Glenn",
              "Whidden, Wendy",
              "White, Alfred",
              "White-Green, Donna",
              "Wiley, Darnissa",
              "Widemire, Kathleen",
              "Williams, Dortha",
              "Williams, Paula",
              "Williams, Kimberly",
              "Williams, Ashley",
              "Williams, Nakia",
              "Williams, Raina",
              "Williams, Queen",
              "Williams, Sheila",
              "Williams, Tommie",
              "Williams-Funches, Cynthia",
              "Willis, Millie",
              "Willis Jackson, Monica",
              "Wilson, Ebony",
              "Wilson, Rashun",
              "Wilton, Jessica",
              "Winkler, Jason",
              "Wirt, Crystal",
              "Woods, Victoria",
              "Woodson, Angela",
              "Yarbrough, Nadine",
              "Yee, Mary",
              "Ziegler, Lawrence"
            ],
            choicesOrder: "asc"
          },
          {
            type: "radiogroup",
            name: "ReviewEligSpecSup",
            startWithNewLine: false,
            title: "Are you the Eligibility Specialist's Supervisor?",
            isRequired: true,
            choices: [
              {
                value: "Yes",
                text: "Yes"
              },
              {
                value: "No",
                text: "No"
              }
            ],
            colCount: 2
          },
          {
            type: "dropdown",
            name: "EligSpecSup",
            visibleIf: "{ReviewEligSpecSup} = 'No'",
            startWithNewLine: false,
            title: "Eligibility Specialist's Supervisor",
            choices: [
              "Abshire, Ed",
              "Allen, Melodie",
              "Armah, Gwendolyn",
              "Banas, Bradley",
              "Beachum, Tiffany",
              "Benjamin, Lawana",
              "Boswell, Deanna",
              "Bouldin, Tamika",
              "Bradford-Davis, Erin",
              "Bridges, Tracy",
              "Brooks, Shafiaah",
              "Caldwell, Cheri",
              "Caver, Martinese ",
              "Catlin, Terry",
              "Chapman-Cameron, Carmen",
              "Charles, Francis",
              "Coggins, Leisha",
              "Curry, Faye",
              "Davis, Chaiyeh",
              "De La Cruz, Pamela",
              "Denton, Argina",
              "Ekpe, Enefiok",
              "Ekpe, Anwangabasi",
              "Evans, Leah",
              "Ferguson, Heidi",
              "Fisher, Donna",
              "Franklin, Tashanda",
              "Frierson Caver, Martinese",
              "Galarza, Simone",
              "Garcia, Nelson",
              "Gregg, Melissa",
              "Harper, Mary",
              "Hayes, Kenetta",
              "Hills, William",
              "Jackson-Days, Rochelle",
              "Johnson, Ryan",
              "Johnson-Williams, Veda",
              "Kennedy, Leslie",
              "King, Teresa",
              "Laureano, Maria",
              "Lawrence, Catherine",
              "Lobue, Emily",
              "Lovelace, Quartese",
              "Lynch, Margaret",
              "Mason, Sharonda",
              "Masarik, Kelly",
              "Mcalpine, Eric",
              "Merritt, Shirley",
              "Milton, Deshon",
              "Mixon, Darryl",
              "Morgan, Melanie",
              "Mosher, Paul",
              "Moss, Lisa",
              "Nassar, Nicole",
              "Novish, Christopher",
              "Perlatti, Joseph",
              "Petro, James",
              "Reese, Marcy Ellen",
              "Richmond, Tanya",
              "Rizk, Naseem",
              "Roberson, Nichelle",
              "Robertson, Cassandra",
              "Scott, Alicka",
              "Sekanic, Tanya",
              "Shoemaker, Karalyn",
              "Simms, Ronnie",
              "Sledge, Crystal",
              "Smith, Dora",
              "Stacey, Nicole",
              "Stewart, Kimberly",
              "Stitt, Eric",
              "Tenney, Turkessa",
              "Thomas, Anthony",
              "Thornton, Stephanie",
              "Thornton-Saleem, Shareefah",
              "Vargas-Bremer, Mayralie",
              "Veney, Candace",
              "Walsh, Katherine",
              "White, Jeriesha",
              "White, Shawn",
              "Wilson, Nicole",
              "Worthy, Lorene"
            ],
            choicesOrder: "asc"
          },
          {
            type: "text",
            name: "CaseName",
            title: "Case Name",
            isRequired: true
          },
          {
            type: "checkbox",
            name: "New Hire Review",
            title: "Check if this is a New Hire Review:",
            description:
              "If so, complete the review as the *proposed* action has been taken",
            choices: ["Yes"]
          },
          {
            type: "checkbox",
            name: "IsHospitalUnit",
            startWithNewLine: false,
            title: "Is this worker in the Hospital Unit?",
            description: "(Optional)",
            choices: ["Yes"]
          },
          {
            type: "matrixdropdown",
            name: "ReviewDetails",
            title: "Fill in the details of the block(s) you reviewed:",
            defaultValue: {
              SNAP: {
                Included: "No"
              },
              SNAPET: {
                Included: "No"
              },
              TANF: {
                Included: "No"
              },
              OWF: {
                Included: "No"
              },
              MC: {
                Included: "No"
              },
              LTC: {
                Included: "No"
              },
              UETarget: {
                Included: "No"
              }
            },
            isRequired: true,
            columns: [
              {
                name: "Included",
                title: "Did your review include this program?",
                cellType: "radiogroup",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                name: "ReviewType",
                title: "What kind of action are you reviewing?",
                cellType: "dropdown",
                isRequired: true,
                visibleIf:
                  "{row.Included} = 'Yes' AND ( {rowindex} == 1 or {rowindex} == 3 or {rowindex} == 7 or {rowindex} = 5 or {rowindex} ==6)",
                choices: ["Intake", "Renewal", "Interim", "Change"]
              },
              {
                name: "Status",
                title: "Block Status",
                cellType: "dropdown",
                isRequired: true,
                visibleIf: "{row.Included} = 'Yes'",
                choices: ["Approved", "Denied", "Discontinued", "Pending"]
              },
              {
                name: "CaseNumber",
                title: "Case Number",
                cellType: "text",
                isRequired: true,
                visibleIf: "{row.Included} = 'Yes'",
                validators: [
                  {
                    type: "numeric",
                    text: "Please enter a valid case number",
                    minValue: 0,
                    maxValue: 99999999
                  },
                  {
                    type: "text",
                    text: "Case numbers are 7 or 8 digits long",
                    minLength: 7,
                    maxLength: 8,
                    allowDigits: true
                  }
                ]
              },
              {
                name: "Block",
                title: "Block Number(s)",
                cellType: "text",
                isRequired: true,
                visibleIf: "{row.Included} = 'Yes'"
              }
            ],
            choices: [1, 2, 3, 4, 5, 6, 7],
            rows: [
              {
                value: "SNAP",
                text: "SNAP"
              },
              {
                value: "SNAPET",
                text: "SNAPET"
              },
              {
                value: "TANF",
                text: "TANF"
              },
              {
                value: "OWF",
                text: "TANF Work"
              },
              {
                value: "MC",
                text: "Community Medicaid"
              },
              {
                value: "LTC",
                text: "Long Term Care"
              },
              {
                value: "UETarget",
                text: "Unearned Income Target Review"
              }
            ]
          }
        ],
        title: "Cover Page"
      },
      {
        name: "SNAP_Section",
        elements: [
          {
            type: "html",
            name: "SNAPPolicyLink",
            html:
              '<a href="http://innerweb.odjfs.state.oh.us/Initiatives/CRIS-E/training/OhioBenefitsTrainingResources.stm" target=_"blank"> Link to SNAP Calculator </a> '
          },
          {
            type: "expression",
            name: "CaseName_Display_SNAP",
            title: "Case Name",
            expression: "{CaseName}"
          },
          {
            type: "expression",
            name: "CaseNumber_Display_SNAP",
            startWithNewLine: false,
            title: "Case Number",
            expression: "{ReviewDetails.SNAP.CaseNumber}"
          },
          {
            type: "expression",
            name: "Block_Display_SNAP",
            startWithNewLine: false,
            title: "Block:\n",
            expression: "{ReviewDetails.SNAP.Block}"
          },
          {
            type: "panel",
            name: "JournalNotes_Panel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "JournalNotes_SNAP",
                title: "Are there journal notes regarding the action taken?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalTemplate_SNAP",
                visibleIf: "{JournalNotes_SNAP} = 'Yes'",
                startWithNewLine: false,
                title: "Was the journal template used?",
                isRequired: true,
                choices: ["Yes", "No", "NA"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalAdequate_SNAP",
                visibleIf: "{JournalNotes_SNAP} = 'Yes'",
                title: "Were the journal notes adequate?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalAdequate_Comment_SNAP",
                visibleIf: "{JournalAdequate_SNAP} = 'No'",
                startWithNewLine: false,
                title: "What was inadequate about the notes?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "JournalDescriptionSufficient_SNAP",
                visibleIf: "{JournalNotes_SNAP} = 'Yes'",
                title:
                  "Does the Journal Description for these notes summarize the worker's action?",
                description:
                  'For example, does it describe the case action ("Denied for over-income") or does it just say "Overtime Assignment" or "Call Center"?',
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalDescriptionSufficient_Comment_SNAP",
                visibleIf: "{JournalDescriptionSufficient_SNAP} = 'No'",
                startWithNewLine: false,
                title: "What was wrong with the Journal Description?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "FTIinJournalEntry_SNAP",
                visibleIf: "{JournalNotes_SNAP} = 'Yes'",
                title:
                  "Is there Federal Tax Information (FTI) in the Journal Entry?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Journal Notes"
          },
          {
            type: "panel",
            name: "Expedited_Panel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "ZeroIncome100Resources_SNAP",
                title:
                  "Did the AG have zero net monthly income and $100 or less in liquid resources?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "24hrsCert_SNAP",
                visibleIf: '{ZeroIncome100Resources_SNAP} = "Yes"',
                startWithNewLine: false,
                title: "Were benefits certified within 24 hours?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "24hrsCert_Fault_SNAP",
                visibleIf: "{24hrsCert_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "150Income100Resources_SNAP",
                visibleIf: "{ZeroIncome100Resources_SNAP} = 'No'",
                title:
                  "Did the AG have <$150 gross monthly income and resources of $100 or less?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RentMortgageExceedUtility_SNAP",
                visibleIf:
                  "{ZeroIncome100Resources_SNAP} = 'No'\nAND {150Income100Resources_SNAP} = 'No'",
                title:
                  "Does the AG's rent/mortgage plus utility costs exceed the total of its gross monthly income & liquid resources?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "IsFarmworker_SNAP",
                visibleIf:
                  "{ZeroIncome100Resources_SNAP} = 'No' \nAND {150Income100Resources_SNAP} = 'No'\nAND {RentMortgageExceedUtility_SNAP} = 'No'",
                title:
                  "Is the AG a destitute migrant or seasonal farmworker & has liquid resources of $100 or less?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ClientMissInitialScheduledInterview_SNAP",
                visibleIf:
                  "({ZeroIncome100Resources_SNAP} = 'Yes'\nOR {150Income100Resources_SNAP} = 'Yes'\nOR {IsFarmworker_SNAP} = 'Yes'\nOR {RentMortgageExceedUtility_SNAP} = 'Yes'\n)",
                title:
                  "Did the client miss the expedited interview appointment, receive a NOMI, and fail to reschedule an interview w/in 7 days from the application filing date?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ClientIneligibleFirstMonth_SNAP",
                visibleIf: "{ClientMissInitialScheduledInterview_SNAP} = 'No'",
                title:
                  "Was the AG ineligible for benefits in the month of application or the month following application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "expression",
                name: "MeetsExpeditedCriteria_SNAP",
                visible: false,
                title:
                  "Hidden logic to calculate whether the client meets expedited criteria, per the screening tool.",
                expression:
                  "({150Income100Resources_SNAP} = 'Yes'\nOR {ZeroIncome100Resources_SNAP} = 'Yes'\nOR {RentMortgageExceedUtility_SNAP} = 'Yes'\nOR {IsFarmworker_SNAP} = 'Yes')\nAND {ClientIneligibleFirstMonth_SNAP} = 'No'\nAND {ClientMissInitialScheduledInterview_SNAP} = 'No'"
              },
              {
                type: "radiogroup",
                name: "BenefitsAvail7Days_SNAP",
                visibleIf:
                  "{MeetsExpeditedCriteria_SNAP} \nAND {ZeroIncome100Resources_SNAP} = 'No'",
                title:
                  "Were the benefits available no later than close of business on the 7th calendar day?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsAvail7Days_Fault_SNAP",
                visibleIf: "{BenefitsAvail7Days_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ExpeditedAtApp_SNAP",
                visibleIf: "{ReviewDetails.SNAP.ReviewType} contains 'Intake'",
                title: "Was the AG screened as Expedited at Application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ExpeditedAtAppNotScreened_Fault_SNAP",
                visibleIf:
                  "{ExpeditedAtApp_SNAP} = 'No' and {MeetsExpeditedCriteria_SNAP} = true",
                startWithNewLine: false,
                title:
                  "From previous answers, this client was eligible for Expedited processing but was not screened in as Expedited. Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "OverrodeExpeditedAtApplication_SNAP",
                visibleIf:
                  "{ExpeditedAtApp_SNAP} = 'Yes'\nAND {MeetsExpeditedCriteria_SNAP} = false",
                title:
                  "Was the Expedited at Application indicator overridden before EDBC was run?",
                description:
                  "From the answers above, this client appears not to have been eligible for Expedited service. ",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OverrodeExpeditedAtApplication_Comment_SNAP",
                visibleIf: "{OverrodeExpeditedAtApplication_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe what should have happened:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "WasDiscoveryDateUsed_SNAP",
                visibleIf:
                  "{MeetsExpeditedCriteria_SNAP} = true \nAND {ExpeditedAtApp_SNAP} = 'No'\nAND {ClientIneligibleFirstMonth_SNAP} notempty",
                title:
                  "Was the Date of Discovery updated to reflect the date the agency discovered the client's eligibility for Expedited Services before EDBC was run?",
                description:
                  "From the answers above, this client appears to have been identified as eligible for Expedited services after the initial screening. ",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "WasDiscoveryDateUsed_Comment_SNAP",
                visibleIf: "{WasDiscoveryDateUsed_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe what should have happened:",
                isRequired: true
              }
            ],
            visibleIf: "{ReviewDetails.SNAP.ReviewType} = 'Intake'",
            title: "Expedited Eligibility"
          },
          {
            type: "panel",
            name: "Interview_Panel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "TimelyInterviewScheduled_SNAP",
                visibleIf:
                  "{ReviewDetails.SNAP.ReviewType} contains 'Intake' OR {ReviewDetails.SNAP.ReviewType} contains 'Renewal']",
                title: "Was an interview scheduled timely?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, scheduled timely"
                  },
                  {
                    value: "No",
                    text: "No, scheduled untimely or not scheduled"
                  },
                  {
                    value: "Unscheduled",
                    text: "Walk-in or other unscheduled appointment"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewScheduleDelayByAgency_SNAP",
                visibleIf: "{TimelyInterviewScheduled_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Was the scheduling delay caused by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewScheduleDelayByAgency_Fault_SNAP",
                visibleIf: "{InterviewScheduleDelayByAgency_SNAP} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewHeldTimely_SNAP",
                visibleIf:
                  "{ReviewDetails.SNAP.ReviewType} contains 'Intake' OR {ReviewDetails.SNAP.ReviewType} contains 'Renewal']",
                title: "Was an interview held timely?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, Interview held timely"
                  },
                  {
                    value: "No",
                    text: "No, Interview held untimely"
                  },
                  {
                    value: "NoInterview",
                    text: "The client did not attend an interview at all"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewDelaybyAgency_SNAP",
                visibleIf: "{InterviewHeldTimely_SNAP} = 'No'",
                title: "Was the interview delay caused by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewDelaybyAgency_Fault_SNAP",
                visibleIf: "{InterviewDelaybyAgency_SNAP} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsRestoredtoAppDate_SNAP",
                visibleIf: "{InterviewDelaybyAgency_SNAP} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Were benefits restored back to the AG's application date or beginning recertification period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "CustomerScheduleUpdate_SNAP",
                title:
                  "Was the Customer Schedule screen in OBWP updated appropriately?",
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A (Phone Application)"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "AnyMissedInterviews_SNAP",
                visibleIf: "{InterviewHeldTimely_SNAP} anyof ['No', 'Yes']",
                title: "Did the client miss any scheduled interviews?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NOMIIssued_SNAP",
                visibleIf:
                  "{InterviewHeldTimely_SNAP} = 'NoInterview'\nOR {AnyMissedInterviews_SNAP} = 'Yes'",
                startWithNewLine: false,
                title: "Was a NOMI issued for the missed interview(s)?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NOMIIssued_Fault_SNAP",
                visibleIf: "{NOMIIssued_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SignedApplicationAudiosignature_SNAP",
                visibleIf:
                  "{ReviewDetails.SNAP.ReviewType} anyof ['Intake', 'Renewal']",
                title: "Is there a signed application or audio signature?",
                isRequired: true,
                choices: [
                  {
                    value: "Paper",
                    text: "Yes, a Paper Application"
                  },
                  {
                    value: "Audio",
                    text: "Yes, an Audio Signature"
                  },
                  {
                    value: "No",
                    text: "No, neither"
                  }
                ]
              },
              {
                type: "matrix",
                name: "AudioSignatureMatrix_SNAP",
                visibleIf: "{SignedApplicationAudiosignature_SNAP} = 'Audio'",
                title:
                  "Were the the following questions asked and answered in the recording?",
                isRequired: true,
                columns: ["Yes", "No"],
                rows: [
                  {
                    value: "Name",
                    text: "State your First/Last Name"
                  },
                  {
                    value: "Address",
                    text: "State your address"
                  },
                  {
                    value: "PhoneApp",
                    text:
                      "Do you want to submit this application for cash and/or food assistance over the phone?"
                  },
                  {
                    value: "PhoneAppResponse",
                    text: "((Did the client agree to apply by phone?))",
                    visibleIf: "{AudioSignatureMatrix_SNAP.PhoneApp} = 'Yes'"
                  },
                  {
                    value: "ConfirmInfo",
                    text:
                      "Confirmed client's name, address and date of application back to them",
                    visibleIf:
                      "{AudioSignatureMatrix_SNAP.PhoneAppResponse} = 'Yes'"
                  },
                  {
                    value: "ConfirmIncomplete",
                    text:
                      "Your request to apply for food and cash is incomplete, we will not be able to continue without your understanding and agreement.",
                    visibleIf:
                      "{AudioSignatureMatrix_SNAP.PhoneAppResponse} = 'No'"
                  },
                  {
                    value: "AddAuthRep",
                    text: "Would you like to add an authorized representative?",
                    visibleIf:
                      "{AudioSignatureMatrix_SNAP.PhoneAppResponse} = 'Yes'"
                  },
                  {
                    value: "AddAuthRepResponse",
                    text: "((Did the client want to add an Auth rep?))",
                    visibleIf: "{AudioSignatureMatrix_SNAP.AddAuthRep} = 'Yes'"
                  },
                  {
                    value: "AuthRepInfo",
                    text: "The name/address of the Authorized Representative",
                    visibleIf:
                      "{AudioSignatureMatrix_SNAP.AddAuthRepResponse} = 'Yes'"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "MailedVoterRegistration_SNAP",
                visibleIf:
                  "{ReviewDetails.SNAP.ReviewType} anyof ['Intake', 'Renewal']",
                title:
                  "Was the client mailed a voter registration, if requested?",
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, request not fulfilled"
                  },
                  {
                    value: "NA",
                    text: "Not requested"
                  }
                ]
              }
            ],
            visibleIf:
              "{ReviewDetails.SNAP.ReviewType} anyof ['Intake', 'Renewal']",
            title: "Interview"
          },
          {
            type: "panel",
            name: "AuthorizationPanel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "AuthRepCorrect_SNAP",
                title: "Is the Authorized Representative information correct?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, omitted in error"
                  },
                  {
                    value: "N/A",
                    text: "Not applicable"
                  }
                ],
                hideIfChoicesEmpty: true,
                colCount: 2
              },
              {
                type: "comment",
                name: "AuthRepCorrect_Comment_SNAP",
                visibleIf: "{AuthRepCorrect_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "IntakeCorrectAppDate_SNAP",
                visibleIf: "{ReviewDetails.SNAP.ReviewType} = 'Intake'",
                title: "Was the correct application date used?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "IntakeCorrectAppDate_Comment_SNAP",
                visibleIf: "{IntakeCorrectAppDate_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect about the app date:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "CertPeriodCorrect_SNAP",
                visibleIf:
                  "{ReviewDetails.SNAP.ReviewType} anyof ['Intake', 'Renewal', 'Interim']",
                title: "Is the certification period correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "CertPeriodCorrect_Comment_SNAP",
                visibleIf: "{CertPeriodCorrect_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Please describe what was incorrect about the cert period:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "RedetReceivedDuringPeriod_SNAP",
                visibleIf: "{ReviewDetails.SNAP.ReviewType} = 'Renewal'",
                title:
                  "Was the application for recertification received before the certification period ended?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, received after"
                  },
                  {
                    value: "NotReceived",
                    text: "No, not received"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AGRecertActionWithin30Days_SNAP",
                visibleIf: "{RedetReceivedDuringPeriod_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Did the AG take the required action within 30 days after the end of the certification period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RecertBenefitsFromActionDate_SNAP",
                visibleIf:
                  "{RedetReceivedDuringPeriod_SNAP} = 'Yes' AND\n{AGRecertActionWithin30Days_SNAP} = 'Yes'",
                title:
                  "Were benefits provided back to the date the AG took the required action?",
                isRequired: true,
                choices: ["Yes", "No "],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsFromRecertReceipt_SNAP",
                visibleIf:
                  "{RedetReceivedDuringPeriod_SNAP} = 'No' AND\n{AGRecertActionWithin30Days_SNAP} = 'Yes'",
                title:
                  "Were benefits authorized using the date the application for recertification was received by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RuntoComeUpMonth_SNAP",
                title:
                  "Was the case run at least to the come-up month (at the time of the worker's action)?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, and should have been"
                  },
                  {
                    value: "N/A",
                    text: "No, but should not have been"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NotAuthWithin30Days_SNAP",
                visibleIf:
                  "{MeetsExpeditedCriteria_SNAP} = false and {ReviewDetails.SNAP.ReviewType} = 'Intake'",
                title:
                  "Were benefits authorized within 30 days from the date of application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NotAuthWithin30Days_Fault_SNAP",
                visibleIf: "{NotAuthWithin30Days_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_SNAP",
                visibleIf:
                  "{ReviewDetails.SNAP.Status} anyof ['Denied', 'Discontinued'] and {ReviewDetails.SNAP.ReviewType} anyof ['Renewal', 'Intake']",
                title:
                  "Was the application denied timely (by 30th day or the following business day)?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_Fault_SNAP",
                visibleIf: "{DeniedTimely_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Authorization"
          },
          {
            type: "panel",
            name: "AssessmentPanel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "ABAWDScreening_SNAP",
                title: "Was an ABAWD screening completed for the client?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ABAWDStatusCorrect_SNAP",
                visibleIf: "{ABAWDScreening_SNAP} = 'Yes'",
                startWithNewLine: false,
                title: "Was the client's ABAWD status correctly assessed?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ScreeningInEDMS_SNAP",
                visibleIf: "{ABAWDScreening_SNAP} = 'Yes'",
                startWithNewLine: false,
                title: "Were the screening results added to EDMS?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "MeetExemption_SNAP",
                title:
                  "Based on your review, did the client meet an exemption?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ExemptionVerified_SNAP",
                visibleIf: '{MeetExemption_SNAP} = "Yes"',
                startWithNewLine: false,
                title:
                  "Was the exemption already verified at the time of the interview?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ExemptionWorkRegDetailUpdated_SNAP",
                visibleIf: '{MeetExemption_SNAP} = "Yes"',
                startWithNewLine: false,
                title:
                  "Was the Work Registration Detail Screen updated with the exemption?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ABAWDVerificationRequested_SNAP",
                visibleIf: "{ExemptionVerified_SNAP} ='No'",
                startWithNewLine: false,
                title: "Were the verifications requested?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "radiogroup",
                name: "ReferredtoSTS_SNAP",
                visibleIf:
                  "{MeetExemption_SNAP} = \"No\" \nOR {ExemptionVerified_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Was the client referred to SNAP to Skills?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            visibleIf:
              "{ReviewDetails.SNAP.ReviewType} anyof ['Intake', 'Renewal'] and {ReviewDetails.SNAP.Status} = 'Approved'",
            title: "Work Assessment",
            isRequired: true
          },
          {
            type: "panel",
            name: "Budget_Panel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "ElderlyDisabledAG_SNAP",
                title: "Is there an elderly or disabled member of the AG?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "matrixdropdown",
                name: "ExpenseMatrix_SNAP",
                title:
                  "Review the AG's actual expenses and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "ExpenseExists",
                    title: "Does the client actually have this type of costs?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this expense included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the expense verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.ExpenseExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true \nor {row.IncludedInError} = true"
                  }
                ],
                rows: [
                  {
                    value: "Shelter",
                    text: "Shelter Costs"
                  },
                  {
                    value: "Utilities",
                    text: "Utility Costs (Current Address)"
                  },
                  {
                    value: "Medical",
                    text: "Recurring Medical Costs"
                  },
                  {
                    value: "Medicare",
                    text: "Medicare Premium"
                  },
                  {
                    value: "RecurringMedical",
                    text: "Recurring Medical Expenses",
                    visibleIf: "{ElderlyDisabledAG_SNAP} = 'Yes'"
                  },
                  {
                    value: "ChildSupport",
                    text: "Court Ordered Child Support"
                  },
                  {
                    value: "Childcare",
                    text: "Dependent Care Expenses"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "BuyInMedicarePremium_SNAP",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Medicare.InBudget} = 'Yes' and {ExpenseMatrix_SNAP.Medicare.ExpenseExists} = 'Yes'",
                title:
                  "If the Medicare premium is paid by State Buy-In, is the Medicare page correct & Medicare premium removed from the budget?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "N/A, not paid by State buy-in"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "BuyInMedicarePremium_Comment_SNAP",
                visibleIf: "{BuyInMedicarePremium_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the Medicare premium:",
                isRequired: true
              },
              {
                type: "matrixdropdown",
                name: "IncomeMatrix_SNAP",
                title:
                  "Review the AG's actual income types and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "IncomeExists",
                    title: "Does the client actually have this type of income?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this income included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the income verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} == Yes and {row.InBudget} == No",
                    expression:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Earned",
                    text: "Earned Income"
                  },
                  {
                    value: "Unearned",
                    text: "Unearned Income"
                  },
                  {
                    value: "SSISSDI",
                    text: "SSI/SSDI"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "SSISSDIOverpayment_SNAP",
                visibleIf:
                  "{IncomeMatrix_SNAP.SSISSDI.IncomeExists} = 'Yes'\nAND {IncomeMatrix_SNAP.SSISSDI.InBudget} = 'Yes'",
                title:
                  "If the gross & net SSI or SSDI are different, was the net amount used if the amount is reduced due to an overpayment from the same source?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "N/A, gross/net are same"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "SSISSDIOverpayment_Comment_SNAP",
                visibleIf: "{SSISSDIOverpayment_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the SSI/SSDI:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "HowMeetMonthlyExpenses_SNAP",
                title:
                  "Has the client verified how they meet their monthly expenses if they exceed income?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, verified"
                  },
                  {
                    value: "No",
                    text: "No, not verified"
                  },
                  {
                    value: "N/A",
                    text: "N/A, expenses do not exceed income"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "HowMeetMonthlyExpenses_Comment_SNAP",
                visibleIf: "{HowMeetMonthlyExpenses_SNAP} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the expenses/icnome:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherBudgetErrors_SNAP",
                title: "Are there other budget errors not already noted above?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherBudgetErrors_Comment_SNAP",
                visibleIf: "{OtherBudgetErrors_SNAP} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Budget"
          },
          {
            type: "panel",
            name: "Verifications_Panel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "AgencyRequestVerifications_SNAP",
                title: "Did the agency request any verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes (including postponed verifications)"
                  },
                  {
                    value: "NoCorrect",
                    text: "No, nothing to request"
                  },
                  {
                    value: "NoIncorrect",
                    text: "No, some necessary verifications were not requested"
                  }
                ],
                colCount: 2
              },
              {
                type: "matrixdropdown",
                name: "RequestedVerifications_Matrix_SNAP",
                visibleIf: "{AgencyRequestVerifications_SNAP} = 'Yes'",
                indent: -2,
                title: "Please identify all verifications requested:",
                titleLocation: "top",
                isRequired: true,
                columns: [
                  {
                    name: "Requested",
                    title: "Requested?",
                    cellType: "checkbox",
                    choices: ["Yes"]
                  },
                  {
                    name: "Necessary",
                    title: "Necessary?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Checklist",
                    title:
                      "Included in verification checklist or request for contact?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf:
                      "{row.Requested} = ['Yes'] and {row.Necessary} <> 'No'",
                    choices: [
                      {
                        value: "Yes",
                        visibleIf: "{row.Requested} = ['Yes']"
                      },
                      {
                        value: "No",
                        visibleIf: "{row.Requested} = ['Yes']"
                      }
                    ]
                  },
                  {
                    name: "Verified",
                    title: "Verified Before Authorization?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf:
                      "{row.Requested} = ['Yes'] AND( {MeetsExpeditedCriteria_SNAP} = 'No'\nAND NOT( rowindex == 1)",
                    choices: ["Yes", "No"]
                  }
                ],
                rows: [
                  "Identity",
                  "Income",
                  "Citizenship",
                  {
                    value: "Shelter",
                    text: "Utility Expense"
                  },
                  {
                    value: "Rent",
                    text: "Rent/Mortgage"
                  },
                  {
                    value: "Other",
                    text: "Other (describe below)"
                  }
                ]
              },
              {
                type: "expression",
                name: "UnnecessaryVerifications_SNAP",
                visible: false,
                title:
                  "Hidden Logic to Calculate whether unnecessary verifications were requested",
                expression:
                  "{RequestedVerifications_SNAP.Identity.Necessary} = 'No' OR\n{RequestedVerifications_SNAP.Income.Necessary} = 'No' OR\n{RequestedVerifications_SNAP.Citizenship.Necessary} = 'No' OR\n{RequestedVerifications_SNAP.Rent.Necessary} = 'No' OR\n{RequestedVerifications_SNAP.Shelter.Necessary} = 'No' OR\n{RequestedVerifications_SNAP.Other.Necessary} = 'No'"
              },
              {
                type: "comment",
                name: "OtherVerifications_SNAP",
                visibleIf:
                  "{RequestedVerifications_SNAP.Other.Requested} = ['Yes']",
                title: "What other verifications were requested?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UnnecessaryVerificationsPostponed_SNAP",
                visibleIf:
                  "{MeetsExpeditedCriteria_SNAP} = true and {AgencyRequestVerifications_SNAP} = 'Yes' and {RequestedVerifications_Matrix_SNAP.Identity.Necessary} <> 'Yes'",
                title:
                  "Were the benefits authorized at interview and any verifications postponed?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text:
                      "No, a checklist was issued and benefits were not authorized at interview"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "PostponedSecondMonth_SNAP",
                visibleIf:
                  "{MeetsExpeditedCriteria_SNAP} = true and {AgencyRequestVerifications_SNAP} = 'Yes'",
                title:
                  "Were necessary verifications received prior to issuance of a second full month of benefits?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text:
                      "Yes, verifications were received prior to a second month being issued."
                  },
                  {
                    value: "No",
                    text:
                      "No, a second month was issued without receiving necessary verifications."
                  },
                  {
                    value: "FailedtoIssue",
                    text:
                      "Verifications were received but a second month was not issued."
                  },
                  {
                    value: "No Second Month",
                    text: "It is still too soon to issue a second month."
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "PostponedSecondMonthUnverified_Fault_SNAP",
                visibleIf: "{PostponedSecondMonth_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was it fault of the worker under review: {EligSpec} that a second month was issued without verifications?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "PostponedSecondMonthFailedToIssue_Fault_SNAP",
                visibleIf: "{PostponedSecondMonth_SNAP} = 'FailedtoIssue'",
                startWithNewLine: false,
                title:
                  "Was it fault of the worker under review: {EligSpec} that a a second month has not been issued?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "PendingNoticeon30thDay_SNAP",
                visibleIf:
                  "{AgencyRequestVerifications_SNAP} = 'Yes'\nand {ReviewDetails.SNAP.ReviewType} = 'Intake'",
                title:
                  "Was a pending notice provided on the 30th day for required verifications, if needed?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, notice was provided"
                  },
                  {
                    value: "No",
                    text: "No, notice was not provided"
                  },
                  {
                    value: "NA",
                    text: "N/A, Not needed"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "PendingNoticeon30thDay_Fault_SNAP",
                visibleIf: "{PendingNoticeon30thDay_SNAP} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SNAPBenefitsDenied&WereNot_SNAP",
                visibleIf:
                  "{AgencyRequestVerifications_SNAP} = 'Yes'\nAND( {ReviewDetails.SNAP.ReviewType} = 'Intake' \nOR {ReviewDetails.SNAP.ReviewType} = 'Renewal') ",
                title:
                  "Should the SNAP benefits have been denied due to failure of the AG to cooperate in obtaining necessary verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, benefits were authorized in error"
                  },
                  {
                    value: "No",
                    text: "No, case was authorized properly"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "UnaddressedAlertsIEVS_SNAP",
                title:
                  "Are there unaddressed alerts and/or IEVS matches that may affect the current eligibility?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "UnaddressedAlertsIEVS_Comment_SNAP",
                visibleIf: "{UnaddressedAlertsIEVS_SNAP} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Please describe the problem with the unaddressed alerts. \n(Don't include PII/FTI!):",
                isRequired: true
              }
            ],
            title: "Verifications"
          },
          {
            type: "panel",
            name: "Misc_Panel_SNAP",
            elements: [
              {
                type: "radiogroup",
                name: "IsOutcomeCorrect_SNAP",
                title:
                  "Was the case outcome ({ReviewDetails.SNAP.Status}) correct?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "OutcomeIncorrectComment_SNAP",
                visibleIf: "{IsOutcomeCorrect_SNAP} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect?",
                isRequired: true
              },
              {
                type: "matrixdropdown",
                name: "BenefitAmountCorrect_Matrix_SNAP",
                visibleIf: "{ReviewDetails.SNAP.Status} <> 'Pending'",
                title: "Was the SNAP allotment correct?\n",
                description:
                  "If this is a pre-authorization review, such as of an employee in their New Hire period, report on the proposed amount.",
                isRequired: true,
                columns: [
                  {
                    name: "Correct",
                    title: "Correct?",
                    cellType: "radiogroup",
                    colCount: 2,
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "AtReview",
                    title: "Amount at Review ($)",
                    cellType: "text",
                    isRequired: true,
                    visibleIf: "{row.Correct} = 'No'",
                    validators: [
                      {
                        type: "numeric",
                        minValue: 0
                      }
                    ],
                    totalDisplayStyle: "currency",
                    inputType: "number",
                    min: "0",
                    step: 0.01
                  },
                  {
                    name: "CorrectedAmt",
                    title: "Correct Amount",
                    cellType: "text",
                    isRequired: true,
                    visibleIf: "{row.Correct} = 'No'",
                    requiredIf:
                      "{row.CorrectTBD} notcontains 'Cannot Identify Correct Amt'",
                    validators: [
                      {
                        type: "numeric",
                        minValue: 0
                      }
                    ],
                    totalDisplayStyle: "currency",
                    inputType: "number",
                    min: "0",
                    step: 0.01
                  },
                  {
                    name: "Difference",
                    cellType: "expression",
                    visibleIf:
                      "{row.Correct} = 'No' and {row.CorrectTBD} notcontains 'Cannot Identify Correct Amt'",
                    expression: "{row.AtReview}-{row.CorrectedAmt}",
                    displayStyle: "currency"
                  },
                  {
                    name: "CorrectTBD",
                    title: "Correction TBD",
                    cellType: "checkbox",
                    visibleIf: "{row.Correct} = 'No'",
                    enableIf: "{row.CorrectedAmt} empty",
                    choices: ["Cannot Identify Correct Amt"]
                  }
                ],
                choices: [1, 2, 3, 4, 5],
                rows: [
                  {
                    value: "Initial",
                    text: "Initial Month"
                  },
                  "Ongoing"
                ]
              },
              {
                type: "radiogroup",
                name: "OtherErrors_SNAP",
                title: "Are there other SNAP errors not addressed above?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherErrors_Comment_SNAP",
                visibleIf: "{OtherErrors_SNAP} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Miscellaneous"
          }
        ],
        visibleIf: "{ReviewDetails.SNAP.Included} = 'Yes'",
        title: "SNAP Review Section"
      },
      {
        name: "SNAPET_Section",
        elements: [
          {
            type: "expression",
            name: "CaseNameDisplay_SNAPET",
            title: "Case Name:",
            titleLocation: "left",
            expression: "{CaseName}"
          },
          {
            type: "expression",
            name: "CaseNumberDisplay_SNAPET",
            startWithNewLine: false,
            title: "Case Number:",
            titleLocation: "left",
            expression: "{ReviewDetails.SNAPET.CaseNumber}"
          },
          {
            type: "expression",
            name: "BlockDisplay_SNAPET",
            startWithNewLine: false,
            title: "Block:",
            expression: "{ReviewDetails.SNAPET.Block}"
          },
          {
            type: "panel",
            name: "JournalNotesPanel_SNAPET",
            elements: [
              {
                type: "radiogroup",
                name: "JournalNotes_SNAPET",
                title: "Are there journal notes regarding the action taken?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalAdequate_SNAPET",
                visibleIf: "{JournalNotes_SNAPET} = 'Yes'",
                title: "Were the journal notes adequate?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalAdequate_Comment_SNAPET",
                visibleIf: "{JournalAdequate_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "What was inadequate about the notes?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "JournalDescriptionSufficient_SNAPET",
                visibleIf: "{JournalNotes_SNAPET} = 'Yes'",
                title:
                  "Does the Journal Description for these notes summarize the worker's action?",
                description:
                  'For example, does it describe the case action ("Denied for over-income") or does it just say "Overtime Assignment" or "Call Center"?',
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalDescriptionSufficient_Comment_SNAPET",
                visibleIf: "{JournalDescriptionSufficient_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "What was wrong with the Journal Description?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "FTIinJournalEntry_SNAPET",
                visibleIf: "{JournalNotes_SNAPET} = 'Yes'",
                title:
                  "Is there Federal Tax Information (FTI) in the Journal Entry?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Journal Notes"
          },
          {
            type: "panel",
            name: "AssessmentPanel_SNAPET",
            elements: [
              {
                type: "radiogroup",
                name: "ABAWDScreening_SNAPET",
                title: "Did STS complete an ABAWD screening for the client",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ABAWDStatusCorrect_SNAPET",
                visibleIf: "{ABAWDScreening_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title: "Was the client's ABAWD status correctly assessed?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ScreeningInEDMS_SNAPET",
                visibleIf: "{ABAWDScreening_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title: "Were the screening results added to EDMS?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NFSCScreeningAgree_SNAPET",
                title:
                  "Did the STS screening produce the same results as the NFSC screening?",
                isRequired: true,
                choices: ["Yes", "No", "No NFSC screening"],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "MeetExemption_SNAPET",
                title: "Did the client meet an exemption?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ExemptionVerified_SNAPET",
                visibleIf: '{MeetExemption_SNAPET} = "Yes"',
                startWithNewLine: false,
                title:
                  "Was the exemption already verified at the time of the interview?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ExemptionRequested_SNAPET",
                visibleIf: "{ExemptionVerified_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "Were the verifications requested?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "radiogroup",
                name: "ExemptionWorkRegDetailUpdated_SNAPET",
                visibleIf: '{MeetExemption_SNAPET} = "Yes"',
                startWithNewLine: false,
                title:
                  "Was the Work Registration Detail Screen updated with the exemption?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AllExemptionsRecorded_SNAPET",
                visibleIf: '{MeetExemption_SNAPET} = "Yes"',
                startWithNewLine: false,
                title:
                  "Were all corresponding exemption screens updated correctly?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "AllExemptionsRecorded_Comment_SNAPET",
                visibleIf: "{AllExemptionsRecorded_SNAPET} = 'No'",
                startWithNewLine: false,
                title:
                  "What was incorrect about how the exemptions were recorded?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              }
            ],
            title: "Assessment",
            isRequired: true
          },
          {
            type: "panel",
            name: "ApptPanel_SNAPET",
            elements: [
              {
                type: "radiogroup",
                name: "ApptLetter_SNAPET",
                startWithNewLine: false,
                title: "Was the client sent an appointment letter?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ApptTimely_SNAPET",
                startWithNewLine: false,
                title: "Was the appointment scheduled timely?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes"
                  },
                  {
                    value: "No",
                    text: "No"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "UntimelyApptCause_SNAPET",
                visibleIf: "{ApptTimely_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "Why was the appointment untimely?",
                isRequired: true,
                choices: [
                  {
                    value: "DelayedReferral",
                    text: "Delayed/No Referral by NFSC"
                  },
                  {
                    value: "DelaySTS",
                    text: "Delayed Scheduling by STS"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "UntimelyApptCause_Fault_SNAPET",
                visibleIf: "{UntimelyApptCause_SNAPET} = 'DelaySTS'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "MissSTSAppt_SNAPET",
                title: "Did the client miss a SNAP to Skills appointment?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "GoodCause_SNAPET",
                visibleIf: '{MissSTSAppt_SNAPET} = "Yes"',
                startWithNewLine: false,
                title: "Was valid good cause provided timely?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RescheduledAppt_SNAPET",
                visibleIf: "{GoodCause_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title: "Was the client rescheduled?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "MissedApptSanction_SNAPET",
                visibleIf: "{GoodCause_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "Was the client sanctioned?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "SNAP to Skills Intake Appointment",
            isRequired: true
          },
          {
            type: "panel",
            name: "RegainingPanel_SNAPET",
            elements: [
              {
                type: "radiogroup",
                name: "WasRegaining_SNAPET",
                title:
                  "Was the client regaining eligibility (had an open Non-Compliance record)?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RegainEligWorkReqMet_SNAPET",
                visibleIf: "{WasRegaining_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Did the client regain eligibility prior to authorization?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RegainingVerification_SNAPET",
                visibleIf: "{RegainEligWorkReqMet_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title: "Was verification provided?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ComplianceCorrect_SNAPET",
                visibleIf: "{RegainEligWorkReqMet_SNAPET} = 'Yes'",
                title: "Was the non-compliance ended?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NonComplianceEndDates_SNAPET",
                visibleIf: "{ComplianceCorrect_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title: "Are the end dates correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SuppplementalBenefits_SNAPET",
                startWithNewLine: false,
                title: "Were supplemental benefits issued (if needed?)",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "None needed"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "Has3of36_SNAPET",
                title:
                  "Had the individual received benefits for 3 or more months of SNAP in a 36-month period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "3of36MeetWorkRequirements_SNAPET",
                visibleIf: '{Has3of36_SNAPET} = "Yes"',
                startWithNewLine: false,
                title: "Was the individual meeting the work requirements?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "3of36ProposetoTerminateTimely_SNAPET",
                visibleIf: "{3of36MeetWorkRequirements_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "Did the agency propose to terminate benefits timely?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, not terminated at all"
                  },
                  {
                    value: "Late",
                    text: "No, terminated after third month"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "UntimelyTerminationInvestigations_SNAPET",
                visibleIf: "{3of36ProposetoTerminateTimely_SNAPET} = 'Late'",
                startWithNewLine: false,
                title:
                  "Was the case referred to investigations after being terminated late?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "SanctionEmployActScreenEndDated_SNAPET",
                visibleIf:
                  "{3of36ProposetoTerminateTimely_SNAPET} = 'Yes'\nOR {3of36ProposetoTerminateTimely_SNAPET} = 'Late'",
                title: "Was the employment activity screen end dated?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Eligibility"
          },
          {
            type: "panel",
            name: "WorkAssignmentPanel_SNAPET",
            elements: [
              {
                type: "checkbox",
                name: "WorkAssignments_SNAPET",
                title:
                  "Through what work activities did the client meet their work requirement?",
                isRequired: true,
                choices: [
                  {
                    value: "Employment",
                    text: "Employment (Paid/Unpaid)"
                  },
                  {
                    value: "WEP",
                    text: "Work Experience Program"
                  },
                  {
                    value: "JSJR",
                    text: "Job Search/Job Readiness"
                  },
                  "Education"
                ],
                hasOther: true,
                otherText: "Other (Describe)",
                colCount: 4
              },
              {
                type: "radiogroup",
                name: "EmpScreenCorrectUnpaidInkindEmploy_SNAPET",
                visibleIf: "{WorkAssignments_SNAPET} contains 'Employment'",
                title:
                  "Is the employment screen completed correctly for Unpaid/In-kind employment?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "text",
                name: "EmployedHours_SNAPET",
                visibleIf: "{WorkAssignments_SNAPET} contains 'Employment'",
                startWithNewLine: false,
                title: "How many hours per week is the client employed?",
                isRequired: true,
                validators: [
                  {
                    type: "numeric",
                    text: "Weekly hours should be 0-80",
                    minValue: 0,
                    maxValue: 80
                  }
                ],
                inputType: "number"
              },
              {
                type: "radiogroup",
                name: "EmployLess20hrswkAnothrWorkAct_SNAPET",
                visibleIf: "{EmployedHours_SNAPET} < 20",
                startWithNewLine: false,
                title:
                  "Was the client assigned to a sufficient number of hours in other activities?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "WEPComplyWithFLSA_SNAPET",
                visibleIf: "{WorkAssignments_SNAPET} contain 'WEP'",
                title:
                  "Do the WEP hours assigned comply with FLSA requirements?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SchoolEmployPlan_SNAPET",
                visibleIf: "{WorkAssignments_SNAPET} notempty",
                startWithNewLine: false,
                title: "Is there a signed employability plan on file?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "EmployActScreenAppropActivity_SNAPET",
                title:
                  "Was the employment activity screen correctly updated with the activities?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "IWAMServAuth_SNAPET",
                title: "Was a service authorization completed?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "IWAMAlertsNegAction_SNAPET",
                visibleIf: '{IWAMServAuth_SNAPET} = "Yes"',
                startWithNewLine: false,
                title: "Were the IWAM alerts read to take negative action?",
                isRequired: true,
                choices: ["Yes", "No", "N/A"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BackgroundCheckReferral_SNAPET",
                title:
                  "Was the client referred for a background check (if needed)?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "Not applicable to selected provider"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "FelonyAssignedActAppropriate_SNAPET",
                title:
                  "If the client has a felony, is the assigned work activity appropriate?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, no felony record"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "FelonyAssignedActAppropriate_Comment_SNAPET",
                visibleIf: "{FelonyAssignedActAppropriate_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "What was inappropriate about the activity?"
              },
              {
                type: "radiogroup",
                name: "NoHSDiplomaGEDAssignActAppropriate_SNAPET",
                title:
                  "If the client does not have a HS diploma or GED, is the assigned work activity appropriate?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, has a GED-equivalent"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "NoHSDiplomaGEDAssignActAppropriate_Comment_SNAPET",
                visibleIf: "{NoHSDiplomaGEDAssignActAppropriate_SNAPET} = 'No'",
                startWithNewLine: false,
                title: "What was inappropriate about the activity?"
              }
            ],
            title: "Work Assignment",
            isRequired: true
          },
          {
            type: "panel",
            name: "Misc_SNAPET",
            elements: [
              {
                type: "radiogroup",
                name: "OtherErrors_SNAPET",
                title:
                  "Are there other SNAP E&T errors not addressed in the questions above?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherErrors_Comment_SNAPET",
                visibleIf: "{OtherErrors_SNAPET} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Miscellaneous",
            isRequired: true
          }
        ],
        visibleIf: "{ReviewDetails.SNAPET.Included} = 'Yes'",
        title: "SNAP E&T Section"
      },
      {
        name: "TANF_Section",
        elements: [
          {
            type: "html",
            name: "TANFPolicyLink",
            html:
              '<a href="http://innerweb.odjfs.state.oh.us/Initiatives/CRIS-E/training/OhioBenefitsTrainingResources.stm" target=_"blank"> Link to TANF Policy </a>'
          },
          {
            type: "expression",
            name: "CaseNameDisplay_TANF",
            title: "Case Name:",
            expression: "{CaseName}"
          },
          {
            type: "expression",
            name: "CaseNumberDisplay_TANF",
            startWithNewLine: false,
            title: "Case Number:",
            expression: "{ReviewDetails.TANF.CaseNumber}"
          },
          {
            type: "expression",
            name: "BlockDisplay_TANF",
            startWithNewLine: false,
            title: "Block:",
            expression: "{ReviewDetails.TANF.Block}"
          },
          {
            type: "panel",
            name: "JournalNotesPanel_TANF",
            elements: [
              {
                type: "radiogroup",
                name: "JournalNotes_TANF",
                title: "Are there journal notes regarding the action taken?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalTemplate_TANF",
                visibleIf: "{JournalNotes_TANF} = 'Yes'",
                startWithNewLine: false,
                title: "Was the journal template used?",
                isRequired: true,
                choices: ["Yes", "No", "NA"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalAdequate_TANF",
                visibleIf: "{JournalNotes_TANF} = 'Yes'",
                title: "Were the journal notes adequate?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalAdequate_Comment_TANF",
                visibleIf: "{JournalAdequate_TANF} = 'No'",
                startWithNewLine: false,
                title: "What was inadequate about the notes?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "JournalDescriptionSufficient_TANF",
                visibleIf: "{JournalNotes_TANF} = 'Yes'",
                title:
                  "Does the Journal Description for these notes summarize the worker's action?",
                description:
                  'For example, does it describe the case action ("Denied for over-income") or does it just say "Overtime Assignment" or "Call Center"?',
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalDescriptionSufficient_Comment_TANF",
                visibleIf: "{JournalDescriptionSufficient_TANF} = 'No'",
                startWithNewLine: false,
                title: "What was wrong with the Journal Description?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "FTIinJournalEntry_TANF",
                visibleIf: "{JournalNotes_TANF} = 'Yes'",
                title:
                  "Is there Federal Tax Information (FTI) in the Journal Entry?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Journal Notes"
          },
          {
            type: "panel",
            name: "Interview_TANF",
            elements: [
              {
                type: "radiogroup",
                name: "TimelyInterviewScheduled_TANF",
                visibleIf:
                  "{ReviewDetails.TANF.ReviewType} contains 'Intake' OR {ReviewDetails.TANF.ReviewType} contains 'Renewal']",
                title: "Was an interview scheduled timely?",
                isRequired: true,
                choices: [
                  "Yes, scheduled timely",
                  "No, scheduled untimely or not scheduled",
                  "Walk-in or other unscheduled appointment"
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewScheduleDelayByAgency_TANF",
                visibleIf: '{TimelyInterviewScheduled_TANF} = "No"',
                startWithNewLine: false,
                title: "Was the scheduling delay caused by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewScheduleDelayByAgency_Fault_TANF",
                visibleIf: "{InterviewScheduleDelayByAgency_TANF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewHeldTimely_TANF",
                visibleIf:
                  "{ReviewDetails.TANF.ReviewType} contains 'Intake' OR {ReviewDetails.TANF.ReviewType} contains 'Renewal']",
                title: "Was an interview held timely?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, Interview held timely"
                  },
                  {
                    value: "No",
                    text: "No, Interview held untimely"
                  },
                  {
                    value: "NoInterview",
                    text: "The client did not attend an interview at all"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewDelaybyAgency_TANF",
                visibleIf: '{InterviewHeldTimely_TANF} = "No"\n ',
                title: "Was the interview delay caused by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewDelaybyAgency_Fault_TANF",
                visibleIf: "{InterviewDelaybyAgency_TANF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsRestoredtoAppDate_TANF",
                visibleIf: "{InterviewDelaybyAgency_TANF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Were benefits restored back to the AG's application date or beginning recertification period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "CustomerScheduleUpdate_TANF",
                title:
                  "Was the Customer Schedule screen in OBWP updated appropriately?",
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A (Phone Application)"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "AnyMissedInterviews_TANF",
                visibleIf: "{InterviewHeldTimely_TANF} anyof ['Yes', 'No']",
                title: "Did the client miss any scheduled interviews?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NOMIIssued_TANF",
                visibleIf:
                  "{InterviewHeldTimely_TANF} = 'NoInterview'\nOR {AnyMissedInterviews_TANF} = 'Yes'",
                startWithNewLine: false,
                title: "Was a NOMI issued for the missed interview(s)?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NOMIIssued_Fault_TANF",
                visibleIf: "{NOMIIssued_TANF} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ChildOnly_TANF",
                title: "Is the application for child only cash?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JETReferral_TANF",
                startWithNewLine: false,
                title: "Was a referral sent to JET?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JETReferralTimely_TANF",
                visibleIf:
                  "{JETReferral_TANF} = 'Yes' and {ChildOnly_TANF} = 'No'",
                startWithNewLine: false,
                title:
                  "Was the referral within 30 days of the application date?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SignedApplicationAudiosignature_TANF",
                visibleIf:
                  "{ReviewDetails.TANF.ReviewType} anyof ['Intake', 'Renewal']",
                title: "Is there a signed application or audio signature?",
                isRequired: true,
                choices: [
                  {
                    value: "Paper",
                    text: "Yes, a Paper Application"
                  },
                  {
                    value: "Audio",
                    text: "Yes, an Audio Signature"
                  },
                  "No"
                ]
              }
            ],
            visibleIf:
              "{ReviewDetails.TANF.ReviewType} contains 'Intake' OR {ReviewDetails.TANF.ReviewType} contains 'Renewal']",
            title: "Interview"
          },
          {
            type: "panel",
            name: "AuthorizationPanel_TANF",
            elements: [
              {
                type: "radiogroup",
                name: "AuthRepCorrect_TANF",
                title: "Is the Authorized Representative information correct?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, omitted in error"
                  },
                  {
                    value: "N/A",
                    text: "Not applicable"
                  }
                ],
                hideIfChoicesEmpty: true,
                colCount: 2
              },
              {
                type: "comment",
                name: "AuthRepCorrect_Comment_TANF",
                visibleIf: "{AuthRepCorrect_TANF} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "IntakeCorrectAppDate_TANF",
                visibleIf: "{ReviewDetails.TANF.ReviewType} = 'Intake'",
                title: "Was the correct application date used?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "IntakeCorrectAppDate_Comment_TANF",
                visibleIf: "{IntakeCorrectAppDate_TANF} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect about the app date:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "CertPeriodCorrect_TANF",
                visibleIf:
                  "{ReviewDetails.TANF.ReviewType} contains 'Intake' OR {ReviewDetails.TANF.ReviewType} contains 'Renewal' OR {ReviewDetails.TANF.ReviewType} contains 'Interim'",
                title: "Is the certification period correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "CertPeriodCorrect_Comment_TANF",
                visibleIf: "{CertPeriodCorrect_TANF} = 'No'",
                startWithNewLine: false,
                title:
                  "Please describe what was incorrect about the cert period:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "RedetReceivedDuringPeriod_TANF",
                visibleIf: "{ReviewDetails.TANF.ReviewType} = 'Renewal'",
                title:
                  "Was the application for recertification received before the certification period ended?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, received after"
                  },
                  {
                    value: "NotReceived",
                    text: "No, not received"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AGRecertActionWithin30Days_TANF",
                visibleIf: "{RedetReceivedDuringPeriod_TANF} = 'No'",
                startWithNewLine: false,
                title:
                  "Did the AG take the required action within 30 days after the end of the certification period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RecertBenefitsFromActionDate_TANF",
                visibleIf:
                  "{RedetReceivedDuringPeriod_TANF} = 'Yes' AND\n{AGRecertActionWithin30Days_TANF} = 'Yes'",
                title:
                  "Were benefits provided back to the date the AG took the required action?",
                isRequired: true,
                choices: ["Yes", "No "],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsFromRecertReceipt_TANF",
                visibleIf:
                  "{RedetReceivedDuringPeriod_TANF} = 'No' AND\n{AGRecertActionWithin30Days_TANF} = 'Yes'",
                title:
                  "Were benefits authorized using the date the application for recertification was received by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RuntoComeUpMonth_TANF",
                title:
                  "Was the case run at least to the come-up month (at the time of the worker's action)?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, and should have been"
                  },
                  {
                    value: "N/A",
                    text: "No, but should not have been"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NotAuthWithin30Days_TANF",
                visibleIf:
                  "({ReviewDetails.TANF.ReviewType} contains 'Renewal' OR {ReviewDetails.TANF.ReviewType} contains 'Intake')",
                title:
                  "Were benefits authorized within 30 days from the date of application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NotAuthWithin30Days_Fault_TANF",
                visibleIf: "{NotAuthWithin30Days_TANF} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_TANF",
                visibleIf:
                  "{ReviewDetails.TANF.Status} anyof ['Denied', 'Discontinued']",
                title:
                  "Was the application denied timely (by 30th day or the following business day)?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_Fault_TANF",
                visibleIf: "{DeniedTimely_TANF} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Authorization"
          },
          {
            type: "panel",
            name: "BudgetPanel_TANF",
            elements: [
              {
                type: "matrixdropdown",
                name: "ExpenseMatrix_TANF",
                title:
                  "Review the AG's actual expenses and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "ExpenseExists",
                    title: "Does the client actually have this type of costs?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this expense included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the expense verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.ExpenseExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Shelter",
                    text: "Shelter Costs"
                  },
                  {
                    value: "Utilities",
                    text: "Utility Costs (Current Address)"
                  },
                  {
                    value: "Medical",
                    text: "Medical Costs"
                  },
                  {
                    value: "Medicare",
                    text: "Medicare Premium"
                  },
                  {
                    value: "RecurringMedical",
                    text: "Recurring Medical Expenses"
                  },
                  {
                    value: "ChildSupport",
                    text: "Court Ordered Child Support"
                  },
                  {
                    value: "Childcare",
                    text: "Dependent Care Expenses"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "BuyInMedicarePremium_TANF",
                visibleIf:
                  "{ExpenseMatrix_TANF.Medicare.InBudget} = 'Yes' and {ExpenseMatrix_TANF.Medicare.ExpenseExists} = 'Yes'",
                title:
                  "If the Medicare premium is paid by State Buy-In, is the Medicare page correct & Medicare premium removed from the budget?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "Not paid by State buy-in"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "BuyInMedicarePremium_Comment_TANF",
                visibleIf: "{BuyInMedicarePremium_TANF} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the Medicare premium:",
                isRequired: true
              },
              {
                type: "matrixdropdown",
                name: "IncomeMatrix_TANF",
                title:
                  "Review the AG's actual income types and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "IncomeExists",
                    title: "Does the client actually have this type of income?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this income included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the income verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Earned",
                    text: "Earned Income"
                  },
                  {
                    value: "Unearned",
                    text: "Unearned Income"
                  },
                  {
                    value: "SSISSDI",
                    text: "SSI/SSDI"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "SSISSDIOverpayment_TANF",
                visibleIf:
                  "{IncomeMatrix_TANF.SSISSDI.IncomeExists} = 'Yes'\nAND {IncomeMatrix_TANF.SSISSDI.InBudget} = 'Yes'",
                title:
                  "If the gross & net SSI or SSDI are different, was the net amount used if the amount is reduced due to an overpayment from the same source?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "N/A, gross/net are same"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "SSISSDIOverpayment_Comment_TANF",
                visibleIf: "{SSISSDIOverpayment_TANF} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the SSI/SSDI:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherBudgetErrors_TANF",
                title: "Are there other budget errors not already noted above?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherBudgetErrors_Comment_TANF",
                visibleIf: "{OtherBudgetErrors_TANF} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Budget"
          },
          {
            type: "panel",
            name: "Verifications_Panel_TANF",
            elements: [
              {
                type: "radiogroup",
                name: "NotChildCashCaretaker_TANF",
                visibleIf: '{ChildOnly_TANF} = "No"',
                startWithNewLine: false,
                title:
                  "Is the caretaker a parent or verified custodian/legal guardian?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ChildOnlySpecifiedRelative_TANF",
                visibleIf: '{ChildOnly_TANF} = "Yes"',
                startWithNewLine: false,
                title: "Is the caretaker a specified relative?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ChildRelativeVerified_TANF",
                visibleIf: '{ChildOnlySpecifiedRelative_TANF} = "Yes"',
                startWithNewLine: false,
                title: "Has the relationship been verified?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AgencyRequestVerifications_TANF",
                title: "Did the agency request any verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes"
                  },
                  {
                    value: "NoCorrect",
                    text: "No, nothing to request"
                  },
                  {
                    value: "NoIncorrect",
                    text: "No, some necessary verifications were not requested"
                  }
                ],
                colCount: 2
              },
              {
                type: "matrixdropdown",
                name: "RequestedVerifications_Matrix_TANF",
                visibleIf: "{AgencyRequestVerifications_TANF} = 'Yes'",
                indent: -2,
                title: "Please identify all verifications requested:",
                titleLocation: "top",
                isRequired: true,
                columns: [
                  {
                    name: "Requested",
                    title: "Requested?",
                    cellType: "checkbox",
                    choices: ["Yes"]
                  },
                  {
                    name: "Checklist",
                    title:
                      "Included in verification checklist or request for contact?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Verified Before Authorization?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  }
                ],
                rows: [
                  "Identity",
                  "Income",
                  "Citizenship",
                  {
                    value: "Shelter",
                    text: "Utilities"
                  },
                  {
                    value: "Rent",
                    text: "Rent/Mortgage"
                  },
                  {
                    value: "Other",
                    text: "Other (describe below)"
                  }
                ]
              },
              {
                type: "comment",
                name: "OtherVerifications_TANF",
                visibleIf:
                  "{RequestedVerifications_TANF.Other.Requested} = ['Yes']",
                title: "What other verifications were requested?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "TANFBenefitsDenied&WereNot_TANF",
                visibleIf:
                  "{AgencyRequestVerifications_TANF} = 'Yes'\nAND( {ReviewDetails.TANF.ReviewType} = 'Intake' \nOR {ReviewDetails.TANF.ReviewType} = 'Renewal') ",
                title:
                  "Should the TANF benefits have been denied due to failure of the AG to cooperate in obtaining necessary verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, benefits were authorized in error"
                  },
                  {
                    value: "No",
                    text: "No, case was authorized properly"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "UnaddressedAlertsIEVS_TANF",
                title:
                  "Are there unaddressed alerts and/or IEVS matches that may affect the current eligibility?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "UnaddressedAlertsIEVS_Comment_TANF",
                visibleIf: "{UnaddressedAlertsIEVS_TANF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Please describe the problem with the unaddressed alerts. \n(Don't include PII/FTI!):",
                isRequired: true
              }
            ],
            title: "Verifications"
          },
          {
            type: "panel",
            name: "Misc_TANF",
            elements: [
              {
                type: "radiogroup",
                name: "IsOutcomeCorrect_TANF",
                title:
                  "Was the case outcome ({ReviewDetails.TANF.Status}) correct?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "OutcomeIncorrectComment_TANF",
                visibleIf: "{IsOutcomeCorrect_TANF} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "DegreeListUpdatedinOBWP_TANF",
                title: "Was the Degrees List updated in OBWP?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "matrixdropdown",
                name: "BenefitAmountCorrect_Matrix_TANF",
                title: "Was the TANF benefits amount correct?",
                description:
                  "If this is a pre-authorization review, such as of an employee in their New Hire period, report on the proposed amount.",
                isRequired: true,
                columns: [
                  {
                    name: "Correct",
                    title: "Correct?",
                    cellType: "radiogroup",
                    colCount: 2,
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "AtReview",
                    title: "Amount at Review ($)",
                    cellType: "text",
                    isRequired: true,
                    visibleIf: "{row.Correct} = 'No'",
                    validators: [
                      {
                        type: "numeric",
                        minValue: 0
                      }
                    ],
                    totalDisplayStyle: "currency",
                    inputType: "number",
                    min: "0",
                    step: 0.01
                  },
                  {
                    name: "CorrectedAmt",
                    title: "Correct Amount",
                    cellType: "text",
                    isRequired: true,
                    visibleIf: "{row.Correct} = 'No'",
                    requiredIf:
                      "{row.CorrectTBD} notcontains 'Cannot Identify Correct Amt'",
                    validators: [
                      {
                        type: "numeric",
                        minValue: 0
                      }
                    ],
                    totalDisplayStyle: "currency",
                    inputType: "number",
                    min: "0",
                    step: 0.01
                  },
                  {
                    name: "Difference",
                    cellType: "expression",
                    visibleIf:
                      "{row.Correct} = 'No' and {row.CorrectTBD} notcontains 'Cannot Identify Correct Amt'",
                    expression: "{row.AtReview}-{row.CorrectedAmt}",
                    displayStyle: "currency"
                  },
                  {
                    name: "CorrectTBD",
                    title: "Correction TBD",
                    cellType: "checkbox",
                    visibleIf: "{row.Correct} = 'No'",
                    enableIf: "{row.CorrectedAmt} empty",
                    choices: ["Cannot Identify Correct Amt"]
                  }
                ],
                choices: [1, 2, 3, 4, 5],
                rows: [
                  {
                    value: "Initial",
                    text: "Initial Month"
                  },
                  "Ongoing"
                ]
              },
              {
                type: "radiogroup",
                name: "OtherErrors_TANF",
                title:
                  "Are there other TANF errors not addressed in the questions above?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherErrorsComment_TANF",
                visibleIf: "{OtherErrors_TANF} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Miscellaneous"
          }
        ],
        visibleIf: "{ReviewDetails.TANF.Included} = 'Yes'",
        title: "TANF "
      },
      {
        name: "OWF_Section",
        elements: [
          {
            type: "expression",
            name: "CaseNameDisplay_OWF",
            title: "Case Name:",
            expression: "{CaseName}"
          },
          {
            type: "expression",
            name: "CaseNumberDisplay_OWF",
            startWithNewLine: false,
            title: "Case Number:",
            expression: "{ReviewDetails.OWF.CaseNumber}"
          },
          {
            type: "expression",
            name: "BlockDisplay_OWF",
            startWithNewLine: false,
            title: "Block:",
            expression: "{ReviewDetails.OWF.Block}"
          },
          {
            type: "panel",
            name: "JournalNotesPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "JournalNotes_OWF",
                title: "Are there journal notes regarding the action taken?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalAdequate_OWF",
                visibleIf: "{JournalNotes_OWF} = 'Yes'",
                title: "Were the journal notes adequate?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalAdequate_Comment_OWF",
                visibleIf: "{JournalAdequate_OWF} = 'No'",
                startWithNewLine: false,
                title: "What was inadequate about the notes?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "JournalDescriptionSufficient_OWF",
                visibleIf: "{JournalNotes_OWF} = 'Yes'",
                title:
                  "Does the Journal Description for these notes summarize the worker's action?",
                description:
                  'For example, does it describe the case action ("Denied for over-income") or does it just say "Overtime Assignment" or "Call Center"?',
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalDescriptionSufficient_Comment_OWF",
                visibleIf: "{JournalDescriptionSufficient_OWF} = 'No'",
                startWithNewLine: false,
                title: "What was wrong with the Journal Description?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "FTIinJournalEntry_OWF",
                visibleIf: "{JournalNotes_OWF} = 'Yes'",
                title:
                  "Is there Federal Tax Information (FTI) in the Journal Entry?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Journal Notes"
          },
          {
            type: "panel",
            name: "InterviewPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "TimelyInterviewScheduled_OWF",
                visibleIf:
                  "{ReviewDetails.OWF.ReviewType} contains 'Intake' OR {ReviewDetails.OWF.ReviewType} contains 'Renewal']",
                title: "Was an interview scheduled timely?",
                isRequired: true,
                choices: [
                  "Yes, scheduled timely",
                  "No, scheduled untimely or not scheduled",
                  "Walk-in or other unscheduled appointment"
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewScheduleDelayByAgency_OWF",
                visibleIf: '{TimelyInterviewScheduled_OWF} = "No"',
                startWithNewLine: false,
                title: "Was the scheduling delay caused by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewScheduleDelayByAgency_Fault_OWF",
                visibleIf: "{InterviewScheduleDelayByAgency_OWF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewHeldTimely_OWF",
                visibleIf:
                  "{ReviewDetails.OWF.ReviewType} contains 'Intake' OR {ReviewDetails.OWF.ReviewType} contains 'Renewal']",
                title: "Was an interview held timely?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, Interview held timely"
                  },
                  {
                    value: "No",
                    text: "No, Interview held untimely"
                  },
                  {
                    value: "NoInterview",
                    text: "The client did not attend an interview at all"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewDelaybyAgency_OWF",
                visibleIf: '{InterviewHeldTimely_OWF} = "No"\n ',
                title: "Was the interview delay caused by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InterviewDelaybyAgency_Fault_OWF",
                visibleIf: "{InterviewDelaybyAgency_OWF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "OOCompleted_OWF",
                title:
                  "Has an Options and Opportunities call/SNAP review been completed?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AssessInterviewScheduled_OWF",
                startWithNewLine: false,
                title: "Has an Assessment interview been scheduled?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "PreEmployScreenScheduled_OWF",
                startWithNewLine: false,
                title: "Has a Pre-Employment Screening been scheduled?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "CriminalBackgroundCheckReferral_OWF",
                title:
                  "Has the client been referred for a criminal background check?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, but should have been"
                  },
                  {
                    value: "NA",
                    text: "Not applicable to this provider"
                  }
                ],
                colCount: 3
              },
              {
                type: "comment",
                name: "CriminalBackgroundCheckReferral_Comment_OWF",
                visibleIf: "{CriminalBackgroundCheckReferral_OWF} = 'No'",
                startWithNewLine: false,
                title: "Please elaborate:",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              }
            ],
            title: "Intake Interviews"
          },
          {
            type: "panel",
            name: "VerificationPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "ChecklistRequiredVerf_OWF",
                title:
                  "Was the verification checklist provided for required verifications?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SignedSelfSuffContract&Plan_OWF",
                startWithNewLine: false,
                title:
                  "Is there a signed Self-Sufficiency contract and plan on file?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Verifications"
          },
          {
            type: "panel",
            name: "ChildcarePanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "ChildcareNeeded_OWF",
                title: "Did the client request childcare or was it needed?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ChildcareAppWithChecklist_OWF",
                visibleIf: "{ChildcareNeeded_OWF} = 'Yes'",
                title:
                  "If childcare is needed, was client given an application with a checklist and date to return the application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "NoChildcareinWriting&Signed_OWF",
                visibleIf: "{ChildcareNeeded_OWF} = 'No'",
                startWithNewLine: false,
                title:
                  "If the client states that childcare is not needed, is this in writing and signed by the client?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Childcare"
          },
          {
            type: "panel",
            name: "AssignmentPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "IsCCMEP_OWF",
                title: "Is this a CCMEP case?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "TranspAllowAuth_OWF",
                title: "Has the transportation allowance been authorized?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "checkbox",
                name: "AJRWEP_OWF",
                title: "Is the client assigned to AJR or WEP?",
                isRequired: true,
                choices: ["AJR", "WEP", "Neither"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "WEPFLSACalCorrect_OWF",
                visibleIf: "{AJRWEP_OWF} = ['WEP']",
                title:
                  "If the client is assigned to WEP, is the FLSA calculation correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "WEPFLSACalCorrect_Comment_OWF",
                visibleIf: "{WEPFLSACalCorrect_OWF} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect in the FLSA Calculation?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "AssignedtoJobSearch_OWF",
                title: "Is the client assigned to Job Search?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JobSearchEndAfter6Wks_OWF",
                visibleIf: "{AssignedtoJobSearch_OWF} = Yes",
                title:
                  "Was the Job Search Assignment scheduled to end after 6 weeks?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ALTWORK_OWF",
                title: "Is the client assigned to Alt Work?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "InabilityToWorkPartVerified_OWF",
                visibleIf: "{ALTWORK_OWF} = 'Yes'",
                startWithNewLine: false,
                title:
                  "Has the inability to participate in a work program been verified?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Work Assignment"
          },
          {
            type: "panel",
            name: "DocumentationPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "ServAuthInIWAM_OWF",
                visibleIf: "{IsCCMEP_OWF} = 'No'",
                title: "Was the service authorization completed in IWAM?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "IWAMAlertsNegAction_OWF",
                visibleIf:
                  "{ServAuthInIWAM_OWF} = 'Yes' and {IsCCMEP_OWF} = 'No'",
                startWithNewLine: false,
                title: "Were the IWAM alerts read to take negative action?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "WorkActivitesUpdatedinOBWP_OWF",
                title:
                  "Were the appropriate Work Activities screens updated in OBWP?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "WorkActivitesUpdatedinOBWP_Comment_OWF",
                visibleIf: "{WorkActivitesUpdatedinOBWP_OWF} = 'No'",
                startWithNewLine: false,
                title: "What updated were omitted/incorrect?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "OWFActStatusListUpdated_OWF",
                title: "Was the TANF Work Activities Status List updated?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Documentation"
          },
          {
            type: "panel",
            name: "SanctionPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "CurrentSanction_OWF",
                title: "Was there a sanction on the case at intake?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SanctionCorrectlyRemovedEndDated_OWF",
                visibleIf: "{CurrentSanction_OWF} = 'Yes'",
                title:
                  "If the sanction was ended, was it correctly removed or end dated?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "SanctionCorrectlyRemovedEndDated_Comment_OWF",
                visibleIf: "{SanctionCorrectlyRemovedEndDated_OWF} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "MinSancPeriod&RequirComplHours_OWF",
                visibleIf: "{CurrentSanction_OWF} = 'Yes'",
                title:
                  "Has the client served the minimum sanction period and completed the required compliance hours?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Sanction"
          },
          {
            type: "panel",
            name: "MiscPanel_OWF",
            elements: [
              {
                type: "radiogroup",
                name: "IsOutcomeCorrect_OWF",
                title:
                  "Was the case outcome ({ReviewDetails.OWF.Status}) correct?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "OutcomeIncorrectComment_OWF",
                visibleIf: "{IsOutcomeCorrect_OWF} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherErrors_OWF",
                title:
                  "Are there other TANF Work Activity errors not addressed in the questions above?",
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "OtherErrorsComment_OWF",
                visibleIf: "{OtherErrors_OWF} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Miscellaneous"
          }
        ],
        visibleIf: "{ReviewDetails.OWF.Included} = 'Yes'",
        title: "TANF Work Activities"
      },
      {
        name: "MC_Section",
        elements: [
          {
            type: "expression",
            name: "CaseName_MC",
            title: "Case Name",
            expression: "{CaseName}"
          },
          {
            type: "expression",
            name: "CaseNumber_MC",
            startWithNewLine: false,
            title: "Case Number",
            expression: "{ReviewDetails.MC.CaseNumber}"
          },
          {
            type: "expression",
            name: "Block_MC",
            startWithNewLine: false,
            title: "Block",
            expression: "{ReviewDetails.MC.Block}"
          },
          {
            type: "panel",
            name: "JournalNotesPanel_MC",
            elements: [
              {
                type: "radiogroup",
                name: "JournalNotes_MC",
                title: "Are there journal notes regarding the action taken?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalTemplate_MC",
                visibleIf:
                  "{JournalNotes_MC} = 'Yes' and {IsHospitalUnit} <> ['Yes']",
                startWithNewLine: false,
                title: "Was the journal template used?",
                isRequired: true,
                choices: ["Yes", "No", "NA"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalAdequate_MC",
                visibleIf: "{JournalNotes_MC} = 'Yes'",
                startWithNewLine: false,
                title: "Were the journal notes adequate?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalAdequate_Comment_MC",
                visibleIf: "{JournalAdequate_MC} = 'No'",
                startWithNewLine: false,
                title: "What was inadequate about the notes?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "JournalDescriptionSufficient_MC",
                visibleIf: "{JournalNotes_MC} = 'Yes'",
                title:
                  "Does the Journal Description for these notes summarize the worker's action?",
                description:
                  'For example, does it describe the case action ("Denied for over-income") or does it just say "Overtime Assignment" or "Call Center"?',
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalDescriptionSufficient_Comment_MC",
                visibleIf: "{JournalDescriptionSufficient_MC} = 'No'",
                startWithNewLine: false,
                title: "What was wrong with the Journal Description?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "FTIinJournalEntry_MC",
                visibleIf: "{JournalNotes_MC} = 'Yes'",
                title:
                  "Is there Federal Tax Information (FTI) in the Journal Entry?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Journal Notes"
          },
          {
            type: "panel",
            name: "AuthorizationPanel_MC",
            elements: [
              {
                type: "radiogroup",
                name: "AuthRepCorrect_MC",
                title: "Is the Authorized Representative information correct?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, omitted in error"
                  },
                  {
                    value: "N/A",
                    text: "Not applicable"
                  }
                ],
                hideIfChoicesEmpty: true,
                colCount: 2
              },
              {
                type: "comment",
                name: "AuthRepCorrect_Comment_MC",
                visibleIf: "{AuthRepCorrect_MC} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "SignedApplicationAudiosignature_MC",
                visibleIf: "{ReviewDetails.MC.ReviewType} = 'Intake'",
                title: "Is there a signed application or audio signature?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "IntakeCorrectAppDate_MC",
                visibleIf: "{ReviewDetails.MC.ReviewType} = 'Intake'",
                title: "Was the correct application date used?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "IntakeCorrectAppDate_Comment_MC",
                visibleIf: "{IntakeCorrectAppDate_MC} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect about the app date:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "CertPeriodCorrect_MC",
                visibleIf:
                  "{ReviewDetails.MC.ReviewType} contains 'Intake' OR {ReviewDetails.MC.ReviewType} contains 'Renewal'",
                title: "Is the certification period correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "CertPeriodCorrect_Comment_MC",
                visibleIf: "{CertPeriodCorrect_MC} = 'No'",
                startWithNewLine: false,
                title:
                  "Please describe what was incorrect about the certification period:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "RedetReceivedDuringPeriod_MC",
                visibleIf: "{ReviewDetails.MC.ReviewType} = 'Renewal'",
                title:
                  "Was the application for renewal received before the certification period ended?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, received after"
                  },
                  {
                    value: "NotReceived",
                    text: "No, not received"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AGRecertActionWithin30Days_MC",
                visibleIf: "{RedetReceivedDuringPeriod_MC} = 'No'",
                startWithNewLine: false,
                title:
                  "Did the AG take the required action within 90 days after the end of the certification period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RecertBenefitsFromActionDate_MC",
                visibleIf:
                  "{RedetReceivedDuringPeriod_MC} = 'Yes' AND\n{AGRecertActionWithin30Days_MC} = 'Yes'",
                title:
                  "Were benefits provided back to the date the AG took the required action?",
                isRequired: true,
                choices: ["Yes", "No "],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsFromRecertReceipt_MC",
                visibleIf:
                  "{RedetReceivedDuringPeriod_MC} = 'No' AND\n{AGRecertActionWithin30Days_MC} = 'Yes'",
                title:
                  "Were benefits authorized using the date the application for renewal was received by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RuntoComeUpMonth_MC",
                title:
                  "Was the case run at least to the come-up month (at the time of the worker's action)?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, and should have been"
                  },
                  {
                    value: "N/A",
                    text: "No, but should not have been"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "RetroMedBenefits_MC",
                visibleIf:
                  "{ReviewDetails.MC.ReviewType} = 'Intake' and {ReviewDetails.MC.Status} = 'Approved'",
                title: "Were retroactive Medicaid benefits explored?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, did not apply for retro months"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "Approve45Days_MC",
                visibleIf:
                  "{ReviewDetails.MC.ReviewType} anyof ['Intake', 'Renewal'] and {ReviewDetails.MC.Status} = 'Approved'",
                title:
                  "Were benefits authorized within 45 days from the date of application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "Approve45Days_Fault_MC",
                visibleIf: "{Approve45Days_MC} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_MC",
                visibleIf:
                  "{ReviewDetails.MC.Status} anyof ['Denied', 'Discontinued'] and {ReviewDetails.MC.ReviewType} = 'Intake'",
                title:
                  "Was the application denied timely (by 45th day or the following business day)?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_Fault_MC",
                visibleIf: "{DeniedTimely_MC} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "MedAidCodesCorrect_MC",
                visibleIf: "{ReviewDetails.MC.Status} = 'Approved'",
                title: "Are the Medicaid aid codes correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Authorization"
          },
          {
            type: "panel",
            name: "Budget_MC",
            elements: [
              {
                type: "matrixdropdown",
                name: "ExpenseMatrix_MC",
                title:
                  "Review the AG's actual expenses and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "ExpenseExists",
                    title: "Does the client actually have this type of costs?",
                    cellType: "radiogroup",
                    colCount: 2,
                    isRequired: true,
                    choices: [
                      "Yes",
                      {
                        value: "No",
                        text: "No or N/A for Aid Code"
                      }
                    ]
                  },
                  {
                    name: "InBudget",
                    title: "Was this expense included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the expense verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} anyof ['No', 'NA'] and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.ExpenseExists} anyof ['No', 'NA'] and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Medical",
                    text: "Medical Costs"
                  },
                  {
                    value: "Medicare",
                    text: "Medicare Premium"
                  },
                  {
                    value: "RecurringMedical",
                    text: "Recurring Medical Expenses"
                  },
                  {
                    value: "ChildSupport",
                    text: "Court Ordered Child Support"
                  },
                  {
                    value: "Childcare",
                    text: "Dependent Care Expenses"
                  },
                  {
                    value: "HealthInsurance",
                    text: "Other Health Insurance"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "BuyInMedicarePremium_MC",
                visibleIf:
                  "{ExpenseMatrix_MC.Medicare.InBudget} = 'Yes' and {ExpenseMatrix_MC.Medicare.ExpenseExists} = 'Yes'",
                title:
                  "If the Medicare premium is paid by State Buy-In, is the Medicare page correct & Medicare premium removed from the budget?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not paid by State buy-in"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "BuyInMedicarePremium_Comment_MC",
                visibleIf: "{BuyInMedicarePremium_MC} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the Medicare premium:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherHealthInsurance_MC",
                title: "Did the client have other Health Insurance?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "HealthInsuranceCorrect_MC",
                visibleIf: "{OtherHealthInsurance_MC} = 'Yes'",
                startWithNewLine: false,
                title: "Was that insurance recorded correctly in OBWP?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "HealthInsuranceCorrect_Comment_MC",
                visibleIf: "{HealthInsuranceCorrect_MC} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UnpaidMedicalBillsReviewed_MC",
                title:
                  "Did the client report past, unpaid Medical bills that should have been reviewed and were not?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "UnpaidMedicalBillsReviewed_Comment_MC",
                visibleIf: "{UnpaidMedicalBillsReviewed_MC} = 'Yes'",
                startWithNewLine: false,
                title: "Please describe the problem with the bills:",
                isRequired: true
              },
              {
                type: "matrixdropdown",
                name: "IncomeMatrix_MC",
                title:
                  "Review the AG's actual income types and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "IncomeExists",
                    title: "Does the client actually have this type of income?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: [
                      "Yes",
                      {
                        value: "No",
                        text: "No or Not Applicable"
                      }
                    ]
                  },
                  {
                    name: "InBudget",
                    title: "Was this income included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the income verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Earned",
                    text: "Earned Income"
                  },
                  {
                    value: "Unearned",
                    text: "Unearned Income"
                  },
                  {
                    value: "SSISSDI",
                    text: "SSI/SSDI"
                  }
                ]
              },
              {
                type: "matrixdropdown",
                name: "ResourceMatrix_MC",
                title:
                  "Review the AG's actual resources and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "ResourceExists",
                    title:
                      "Does the client actually have this type of resource?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this resource included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the resource verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.ResourceExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.ResourceExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.ResourceExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.ResourceExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Liquid",
                    text: "Liquid (401k, Insurance, Bank Accounts)"
                  },
                  {
                    value: "Vehicle",
                    text: "Motor Vehicle"
                  },
                  {
                    value: "Personal",
                    text: "Personal (Alien Sponsor, Crops, etc.)"
                  },
                  {
                    value: "Property",
                    text: "Real Property"
                  },
                  "Transferred"
                ]
              },
              {
                type: "radiogroup",
                name: "SSISSDIOverpayment_MC",
                visibleIf:
                  "{IncomeMatrix_MC.SSISSDI.IncomeExists} = 'Yes'\nAND {IncomeMatrix_MC.SSISSDI.InBudget} = 'Yes'",
                title:
                  "If the gross & net SSI or SSDI are different, was the net amount used if the amount is reduced due to an overpayment from the same source?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "N/A, gross/net are same"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "SSISSDIOverpayment_Comment_MC",
                visibleIf: "{SSISSDIOverpayment_MC} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the SSI/SSDI:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherBudgetErrors_MC",
                title: "Are there other budget errors not already noted above?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherBudgetErrors_Comment_MC",
                visibleIf: "{OtherBudgetErrors_MC} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Budget"
          },
          {
            type: "panel",
            name: "Verifications_MC",
            elements: [
              {
                type: "radiogroup",
                name: "AgencyRequestVerifications_MC",
                title: "Did the agency request any verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes"
                  },
                  {
                    value: "NoCorrect",
                    text: "No, nothing to request"
                  },
                  {
                    value: "NoIncorrect",
                    text: "No, some necessary verifications were not requested"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "AgencyRequestVerifications_Comment_MC",
                visibleIf: "{AgencyRequestVerifications_MC} = 'NoIncorrect'",
                title: "What necessary verifications were not requested?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "SeparateSNMCChecklists_MC",
                visibleIf: "{AgencyRequestVerifications_MC} = 'Yes'",
                title:
                  "Were separate checklists issued for SNAP/TANF and Medicaid?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not Applicable"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "SeparateSNMCChecklists_Detail_MC",
                visibleIf: "{SeparateSNMCChecklists_MC} = 'No'",
                startWithNewLine: false,
                title: "Which checklist was *not* sent?",
                choices: ["MC", "SNAP and TANF"],
                colCount: 2
              },
              {
                type: "matrixdropdown",
                name: "RequestedVerifications_MC",
                visibleIf: "{AgencyRequestVerifications_MC} = 'Yes'",
                indent: -2,
                title: "Please identify all verifications requested:",
                titleLocation: "top",
                isRequired: true,
                columns: [
                  {
                    name: "Requested",
                    title: "Requested?",
                    cellType: "checkbox",
                    choices: ["Yes"]
                  },
                  {
                    name: "Necessary",
                    title: "Necessary?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "PingHub",
                    title: "Did the worker try to ping the Hub?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Checklist",
                    title:
                      "Included in verification checklist or request for contact?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf:
                      "{row.Requested} = ['Yes'] and {row.Necessary} <> 'No'",
                    choices: [
                      {
                        value: "Yes",
                        visibleIf: "{row.Requested} = ['Yes']"
                      },
                      {
                        value: "No",
                        visibleIf: "{row.Requested} = ['Yes']"
                      }
                    ]
                  },
                  {
                    name: "Verified",
                    title: "Verified Before Authorization?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  }
                ],
                rows: [
                  "Identity",
                  "Income",
                  "Citizenship",
                  "Shelter",
                  "Rent",
                  {
                    value: "Other",
                    text: "Other (describe below)"
                  }
                ]
              },
              {
                type: "expression",
                name: "UnnecessaryVerifications_MC",
                visible: false,
                title:
                  "Hidden Logic to Calculate whether unnecessary verifications were requested",
                expression:
                  "{RequestedVerifications_MC.Identity.Necessary} = 'No' OR\n{RequestedVerifications_MC.Income.Necessary} = 'No' OR\n{RequestedVerifications_MC.Citizenship.Necessary} = 'No' OR\n{RequestedVerifications_MC.Rent.Necessary} = 'No' OR\n{RequestedVerifications_MC.Shelter.Necessary} = 'No' OR\n{RequestedVerifications_MC.Other.Necessary} = 'No'"
              },
              {
                type: "comment",
                name: "OtherVerifications_MC",
                visibleIf:
                  "{RequestedVerifications_MC.Other.Requested} = ['Yes']",
                title: "What other verifications were requested?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "FollowUp20Days_MC",
                visibleIf: "{AgencyRequestVerifications_MC} = Yes",
                title:
                  "Was a second verification checklist (JFS 7220) issued by the 20th calendar day after the application? ",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not Needed"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "FollowUp20Days_Comment_MC",
                visibleIf: "{FollowUp20Days_MC} = 'No'",
                startWithNewLine: false,
                title: "What happened instead?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "MCBenefitsDenied&WereNot_MC",
                visibleIf:
                  "{AgencyRequestVerifications_MC} = 'Yes'\nAND( {ReviewDetails.MC.ReviewType} = 'Intake' \nOR {ReviewDetails.MC.ReviewType} = 'Renewal') ",
                title:
                  "Should the MC benefits have been denied due to failure of the AG to cooperate in obtaining necessary verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, benefits were authorized in error"
                  },
                  {
                    value: "No",
                    text: "No, authorized properly"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "MCBenefitsDenied&WereNot_Comment_MC",
                visibleIf: "{MCBenefitsDenied&WereNot_MC} = 'Yes'",
                startWithNewLine: false,
                title: "What happened instead?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UnaddressedAlertsIEVS_MC",
                title:
                  "Are there unaddressed alerts and/or IEVS matches that may affect the current eligibility?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Verifications"
          },
          {
            type: "panel",
            name: "Misc_MC",
            elements: [
              {
                type: "radiogroup",
                name: "IsOutcomeCorrect_MC",
                title:
                  "Was the case outcome ({ReviewDetails.MC.Status}) correct?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "OutcomeIncorrectComment_MC",
                visibleIf: "{IsOutcomeCorrect_MC} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "BenefitsinMITS_MC",
                title: "Did the benefits cross accurately into MITS?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, Not yet authorized"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "OtherErrors_MC",
                title: "Are there other MC errors not addressed above?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherErrorsComment_MC",
                visibleIf: "{OtherErrors_MC} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Miscellaneous"
          }
        ],
        visibleIf: "{ReviewDetails.MC.Included} = 'Yes'",
        title: "Community Medicaid"
      },
      {
        name: "LTC_Section",
        elements: [
          {
            type: "expression",
            name: "CaseName_LTC",
            title: "Case Name"
          },
          {
            type: "expression",
            name: "CaseNumber_LTC",
            startWithNewLine: false,
            title: "Case Number",
            expression: "{ReviewDetails.LTC.CaseNumber}"
          },
          {
            type: "expression",
            name: "Block_LTC",
            startWithNewLine: false,
            title: "Block",
            expression: "{ReviewDetails.LTC.Block}"
          },
          {
            type: "panel",
            name: "JournalNotesPanel_LTC",
            elements: [
              {
                type: "radiogroup",
                name: "JournalNotes_LTC",
                title: "Are there journal notes regarding the action taken?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalTemplate_LTC",
                visible: false,
                visibleIf: "{JournalNotes_LTC} = 'Yes' and false",
                startWithNewLine: false,
                title: "Was the journal template used?",
                isRequired: true,
                choices: ["Yes", "No", "NA"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "JournalAdequate_LTC",
                visibleIf: "{JournalNotes_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "Were the journal notes adequate?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalAdequate_Comment_LTC",
                visibleIf: "{JournalAdequate_LTC} = 'No'",
                startWithNewLine: false,
                title: "What was inadequate about the notes?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "JournalDescriptionSufficient_LTC",
                visibleIf: "{JournalNotes_LTC} = 'Yes'",
                title:
                  "Does the Journal Description for these notes summarize the worker's action?",
                description:
                  'For example, does it describe the case action ("Denied for over-income") or does it just say "Overtime Assignment" or "Call Center"?',
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "JournalDescriptionSufficient_Comment_LTC",
                visibleIf: "{JournalDescriptionSufficient_LTC} = 'No'",
                startWithNewLine: false,
                title: "What was wrong with the Journal Description?",
                isRequired: true,
                validators: [
                  {
                    type: "text",
                    minLength: 10,
                    maxLength: 0,
                    allowDigits: true
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "FTIinJournalEntry_LTC",
                visibleIf: "{JournalNotes_LTC} = 'Yes'",
                title:
                  "Is there Federal Tax Information (FTI) in the Journal Entry?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Journal Notes"
          },
          {
            type: "panel",
            name: "AuthorizationPanel_LTC",
            elements: [
              {
                type: "radiogroup",
                name: "AuthRepCorrect_LTC",
                title: "Is the Authorized Representative information correct?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, omitted in error"
                  },
                  {
                    value: "N/A",
                    text: "Not applicable"
                  }
                ],
                hideIfChoicesEmpty: true,
                colCount: 2
              },
              {
                type: "comment",
                name: "AuthRepCorrect_Comment_LTC",
                visibleIf: "{AuthRepCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "SignedApplicationAudiosignature_LTC",
                visibleIf:
                  "{ReviewDetails.LTC.ReviewType} anyof ['Intake', 'Renewal']",
                title: "Is there a signed application or audio signature?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "IntakeCorrectAppDate_LTC",
                visibleIf: "{ReviewDetails.LTC.ReviewType} = 'Intake'",
                title: "Was the correct application date used?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "IntakeCorrectAppDate_Comment_LTC",
                visibleIf: "{IntakeCorrectAppDate_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect about the app date:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "CertPeriodCorrect_LTC",
                visibleIf:
                  "{ReviewDetails.LTC.ReviewType} contains 'Intake' OR {ReviewDetails.LTC.ReviewType} contains 'Renewal'",
                title: "Is the certification period correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "CertPeriodCorrect_Comment_LTC",
                visibleIf: "{CertPeriodCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title:
                  "Please describe what was incorrect about the cert period:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "RedetReceivedDuringPeriod_LTC",
                visibleIf: "{ReviewDetails.LTC.ReviewType} = 'Renewal'",
                title:
                  "Was the application for renewal received before the certification period ended?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, received after"
                  },
                  {
                    value: "NotReceived",
                    text: "No, not received"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "AGRecertActionWithin30Days_LTC",
                visibleIf: "{RedetReceivedDuringPeriod_LTC} = 'No'",
                startWithNewLine: false,
                title:
                  "Did the AG take the required action within 90 days after the end of the certification period?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RecertBenefitsFromActionDate_LTC",
                visibleIf:
                  "{RedetReceivedDuringPeriod_LTC} = 'Yes' AND\n{AGRecertActionWithin30Days_LTC} = 'Yes'",
                title:
                  "Were benefits provided back to the date the AG took the required action?",
                isRequired: true,
                choices: ["Yes", "No "],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "BenefitsFromRecertReceipt_LTC",
                visibleIf:
                  "{RedetReceivedDuringPeriod_LTC} = 'No' AND\n{AGRecertActionWithin30Days_LTC} = 'Yes'",
                title:
                  "Were benefits authorized using the date the application for renewal was received by the agency?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RuntoComeUpMonth_LTC",
                title:
                  "Was the case run at least to the come-up month (at the time of the worker's action)?",
                isRequired: true,
                choices: [
                  "Yes",
                  {
                    value: "No",
                    text: "No, and should have been"
                  },
                  {
                    value: "N/A",
                    text: "No, but should not have been"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "Approve45Days_LTC",
                visibleIf:
                  "{ReviewDetails.LTC.ReviewType} anyof ['Intake', 'Renewal'] and {ReviewDetails.LTC.Status} = 'Approved'",
                title:
                  "Were benefits authorized within 45 days from the date of application?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "Approve45Days_Fault_LTC",
                visibleIf: "{Approve45Days_LTC} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_LTC",
                visibleIf:
                  "{ReviewDetails.LTC.Status} anyof ['Denied', 'Discontinued'] and {ReviewDetails.LTC.ReviewType} = 'Intake'",
                title:
                  "Was the application denied timely (by 45th day or the following business day)?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "DeniedTimely_Fault_LTC",
                visibleIf: "{DeniedTimely_LTC} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "MedAidCodesCorrect_LTC",
                visibleIf: "{ReviewDetails.LTC.Status} = 'Approved'",
                title: "Are the Medicaid aid codes correct?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "RetroMedBenefits_LTC",
                visibleIf:
                  "{ReviewDetails.LTC.ReviewType} = 'Intake' and {ReviewDetails.LTC.Status} = 'Approved'",
                title: "Were retroactive Medicaid benefits explored?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, did not apply for retro months"
                  }
                ],
                colCount: 2
              }
            ],
            title: "Authorization"
          },
          {
            type: "panel",
            name: "Budget_LTC",
            elements: [
              {
                type: "matrixdropdown",
                name: "ExpenseMatrix_LTC",
                title:
                  "Review the AG's actual expenses and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "ExpenseExists",
                    title: "Does the client actually have this type of costs?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: [
                      "Yes",
                      {
                        value: "No",
                        text: "No or N/A for this Aid Code"
                      }
                    ]
                  },
                  {
                    name: "InBudget",
                    title: "Was this expense included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the expense verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.ExpenseExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.ExpenseExists} anyof ['No', 'NA'] and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.ExpenseExists} anyof ['No', 'NA'] and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Medical",
                    text: "Medical Costs"
                  },
                  {
                    value: "Medicare",
                    text: "Medicare Premium"
                  },
                  {
                    value: "RecurringMedical",
                    text: "Recurring Medical Expenses"
                  },
                  {
                    value: "ChildSupport",
                    text: "Court Ordered Child Support"
                  },
                  {
                    value: "Childcare",
                    text: "Dependent Care Expenses"
                  },
                  {
                    value: "HealthInsurance",
                    text: "Other Health Insurance"
                  }
                ]
              },
              {
                type: "radiogroup",
                name: "BuyInMedicarePremium_LTC",
                visibleIf:
                  "{ExpenseMatrix_LTC.Medicare.InBudget} = 'Yes' and {ExpenseMatrix_LTC.Medicare.ExpenseExists} = 'Yes'",
                title:
                  "If the Medicare premium is paid by State Buy-In, is the Medicare page correct & Medicare premium removed from the budget?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not paid by State buy-in"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "BuyInMedicarePremium_Comment_LTC",
                visibleIf: "{BuyInMedicarePremium_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the Medicare premium:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherHealthInsurance_LTC",
                title: "Did the client have other Health Insurance?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "HealthInsuranceCorrect_LTC",
                visibleIf: "{OtherHealthInsurance_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "Was that insurance recorded correctly in OBWP?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "HealthInsuranceCorrect_Comment_LTC",
                visibleIf: "{HealthInsuranceCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please describe what was incorrect:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UnpaidMedicalBillsReviewed_LTC",
                title:
                  "Did the client report past, unpaid Medical bills that should have been reviewed and were not?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "UnpaidMedicalBillsReviewed_Comment_LTC",
                visibleIf: "{UnpaidMedicalBillsReviewed_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "Please describe the problem with the bills:",
                isRequired: true
              },
              {
                type: "matrixdropdown",
                name: "IncomeMatrix_LTC",
                title:
                  "Review the AG's actual income types and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "IncomeExists",
                    title: "Does the client actually have this type of income?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this income included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the income verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.IncomeExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Earned",
                    text: "Earned Income"
                  },
                  {
                    value: "Unearned",
                    text: "Unearned Income"
                  },
                  {
                    value: "SSISSDI",
                    text: "SSI/SSDI"
                  }
                ]
              },
              {
                type: "matrixdropdown",
                name: "ResourceMatrix_LTC",
                title:
                  "Review the AG's actual resources and budget and complete:",
                defaultValue: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                correctAnswer: {
                  Shelter: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Utilities: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Medicare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  RecurringMedical: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  ChildSupport: {
                    ExcludedInError: false,
                    IncludedInError: false
                  },
                  Childcare: {
                    ExcludedInError: false,
                    IncludedInError: false
                  }
                },
                isRequired: true,
                columns: [
                  {
                    name: "ResourceExists",
                    title:
                      "Does the client actually have this type of resource?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "InBudget",
                    title: "Was this resource included in the budget?",
                    cellType: "radiogroup",
                    isRequired: true,
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Verified",
                    title: "Was the resource verified?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: " {row.InBudget} = 'Yes'",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "ExcludedInError",
                    title: "Excluded in Error",
                    cellType: "expression",
                    visibleIf:
                      "{row.ResourceExists} = 'Yes' and {row.InBudget} = 'No'",
                    expression:
                      "{row.IncomeExists} = 'Yes' and {row.InBudget} = 'No'"
                  },
                  {
                    name: "IncludedInError",
                    title: "IncludedInError",
                    cellType: "expression",
                    visibleIf:
                      "{row.ResourceExists} = 'No' and {row.InBudget} = 'Yes'",
                    expression:
                      "{row.IncomeeExists} = 'No' and {row.InBudget} = 'Yes'"
                  },
                  {
                    name: "Comment",
                    title: "Comment",
                    cellType: "comment",
                    isRequired: true,
                    visibleIf:
                      "{row.ExcludedInError} = true or {row.IncludedInError} = true or {row.Verified} = 'No'"
                  }
                ],
                rows: [
                  {
                    value: "Liquid",
                    text: "Liquid (401k, Insurance, Bank Accounts)"
                  },
                  {
                    value: "Vehicle",
                    text: "Motor Vehicle"
                  },
                  {
                    value: "Personal",
                    text: "Personal (Alien Sponsor, Crops, etc.)"
                  },
                  {
                    value: "Property",
                    text: "Real Property"
                  },
                  "Transferred"
                ]
              },
              {
                type: "radiogroup",
                name: "SSISSDIOverpayment_LTC",
                visibleIf:
                  "{IncomeMatrix_LTC.SSISSDI.IncomeExists} = 'Yes'\nAND {IncomeMatrix_LTC.SSISSDI.InBudget} = 'Yes'",
                title:
                  "If the gross & net SSI or SSDI are different, was the net amount used if the amount is reduced due to an overpayment from the same source?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "N/A, gross/net are same"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "SSISSDIOverpayment_Comment_LTC",
                visibleIf: "{SSISSDIOverpayment_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please describe the problem with the SSI/SSDI:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "OtherBudgetErrors_LTC",
                title: "Are there other budget errors not already noted above?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherBudgetErrors_Comment_LTC",
                visibleIf: "{OtherBudgetErrors_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Budget"
          },
          {
            type: "panel",
            name: "Verifications_LTC",
            elements: [
              {
                type: "radiogroup",
                name: "AgencyRequestVerifications_LTC",
                title: "Did the agency request any verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes"
                  },
                  {
                    value: "NoCorrect",
                    text: "No, nothing to request"
                  },
                  {
                    value: "NoIncorrect",
                    text: "No, some necessary verifications were not requested"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "SeparateSNMCChecklists_LTC",
                visibleIf: "{AgencyRequestVerifications_LTC} = 'Yes'",
                title:
                  "Were separate checklists issued for SNAP/TANF and Medicaid?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not Applicable"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "SeparateSNMCChecklists_Detail_LTC",
                visibleIf: "{SeparateSNMCChecklists_LTC} = 'No'",
                startWithNewLine: false,
                title: "Which checklist was *not* sent?",
                choices: ["MC", "SNAP and TANF"],
                colCount: 2
              },
              {
                type: "matrixdropdown",
                name: "RequestedVerifications_LTC",
                visibleIf: "{AgencyRequestVerifications_LTC} = 'Yes'",
                indent: -2,
                title: "Please identify all verifications requested:",
                titleLocation: "top",
                isRequired: true,
                columns: [
                  {
                    name: "Requested",
                    title: "Requested?",
                    cellType: "checkbox",
                    choices: ["Yes"]
                  },
                  {
                    name: "Necessary",
                    title: "Necessary?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "PingHub",
                    title: "Did the worker try to ping the Hub?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  },
                  {
                    name: "Checklist",
                    title:
                      "Included in verification checklist or request for contact?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf:
                      "{row.Requested} = ['Yes'] and {row.Necessary} <> 'No'",
                    choices: [
                      {
                        value: "Yes",
                        visibleIf: "{row.Requested} = ['Yes']"
                      },
                      {
                        value: "No",
                        visibleIf: "{row.Requested} = ['Yes']"
                      }
                    ]
                  },
                  {
                    name: "Verified",
                    title: "Verified Before Authorization?",
                    cellType: "radiogroup",
                    isRequired: true,
                    visibleIf: "{row.Requested} = ['Yes']",
                    choices: ["Yes", "No"]
                  }
                ],
                choices: ["Yes", "No"],
                rows: [
                  "Identity",
                  "Income",
                  "Citizenship",
                  "Shelter",
                  "Rent",
                  {
                    value: "Other",
                    text: "Other (describe below)"
                  }
                ]
              },
              {
                type: "expression",
                name: "UnnecessaryVerifications_LTC",
                visible: false,
                title:
                  "Hidden Logic to Calculate whether unnecessary verifications were requested",
                expression:
                  "{RequestedVerifications_LTC.Identity.Necessary} = 'No' OR\n{RequestedVerifications_LTC.Income.Necessary} = 'No' OR\n{RequestedVerifications_LTC.Citizenship.Necessary} = 'No' OR\n{RequestedVerifications_LTC.Rent.Necessary} = 'No' OR\n{RequestedVerifications_LTC.Shelter.Necessary} = 'No' OR\n{RequestedVerifications_LTC.Other.Necessary} = 'No'"
              },
              {
                type: "comment",
                name: "OtherVerifications_LTC",
                visibleIf:
                  "{RequestedVerifications_LTC.Other.Requested} = ['Yes']",
                title: "What other verifications were requested?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "FollowUp20Days_LTC",
                visibleIf: "{AgencyRequestVerifications_LTC} = Yes",
                title:
                  "Was a second verification checklist (JFS 7220) issued by the 20th calendar day after the application? ",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not Needed"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "FollowUp20Days_Fault_LTC",
                visibleIf: "{FollowUp20Days_LTC} = 'No'",
                startWithNewLine: false,
                title:
                  "Was this the fault of the worker under review: {EligSpec}?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "FollowUp20Days_Comment_LTC",
                visibleIf: "{FollowUp20Days_LTC} = 'No'",
                startWithNewLine: false,
                title: "What happened instead?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "MCBenefitsDenied&WereNot_LTC",
                visibleIf:
                  "{AgencyRequestVerifications_LTC} = 'Yes'\nAND( {ReviewDetails.LTC.ReviewType} = 'Intake' \nOR {ReviewDetails.LTC.ReviewType} = 'Renewal') ",
                title:
                  "Should the MC benefits have been denied due to failure of the AG to cooperate in obtaining necessary verifications?",
                isRequired: true,
                choices: [
                  {
                    value: "Yes",
                    text: "Yes, benefits were authorized in error"
                  },
                  {
                    value: "No",
                    text: "No, authorized properly"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "MCBenefitsDenied&WereNot_Comment_LTC",
                visibleIf: "{MCBenefitsDenied&WereNot_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "What happened instead?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UnaddressedAlertsIEVS_LTC",
                title:
                  "Are there unaddressed alerts and/or IEVS matches that may affect the current eligibility?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              }
            ],
            title: "Verifications"
          },
          {
            type: "panel",
            name: "LTCSpecificPanel_LTC",
            elements: [
              {
                type: "radiogroup",
                name: "MIAFNA_LTC",
                title:
                  "Is there a Monthly Income Allowance (MIA)/Family Need Allowance (FNA)?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "MIAFNACorrect_LTC",
                visibleIf: '{MIAFNA_LTC} = "Yes"',
                startWithNewLine: false,
                title: "Is the MIA or FNA calculated correctly?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "MIAFNACorrect_Comment_LTC",
                visibleIf: "{MIAFNACorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please provide details:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "SpousalImprovementCorrect_LTC",
                title: "Was the spousal impoverishment correctly calculated?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A"
                  }
                ],
                colCount: 3
              },
              {
                type: "comment",
                name: "SpousalImprovementCorrect_Comment_LTC",
                visibleIf: "{SpousalImprovementCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please provide details:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "ImproperTransAccountedFor_LTC",
                title:
                  "Have all the improper transfers been accounted for and added correctly?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "None",
                    text: "None Exist"
                  }
                ],
                colCount: 2
              },
              {
                type: "radiogroup",
                name: "ImpropTranfScreenCorrect_LTC",
                visibleIf: "{ImproperTransAccountedFor_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "Is the improper transfer screen completed correctly?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "ImproperTransAccountedFor_Comment_LTC",
                visibleIf:
                  "{ImproperTransAccountedFor_LTC} = 'No' or {ImpropTranfScreenCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please provide details:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "ResourceAssessComplete_LTC",
                title:
                  "If a resource assessment is required, has it been completed?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "Not required"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "SOCCorrect_LTC",
                title: "Is the Share of Cost (SOC) calculated correctly?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "SOCCorrect_Comment_LTC",
                visibleIf: "{SOCCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please provide details:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "RestrictCoveragePeriodCorrect_LTC",
                title:
                  "Was the restricted Medicaid coverage period applied correctly?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "RestrictCoveragePeriodCorrect_NOA_LTC",
                visibleIf:
                  "{RestrictCoveragePeriodCorrect_LTC} anyof ['Yes', 'No']",
                startWithNewLine: false,
                title:
                  "Was a NOA sent confirming the dates of the restricted coverage?",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "RestrictCoveragePeriodCorrect_Comment_LTC",
                visibleIf: "{RestrictCoveragePeriodCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please provide details:",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "InstitutionalChildCorrect_LTC",
                title:
                  "Was the case processed correctly for any institutional children?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, no institutional children"
                  }
                ],
                colCount: 2
              },
              {
                type: "comment",
                name: "InstitutionalChildCorrect_Comment_LTC",
                visibleIf: "{InstitutionalChildCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "Please provide details:",
                isRequired: true
              }
            ],
            title: "LTC Policy"
          },
          {
            type: "panel",
            name: "Misc_LTC",
            elements: [
              {
                type: "radiogroup",
                name: "IsOutcomeCorrect_LTC",
                title:
                  "Was the case outcome ({ReviewDetails.LTC.Status}) correct?",
                isRequired: true,
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "OutcomeIncorrectComment_LTC",
                visibleIf: "{IsOutcomeCorrect_LTC} = 'No'",
                startWithNewLine: false,
                title: "What was incorrect?",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "BenefitsinMITS_LTC",
                title: "Did the benefits cross accurately into MITS?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "NA",
                    text: "N/A, Not yet authorized"
                  }
                ],
                colCount: 3
              },
              {
                type: "radiogroup",
                name: "OtherErrors_LTC",
                title:
                  "Are there other Long-Term Care errors not addressed above?",
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "OtherErrorsComment_LTC",
                visibleIf: "{OtherErrors_LTC} = 'Yes'",
                startWithNewLine: false,
                title: "What are those errors?",
                isRequired: true
              }
            ],
            title: "Miscellaneous"
          }
        ],
        visibleIf: "{ReviewDetails.LTC.Included} = 'Yes'",
        title: "Long-Term Care Medicaid"
      },
      {
        name: "UETarget_Section",
        elements: [
          {
            type: "expression",
            name: "Casename_UETarget",
            startWithNewLine: false,
            title: "Case Name",
            expression: "{CaseName}"
          },
          {
            type: "expression",
            name: "CaseNumber_UETarget",
            startWithNewLine: false,
            title: "Case Number",
            expression: "{ReviewDetails.UETarget.CaseNumber}"
          },
          {
            type: "expression",
            name: "Block_UETarget",
            startWithNewLine: false,
            title: "Block",
            expression: "{ReviewDetails.UETarget.Block}"
          },
          {
            type: "matrixdropdown",
            name: "IncometypeMatrix_UETarget",
            title: "Complete the chart regarding the unearned income. ",
            columns: [
              {
                name: "IncomeExists",
                title: "Does the client have this type of income? ",
                cellType: "radiogroup",
                isRequired: true
              },
              {
                name: "IncomeInBudget",
                title: "Was the income included in the budget? ",
                isRequired: true
              },
              {
                name: "IncomeVerified",
                title: "Was the income verified? ",
                isRequired: true,
                visibleIf:
                  "{row.IncomeExists_UnETARGET} = 'Yes' or {row.IncomeInBudget_UETarget} = 'Yes'"
              },
              {
                name: "UEHowVerified",
                title: "How was the income verified?",
                cellType: "dropdown",
                isRequired: true,
                visibleIf: "{row.IncomeVerified_UETarget} = 'Yes'",
                choices: [
                  "Social Security Statement",
                  "Collateral Contact",
                  "Electronic Source",
                  "Bank Statement",
                  "Retirement/Pension/Annuity Account statement",
                  "Other; Please Explain"
                ]
              },
              {
                name: "UEexcludederror",
                title: "Excluded in error",
                cellType: "expression",
                visibleIf:
                  "{row.IncomeExists_UnETARGET} = 'Yes' and {row.IncomeInBudget_UETarget} = 'No'",
                expression:
                  "{row.IncomeExists_UnETARGET} = 'Yes' and {row.IncomeInBudget_UETarget} = 'No'\n"
              },
              {
                name: "UEincludederror",
                title: "Included in error",
                cellType: "expression",
                visibleIf:
                  "{row.IncomeExists_UnETARGET} = 'No' and {row.IncomeInBudget_UETarget} = 'Yes'",
                expression:
                  "{row.IncomeExists_UnETARGET} = 'No' and {row.IncomeInBudget_UETarget} = 'Yes'"
              },
              {
                name: "Comment",
                title: "Comment",
                cellType: "comment",
                isRequired: true,
                visibleIf:
                  "{row.UEexcludederror_UETarget} = 'True' or {row.UEincludederror_UETarget} = 'True' or {row.UEHowVerified_UETarget} = 'Other; Please Explain'"
              }
            ],
            choices: ["Yes", "No"],
            cellType: "radiogroup",
            rows: [
              {
                value: "Unemployment",
                text: "Unemployment"
              },
              {
                value: "Workers'Compensation",
                text: "Workers' Compensation"
              },
              {
                value: "SSI",
                text: "SSI"
              },
              {
                value: "SocialSecurity",
                text: "Social Security"
              },
              {
                value: "ChildSupport",
                text: "Child Support"
              },
              {
                value: "RetirementPensionsAnnuities",
                text: "Retirement Pensions & Annuities"
              },
              {
                value: "OtherExplainbelow",
                text: "Other Explain below"
              }
            ]
          },
          {
            type: "panel",
            name: "UETarget_Panel",
            elements: [
              {
                type: "comment",
                name: "otherincomecomment_UETarget",
                visibleIf:
                  "{IncometypeMatrix_UETarget.OtherExplainbelow..IncomeExists_UnETARGET} = 'Yes'",
                title: "Explain the other income from above. ",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UECompJournal_UETarget",
                title:
                  "Did the journal entry adequately explain the unearned income and how it was verified? Was it comprehensive with all case information?",
                choices: [
                  {
                    value: "Yes",
                    text: "Yes"
                  },
                  {
                    value: "No",
                    text: "No"
                  },
                  {
                    value: "Nojournalnotes",
                    text: "No journal note kept. "
                  }
                ]
              },
              {
                type: "comment",
                name: "UECompJournal_Comment_UETarget",
                visibleIf:
                  "{UECompJournal_UETarget} = 'No' or {UECompJournal_UETarget} = 'Nojournalnotes'",
                startWithNewLine: false,
                title: "Explain the error that was made. ",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UEIncCalc_UETarget",
                title:
                  "If an income calculation was required, was it completed correctly? ",
                description:
                  "Example: was the child support income calculated correctly?",
                isRequired: true,
                choices: [
                  "Yes",
                  "No",
                  "N/A This case did not require income calculation."
                ]
              },
              {
                type: "comment",
                name: "UEIncCalc_Comment_UETarget",
                visibleIf: "{UEIncCalc_UETarget} = 'No'",
                startWithNewLine: false,
                title: "Explain the error that was made: ",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UEAllInfoActedOn_UETarget",
                title:
                  "Was all information related to unearned income that was  provided to the agency acted upon? ",
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "UEAllInfoActedOn_comment_UETarget",
                visibleIf: "{UEAllInfoActedOn_UETarget} = 'No'",
                startWithNewLine: false,
                title: "Explain the error that was made: ",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UECorrectType_UETarget",
                title: "Was the income type recorded correctly?",
                description:
                  "ex: SSI or SSD. Temporary or Permanent Workers' Compensation",
                isRequired: true,
                choices: ["Yes", "No"],
                colCount: 2
              },
              {
                type: "comment",
                name: "CorrectUEType_Comment_UETarget",
                visibleIf: "{UECorrectType_UETarget} = 'No'",
                startWithNewLine: false,
                title: "Explain the error that was made: "
              },
              {
                type: "radiogroup",
                name: "UEGrossNetDif_UETarget",
                title:
                  "If the gross & net SSI or SSDI are different, was the net amount used if the amount is reduced due to an overpayment from the same source?",
                choices: [
                  "Yes",
                  "No",
                  {
                    value: "N/A",
                    text: "N/A, gross/net are same"
                  }
                ]
              },
              {
                type: "comment",
                name: "UEGrossNetDif__comment_UETarget",
                visibleIf: "{UEGrossNetDif_UETarget} = 'No'",
                startWithNewLine: false,
                title: "Explain the error that was made: ",
                isRequired: true
              },
              {
                type: "radiogroup",
                name: "UEIVESWRKD_UETarget",
                title: "Were all relevant IVES Alerts worked? ",
                choices: [
                  "Yes",
                  "No",
                  "N/A There were no alerts for this case. "
                ]
              },
              {
                type: "comment",
                name: "UEIVESWRKD_Comment_UETarget",
                visibleIf: "{UEIVESWRKD_UETarget} = 'No'",
                startWithNewLine: false,
                title: "Explain the error that was made: "
              }
            ]
          }
        ],
        visibleIf: "{ReviewDetails.UETarget.Included} = 'Yes'",
        title: "Unearned Income Target Review"
      },
      {
        name: "Summary_Section",
        elements: [
          {
            type: "comment",
            name: "FinalComments_Summary",
            title: "Final comments about the case being reviewed: ",
            description:
              "These comments do not appear in CATS as findings. The comments do appear on the completed form view-able in CATS."
          },
          {
            type: "html",
            name: "SummaryDirectionsDisplay_Summary",
            html:
              "Please review the findings below. These findings identify an error that appear to be the fault of the worker."
          },
          {
            type: "panel",
            name: "Findings_Panel_SNAP",
            elements: [
              {
                type: "panel",
                name: "JournalNotesFindings_Panel_SNAP",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalNotes_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalNotes_SNAP} = 'No'",
                    title: "No Journal Notes were kept",
                    expression: '"Review of: " + {DisplayVariable_SNAP}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalTemplate_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalTemplate_SNAP} = 'No'",
                    title: "The Journal Note template was not used",
                    expression: '"Review of: " + {DisplayVariable_SNAP}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalAdequate_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalAdequate_SNAP} = 'No'",
                    title: "The Journal Notes were inadequate",
                    expression:
                      '"Reviewer Comment: "+{JournalAdequate_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalDescriptionSufficient_SNAP$FINDING_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalDescriptionSufficient_SNAP} = 'No'",
                    title: "The Journal Notes Description was not Sufficient",
                    expression:
                      '"Reviewer Comment: "+{JournalDescriptionSufficient_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FTIinJournalEntry_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FTIinJournalEntry_SNAP} = 'Yes'",
                    title:
                      "There was Federal Tax Information in the Journal Notes",
                    expression: '"Review of: " + {DisplayVariable_SNAP}'
                  }
                ],
                title: "Journal Notes Findings:"
              }
            ],
            title: "SNAP Findings"
          },
          {
            type: "panel",
            name: "ExpeditedEligibilityFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$24hrsCert_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{24hrsCert_Fault_SNAP} = 'Yes'",
                title: "Benefits were not Authorized within 24 hours",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$BenefitsAvail7Days_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{BenefitsAvail7Days_Fault_SNAP} = 'Yes'",
                title: "Benefits were not available within 7 days",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpeditedAtApp_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpeditedAtAppNotScreened_Fault_SNAP} = 'Yes'",
                title: "Applicant was not Screened In as Expedited Eligible",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$OverrodeExpeditedAtApplication_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{OverrodeExpeditedAtApplication_SNAP} = 'No'",
                title:
                  "Worker did not Override Expedited Eligibility Indicator before Authorization",
                expression:
                  '"Reviewer Comment: "+{OverrodeExpeditedAtApplication_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$WasDiscoveryDateUsed_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{WasDiscoveryDateUsed_SNAP} = 'No'",
                title:
                  "Worker did not correctly use the Expedited Discovery Date",
                expression:
                  '"Reviewer Comment: "+{WasDiscoveryDateUsed_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Expedited Eligibility Findings:"
          },
          {
            type: "panel",
            name: "InterviewFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$InterviewScheduleDelayByAgency_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{InterviewScheduleDelayByAgency_Fault_SNAP} = 'Yes'",
                title:
                  "Timely intake interview was not scheduled due to error by this worker",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$InterviewDelaybyAgency_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{InterviewDelaybyAgency_Fault_SNAP} = 'Yes'",
                title: "The intake interview was delayed due to this worker",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$BenefitsRestoredtoAppDate_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{BenefitsRestoredtoAppDate_SNAP} = 'No'",
                title:
                  "Benefits were not restored to the beginning of the App/Recert period",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$CustomerScheduleUpdate_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{CustomerScheduleUpdate_SNAP} = 'No'",
                title: "Customer Scheduling was not updated correctly",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$NOMIIssued_Fault_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{NOMIIssued_Fault_SNAP} = 'Yes'",
                title: "A NOMI was not issued",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$SignedApplicationAudiosignature_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{SignedApplicationAudiosignature_SNAP} = 'No'",
                title: "There is no signed application and/or audio signature",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Interview Findings:"
          },
          {
            type: "panel",
            name: "AudioSignatureFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignatureName_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AudioSignatureMatrix_SNAP.Name} = 'No'",
                title:
                  "Client was not asked to state first and last name. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignatureAddress_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AudioSignatureMatrix_SNAP.Address} = 'No'",
                title:
                  "Client was not asked to state their address. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignaturePhoneApp_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AudioSignatureMatrix_SNAP.PhoneApp} = 'No'",
                title:
                  "Client not asked to verify their intent to apply. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignatureConfirmInfo_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AudioSignatureMatrix_SNAP.ConfirmInfo} = 'No'",
                title: "Intent to apply not confirmed. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignatureConfirmIncomplete_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{AudioSignatureMatrix_SNAP.ConfirmIncomplete} = 'No'",
                title:
                  "Client name, address, and date if application not confirmed. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignatureAddAuthRep_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AudioSignatureMatrix_SNAP.AddAuthRep} = 'No'",
                title:
                  "Client not asked to add authorized representative. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$AudioSignatureAuthRepInfo_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AudioSignatureMatrix_SNAP.AuthRepInfo} = 'No'",
                title:
                  "Name and address of authorized representative not recorded. Invalid application.",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$FINDING$MailedVoterRegistration_SNAP$FINDING_CORRECTION_REQUIRED$review$3",
                visibleIf: "{MailedVoterRegistration_SNAP} = 'No'",
                title:
                  "Client was not sent their requested voter registration form",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Audio Signature Findings:"
          },
          {
            type: "panel",
            name: "AuthorizationFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$AuthRepCorrect_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AuthRepCorrect_SNAP} = 'No'",
                title:
                  "The Authorized Representative information was incorrect or missing",
                expression:
                  '"Reviewer Comment: "+{AuthRepCorrect_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IntakeCorrectAppDate_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IntakeCorrectAppDate_SNAP} = 'No'",
                title: "The application date was incorrect",
                expression:
                  '"Reviewer Comment: "+{IntakeCorrectAppDate_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$CertPeriodCorrect_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{CertPeriodCorrect_SNAP} = 'No'",
                title: "The certification period was incorrect",
                expression:
                  '"Reviewer Comment: "+{CertPeriodCorrect_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$RecertBenefitsFromActionDate_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{RecertBenefitsFromActionDate_SNAP} = 'No '",
                title:
                  "Benefits were not provided back to the recertification late-submission ",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$BenefitsFromRecertReceipt_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{BenefitsFromRecertReceipt_SNAP} = 'No'",
                title:
                  "Benefits were not provided back to the application for recertification date",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$RuntoComeUpMonth_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{RuntoComeUpMonth_SNAP} = 'No'",
                title: "The come-up month of benefits was not run",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$NotAuthWithin30Days_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{NotAuthWithin30Days_Fault_SNAP} = 'Yes'",
                title: "Benefits were not authorized within 30 days",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$DeniedTimely_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{DeniedTimely_Fault_SNAP} = 'Yes'",
                title: "The application was not denied timely",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Authorization Findings:"
          },
          {
            type: "panel",
            name: "WorkAssessmentFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$ABAWDScreening_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ABAWDScreening_SNAP} = 'No'",
                title: "No ABAWD Screening was completed",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ABAWDStatusCorrect_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ABAWDStatusCorrect_SNAP} = 'No'",
                title: "The ABAWD status was incorrectly determined",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ScreeningInEDMS_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ScreeningInEDMS_SNAP} = 'No'",
                title: "The ABAWD screening was not stored in EDMS/OnBase",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExemptionWorkRegDetailUpdated_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExemptionWorkRegDetailUpdated_SNAP} = 'No'",
                title:
                  "The Work Registration exemption was not recorded properly",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ABAWDVerificationRequested_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ABAWDVerificationRequested_SNAP} = 'No'",
                title:
                  "The verification needed for a Work Registration exemption were not requested",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ReferredtoSTS_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ReferredtoSTS_SNAP} = 'No'",
                title: "The client was not referred to SNAP to Skills",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Work Assessment Findings:"
          },
          {
            type: "panel",
            name: "BudgetFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$ExpenseShelterVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpenseMatrix_SNAP.Shelter.Verified} = 'No'",
                title:
                  "A(n) Shelter Expense was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseShelterExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Shelter.ExcludedInError} = TRUE",
                title:
                  "A(n) Shelter Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseShelterIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Shelter.IncludedInError} = TRUE",
                title:
                  "A(n) Shelter Expense was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseUtilitiesVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpenseMatrix_SNAP.Utilities.Verified} = 'No'",
                title:
                  "A(n) Utilities Expense was not verified before authorization"
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseUtilitiesExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Utilities.ExcludedInError} = TRUE",
                title:
                  "A(n) Utilities Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Utilities.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseUtilitiesIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Utilities.IncludedInError} = TRUE",
                title:
                  "A(n) Utilities Expense was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Utilities.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseMedicalVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpenseMatrix_SNAP.Medical.Verified} = 'No'",
                title:
                  "A(n) Medical Expense was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Medical.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseMedicalExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Medical.ExcludedInError} = TRUE",
                title:
                  "A(n) Medical Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Medical.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseMedicalIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Medical.IncludedInError} = TRUE",
                title:
                  "A(n) Medical Expense was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Medical.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseMedicareVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpenseMatrix_SNAP.Medicare.Verified} = 'No'",
                title:
                  "A(n) Medicare Premium was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Medicare.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseRecurringMedicalExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.RecurringMedical.ExcludedInError} = TRUE",
                title:
                  "A(n) RecurringMedical Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.RecurringMedical.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseChildSupportVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpenseMatrix_SNAP.ChildSupport.Verified} = 'No'",
                title:
                  "A(n) ChildSupport Expense was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.ChildSupport.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseChildSupportExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.ChildSupport.ExcludedInError} = TRUE",
                title:
                  "A(n) ChildSupport Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.ChildSupport.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseChildSupportIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.ChildSupport.IncludedInError} = TRUE",
                title:
                  "A(n) ChildSupport Expense was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.ChildSupport.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseChildcareVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{ExpenseMatrix_SNAP.Childcare.Verified} = 'No'",
                title:
                  "A(n) Childcare Expense was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Childcare.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseChildcareExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Childcare.ExcludedInError} = TRUE",
                title:
                  "A(n) Childcare Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Childcare.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseChildcareIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.Childcare.IncludedInError} = TRUE",
                title:
                  "A(n) Childcare Expense was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.Childcare.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseHealthInsuranceVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.HealthInsurance.Verified} = 'No'",
                title:
                  "A(n) HealthInsurance Expense was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.HealthInsurance.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseHealthInsuranceExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.HealthInsurance.ExcludedInError} = TRUE",
                title:
                  "A(n) HealthInsurance Expense was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.HealthInsurance.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ExpenseHealthInsuranceIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{ExpenseMatrix_SNAP.HealthInsurance.IncludedInError} = TRUE",
                title:
                  "A(n) HealthInsurance Expense was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {ExpenseMatrix_SNAP.HealthInsurance.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeEarnedVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IncomeMatrix_SNAP.Earned.Verified} = 'No'",
                title:
                  "A(n) Earned Income was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.Earned.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeEarnedExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncomeMatrix_SNAP.Earned.ExcludedInError} = 'True'",
                title:
                  "A(n) Earned Income was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.Earned.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeEarnedIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IncomeMatrix_SNAP.Earned.IncludedInError} = TRUE",
                title: "A(n) Earned Income was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.Earned.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeUnearnedVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IncomeMatrix_SNAP.Unearned.Verified} = 'No'",
                title:
                  "A(n) Unearned Income was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.Unearned.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeUnearnedExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncomeMatrix_SNAP.Unearned.ExcludedInError} = TRUE",
                title:
                  "A(n) Unearned Income was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.Unearned.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeUnearnedIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncomeMatrix_SNAP.Unearned.IncludedInError} = TRUE",
                title:
                  "A(n) Unearned Income was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.Unearned.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeSSISSDIVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IncomeMatrix_SNAP.SSISSDI.Verified} = 'No'",
                title:
                  "A(n) SSISSDI Income was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.SSISSDI.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeSSISSDIExcludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IncomeMatrix_SNAP.SSISSDI.ExcludedInError} = TRUE",
                title:
                  "A(n) SSISSDI Income was excluded from the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.SSISSDI.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncomeSSISSDIIncludedInError_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IncomeMatrix_SNAP.SSISSDI.IncludedInError} = TRUE",
                title:
                  "A(n) SSISSDI Income was included in the Budget in error",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {IncomeMatrix_SNAP.SSISSDI.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$HowMeetMonthlyExpenses_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{HowMeetMonthlyExpenses_SNAP} = 'No'",
                title:
                  "The worker did not verify how expenses exceeding income were met"
              },
              {
                type: "expression",
                name:
                  "$Finding$OtherBudgetErrors_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{OtherBudgetErrors_SNAP} = 'Yes'",
                title: "The worker made other budget-related errors",
                expression:
                  '"Reviewer Comment: "+{OtherBudgetErrors_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Budget Findings:"
          },
          {
            type: "panel",
            name: "VerificationsFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$VerificationIdentityNecessary_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_Matrix_SNAP.Identity.Necessary} = 'No'",
                title: "An unnecessary Verification for Identity was requested",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Identity.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIdentityPingHub_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Identity.PingHub} = 'No'",
                title: "The Hub was not pinged for a(n) Identity Verification",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Identity.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIdentityChecklist_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Identity.Checklist} = 'No'",
                title:
                  "A(n) Identity Verification was not included in a Checklist",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Identity.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIdentityVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Identity.Verified} = 'No'",
                title:
                  "A(n) Identity Verification was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Identity.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIncomeNecessary_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Income.Necessary} = 'No'",
                title: "An unnecessary Verification for Income was requested",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Income.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIncomePingHub_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Income.PingHub} = 'No'",
                title: "The Hub was not pinged for a(n) Income Verification",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Income.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIncomeChecklist_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Income.Checklist} = 'No'",
                title:
                  "A(n) Income Verification was not included in a Checklist",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Income.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationIncomeVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Income.Verified} = 'No'",
                title:
                  "A(n) Income Verification was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Income.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationCitizenshipNecessary_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Citizenship.Necessary} = 'No'",
                title:
                  "An unnecessary Verification for Citizenship was requested",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Citizenship.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationCitizenshipPingHub_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Citizenship.PingHub} = 'No'",
                title:
                  "The Hub was not pinged for a(n) Citizenship Verification",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Citizenship.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationCitizenshipChecklist_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Citizenship.Checklist} = 'No'",
                title:
                  "A(n) Citizenship Verification was not included in a Checklist",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Citizenship.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationCitizenshipVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Citizenship.Verified} = 'No'",
                title:
                  "A(n) Citizenship Verification was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Citizenship.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationShelterNecessary_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Shelter.Necessary} = 'No'",
                title: "An unnecessary Verification for Shelter was requested",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationShelterPingHub_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Shelter.PingHub} = 'No'",
                title: "The Hub was not pinged for a(n) Shelter Verification",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationShelterChecklist_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Shelter.Checklist} = 'No'",
                title:
                  "A(n) Shelter Verification was not included in a Checklist",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationShelterVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Shelter.Verified} = 'No'",
                title:
                  "A(n) Shelter Verification was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Shelter.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationRentNecessary_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Rent.Necessary} = 'No'",
                title: "An unnecessary Verification for Rent was requested",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Rent.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationRentPingHub_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{RequestedVerifications_SNAP.Rent.PingHub} = 'No'",
                title: "The Hub was not pinged for a(n) Rent Verification",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Rent.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationRentChecklist_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{RequestedVerifications_SNAP.Rent.Checklist} = 'No'",
                title: "A(n) Rent Verification was not included in a Checklist",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Rent.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$VerificationRentVerified_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{RequestedVerifications_SNAP.Rent.Verified} = 'No'",
                title:
                  "A(n) Rent Verification was not verified before authorization",
                expression:
                  '"Review of: " + {DisplayVariable_SNAP} + " -- Reviewer Comment: "+ {RequestedVerifications_SNAP.Rent.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$AgencyRequestVerifications_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{AgencyRequestVerifications_SNAP} = 'NoIncorrect'",
                title: "One or more necessary verifications were not requested",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$UnnecessaryVerifications_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{UnnecessaryVerifications_SNAP} = 'TRUE'",
                title: "Unnecessary verifications were requested",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$PostponedSecondMonthUnverified_Fault_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{PostponedSecondMonthUnverified_Fault_SNAP} = 'Yes'",
                title:
                  "A second month of benefits was issued without verifications",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$PostponedSecondMonthFailedToIssue_Fault_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{PostponedSecondMonthFailedToIssue_Fault_SNAP} = 'Yes'",
                title: "A second month of benefits was never issued",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$PendingNoticeon30thDay_Fault_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{PendingNoticeon30thDay_Fault_SNAP} = 'Yes'",
                title:
                  "Notice was not provided on the 30th day for pending verifications",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$SNAPBenefitsDenied&WereNot_SNAP$Finding_NO_CORRECTION_REQUIRED$review$3",
                visibleIf: "{SNAPBenefitsDenied&WereNot_SNAP} = 'Yes'",
                title:
                  "Benefits were approved despite a failure to provide verifications",
                expression: '"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$UnaddressedAlertsIEVS_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{UnaddressedAlertsIEVS_SNAP} = 'Yes'",
                title: "Relevant alerts or IEVS matches were left unaddressed",
                expression:
                  '"Reviewer Comment: "+{UnaddressedAlertsIEVS_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Verification Findings:"
          },
          {
            type: "panel",
            name: "MiscellaneousFindings_Panel_SNAP",
            elements: [
              {
                type: "expression",
                name:
                  "$Finding$IsOutcomeCorrect_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{IsOutcomeCorrect_SNAP} = 'No'",
                title: "The eligibility determination was incorrect",
                expression:
                  '"Reviewer Comment: "+{OutcomeIncorrectComment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$OtherErrors_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf: "{OtherErrors_SNAP} = 'Yes'",
                title: "One or more other errors were made",
                expression:
                  '"Reviewer Comment: "+{OtherErrors_Comment_SNAP} + " -- "+"Review of: " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$InitialBenefitIncorrect_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{BenefitAmountCorrect_Matrix_SNAP.Initial.Correct} = 'No'",
                title: "Initial Benefit Amount was Incorrect",
                expression:
                  '"At Review: $"+{BenefitAmountCorrect_Matrix_SNAP.Initial.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_SNAP.Initial.CorrectedAmt} + " -- " + {DisplayVariable_SNAP}'
              },
              {
                type: "expression",
                name:
                  "$Finding$OngoingBenefitIncorrect_SNAP$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{BenefitAmountCorrect_Matrix_SNAP.Ongoing.Correct} = 'No'",
                title: "Ongoing Benefit Amount was Incorrect",
                expression:
                  '"At Review: $"+{BenefitAmountCorrect_Matrix_SNAP.Ongoing.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_SNAP.Ongoing.CorrectedAmt} + " -- " + {DisplayVariable_SNAP}'
              }
            ],
            title: "Miscellaneous Findings:"
          },
          {
            type: "panel",
            name: "Findings_Panel_SNAPET",
            elements: [
              {
                type: "panel",
                name: "JournalNotesFindings_Panel_SNAPET",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalNotes_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalNotes_SNAPET} = 'No'",
                    title: "No Journal Notes were kept"
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalAdequate_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalAdequate_SNAPET} = 'No'",
                    title: "The Journal Notes were inadequate",
                    expression:
                      '"Reviewer Comment: "+{JournalAdequate_Comment_SNAPET} + " -- "+"Review of: " + {DisplayVariable_SNAPET}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalDescriptionSufficient_SNAPET$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalDescriptionSufficient_SNAPET} = 'No'",
                    title: "The Journal Notes Description was not Sufficient",
                    expression:
                      '"Reviewer Comment: "+{JournalDescriptionSufficient_Comment_SNAPET} + " -- "+"Review of: " + {DisplayVariable_SNAPET}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FTIinJournalEntry_SNAPET$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FTIinJournalEntry_SNAPET} = 'Yes'",
                    title:
                      "There was Federal Tax Information in the Journal Notes",
                    expression:
                      '"Reviewer Comment: "+{AllExemptionsRecorded_Comment_SNAPET} + " -- "+"Review of: " + {DisplayVariable_SNAPET}'
                  },
                  {
                    type: "panel",
                    name: "WorkAssessmentFindings_Panel_SNAPET",
                    elements: [
                      {
                        type: "expression",
                        name:
                          "$Finding$ABAWDScreening_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                        visibleIf: "{ABAWDScreening_SNAPET} = 'No'",
                        title: "No ABAWD Screening was completed",
                        expression: '"Review of: " + {DisplayVariable_SNAPET}'
                      },
                      {
                        type: "expression",
                        name:
                          "$Finding$ABAWDStatusCorrect_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                        visibleIf: "{ABAWDStatusCorrect_SNAPET} = 'No'",
                        title: "The ABAWD status was incorrectly determined",
                        expression: '"Review of: " + {DisplayVariable_SNAPET}'
                      },
                      {
                        type: "expression",
                        name:
                          "$Finding$ScreeningInEDMS_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                        visibleIf: "{ScreeningInEDMS_SNAPET} = 'No'",
                        title:
                          "The ABAWD screening was not stored in EDMS/OnBase",
                        expression: '"Review of: " + {DisplayVariable_SNAPET}'
                      },
                      {
                        type: "expression",
                        name:
                          "$Finding$ExemptionRequested_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                        visibleIf: "{ExemptionRequested_SNAPET} = 'No'",
                        title:
                          "Verifications were not requested for the Work Registration exemption",
                        expression: '"Review of: " + {DisplayVariable_SNAPET}'
                      },
                      {
                        type: "expression",
                        name:
                          "$Finding$ExemptionWorkRegDetailUpdated_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                        visibleIf:
                          "{ExemptionWorkRegDetailUpdated_SNAPET} = 'No'",
                        title:
                          "The Work Registration exemption was not recorded properly",
                        expression: '"Review of: " + {DisplayVariable_SNAPET}'
                      },
                      {
                        type: "expression",
                        name:
                          "$Finding$AllExemptionsRecorded_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                        visibleIf: "{AllExemptionsRecorded_SNAPET} = 'No'",
                        title:
                          "The exemption screens were not all recorded properly",
                        expression: '"Review of: " + {DisplayVariable_SNAPET}'
                      },
                      {
                        type: "panel",
                        name: "SNAPtoSkillsIntakeFindings_Panel_SNAPET",
                        elements: [
                          {
                            type: "expression",
                            name:
                              "$Finding$ApptLetter_SNAPET$Finding_NO_CORRECTION_REQUIRED$review$3",
                            visibleIf: "{ApptLetter_SNAPET} = 'No'",
                            title:
                              "The client was not sent an appointment letter",
                            expression:
                              '"Review of: " + {DisplayVariable_SNAPET}'
                          },
                          {
                            type: "expression",
                            name:
                              "$Finding$UntimelyApptCause_Fault_SNAPET$Finding_NO_CORRECTION_REQUIRED$review$3",
                            visibleIf:
                              "{UntimelyApptCause_Fault_SNAPET} = 'Yes'",
                            title:
                              "The worker caused the appointment to be scheduled untimely",
                            expression:
                              '"Review of: " + {DisplayVariable_SNAPET}'
                          },
                          {
                            type: "expression",
                            name:
                              "$Finding$RescheduledAppt_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                            visibleIf: "{RescheduledAppt_SNAPET} = 'No'",
                            title:
                              "The client was not rescheduled after providing good cause",
                            expression:
                              '"Review of: " + {DisplayVariable_SNAPET}'
                          },
                          {
                            type: "expression",
                            name:
                              "$Finding$MissedApptSanction_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                            visibleIf: "{MissedApptSanction_SNAPET} = 'No'",
                            title:
                              "The client was not sanctioned for missing their appointment without good cause",
                            expression:
                              '"Review of: " + {DisplayVariable_SNAPET}'
                          },
                          {
                            type: "panel",
                            name: "EligibilityFindings_Panel_SNAPET",
                            elements: [
                              {
                                type: "expression",
                                name:
                                  "$Finding$RegainingVerification_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                visibleIf:
                                  "{RegainingVerification_SNAPET} = 'No'",
                                title:
                                  "The client's regained eligibility was not verified",
                                expression:
                                  '"Review of: " + {DisplayVariable_SNAPET}'
                              },
                              {
                                type: "expression",
                                name:
                                  "$Finding$NonComplianceEndDates_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                visibleIf:
                                  "{NonComplianceEndDates_SNAPET} = 'No'",
                                title:
                                  "The client's non-compliance was end-dated with the wrong dates",
                                expression:
                                  '"Review of: " + {DisplayVariable_SNAPET}'
                              },
                              {
                                type: "expression",
                                name:
                                  "$Finding$SuppplementalBenefits_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                visibleIf:
                                  "{SuppplementalBenefits_SNAPET} = 'No'",
                                title: "Supplemental benefits were not issued",
                                expression:
                                  '"Review of: " + {DisplayVariable_SNAPET}'
                              },
                              {
                                type: "expression",
                                name:
                                  "$Finding$3of36ProposetoTerminateTimely_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                visibleIf:
                                  "{3of36ProposetoTerminateTimely_SNAPET} = 'No'",
                                title:
                                  "The worker did not propose to terminate benefits timely after the 3 of 36 months were exhausted",
                                expression:
                                  '"Review of: " + {DisplayVariable_SNAPET}'
                              },
                              {
                                type: "expression",
                                name:
                                  "$Finding$UntimelyTerminationInvestigations_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                visibleIf:
                                  "{UntimelyTerminationInvestigations_SNAPET} = 'No'",
                                title:
                                  "The case was not referred to investigations despite being terminated after 3 months",
                                expression:
                                  '"Review of: " + {DisplayVariable_SNAPET}'
                              },
                              {
                                type: "expression",
                                name:
                                  "$Finding$SanctionEmployActScreenEndDated_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                visibleIf:
                                  "{SanctionEmployActScreenEndDated_SNAPET} = 'No'",
                                title:
                                  "The employment activity screen was not end-dated as part of the sanction",
                                expression:
                                  '"Review of: " + {DisplayVariable_SNAPET}'
                              },
                              {
                                type: "panel",
                                name: "WorkAssignmentFindings_Panel_SNAPET",
                                elements: [
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$EmpScreenCorrectUnpaidInkindEmploy_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{EmpScreenCorrectUnpaidInkindEmploy_SNAPET} = 'No'",
                                    title:
                                      "The employment screen was not completed correctly for Unpaid/In-Kind Employment",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$EmployLess20hrswkAnothrWorkAct_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{EmployLess20hrswkAnothrWorkAct_SNAPET} = 'No'",
                                    title:
                                      "The client was not assigned sufficient non-employment hours",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$WEPComplyWithFLSA_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{WEPComplyWithFLSA_SNAPET} = 'No'",
                                    title:
                                      "The WEP hours do not comply with FLSA requirements",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$SchoolEmployPlan_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{SchoolEmployPlan_SNAPET} = 'No'",
                                    title:
                                      "There is no employability plan on file",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$EmployActScreenAppropActivity_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{EmployActScreenAppropActivity_SNAPET} = 'No'",
                                    title:
                                      "The employment screen was not correctly updated with the assigned activities",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$IWAMServAuth_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf: "{IWAMServAuth_SNAPET} = 'No'",
                                    title:
                                      "A service authorization with a provider was not issued correctly",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$IWAMAlertsNegAction_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{IWAMAlertsNegAction_SNAPET} = 'No'",
                                    title:
                                      "Some iWAM Alerts requiring negative action were not processed",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$BackgroundCheckReferral_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{BackgroundCheckReferral_SNAPET} = 'No'",
                                    title:
                                      "The client was not referred for a necessary background check",
                                    expression:
                                      '"Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$FelonyAssignedActAppropriate_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{FelonyAssignedActAppropriate_SNAPET} = 'No'",
                                    title:
                                      "The assigned activities are not appropriate due to a felony record",
                                    expression:
                                      '"Reviewer Comment: " +{FelonyAssignedActAppropriate_Comment_SNAPET} \n+ " -- "+ "Review of: " + {DisplayVariable_SNAPET}'
                                  },
                                  {
                                    type: "expression",
                                    name:
                                      "$Finding$NoHSDiplomaGEDAssignActAppropriate_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                    visibleIf:
                                      "{NoHSDiplomaGEDAssignActAppropriate_SNAPET} = 'No'",
                                    title:
                                      "The assigned activities are not appropriate due to lack of a high school degree or equivalent",
                                    expression:
                                      '"Reviewer Comment: " \n+ {NoHSDiplomaGEDAssignActAppropriate_Comment_SNAPET} \n+ " -- " + "Review of: " + {DisplayVariable_SNAPET}\n'
                                  },
                                  {
                                    type: "panel",
                                    name: "MiscellaneousFindings_Panel_SNAPET",
                                    elements: [
                                      {
                                        type: "expression",
                                        name:
                                          "$Finding$OtherErrors_SNAPET$Finding_CORRECTION_REQUIRED$review$3",
                                        visibleIf:
                                          "{OtherErrors_SNAPET} = 'Yes'",
                                        title:
                                          "One or more other errors were made",
                                        expression:
                                          '"Reviewer Comment: "+{OtherErrors_Comment_SNAPET} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                                      }
                                    ],
                                    title: "Miscellaneous Findings:"
                                  }
                                ],
                                title: "Work Assignment Findings:"
                              }
                            ],
                            title: "Eligibility Findings:"
                          }
                        ],
                        title: "SNAP to Skills Intake Findings:"
                      }
                    ],
                    title: "Work Assessment Findings:"
                  }
                ],
                title: "JournalNotes Findings:"
              }
            ],
            title: "SNAP E&T Findings"
          },
          {
            type: "panel",
            name: "FIndings_Panel_TANF",
            elements: [
              {
                type: "panel",
                name: "JournalNotesFindings_Panel_TANF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalNotes_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalNotes_TANF} = 'No'",
                    title: "No Journal Notes were kept",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalTemplate_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalTemplate_TANF} = 'No'",
                    title: "The Journal Note template was not used",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalAdequate_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalAdequate_TANF} = 'No'",
                    title: "The Journal Notes were inadequate",
                    expression:
                      '"Reviewer Comment: "+{JournalAdequate_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalDescriptionSufficient_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalDescriptionSufficient_TANF} = 'No'",
                    title: "The Journal Notes Description was not Sufficient",
                    expression:
                      '"Reviewer Comment: "+{JournalDescriptionSufficient_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FTIinJournalEntry_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FTIinJournalEntry_TANF} = 'Yes'",
                    title:
                      "There was Federal Tax Information in the Journal Notes",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  }
                ],
                title: "Journal Notes Findings:"
              },
              {
                type: "panel",
                name: "InterviewFindings_Panel_TANF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$InterviewScheduleDelayByAgency_Fault_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{InterviewScheduleDelayByAgency_Fault_TANF} = 'Yes'",
                    title:
                      "Timely intake interview was not scheduled due to error by this worker",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InterviewDelaybyAgency_Fault_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{InterviewDelaybyAgency_Fault_TANF} = 'Yes'",
                    title:
                      "The intake interview was delayed due to this worker",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BenefitsRestoredtoAppDate_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BenefitsRestoredtoAppDate_TANF} = 'No'",
                    title:
                      "Benefits were not restored to the beginning of the App/Recert period",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$CustomerScheduleUpdate_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{CustomerScheduleUpdate_TANF} = 'No'",
                    title: "Customer Scheduling was not updated correctly",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$NOMIIssued_Fault_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{NOMIIssued_Fault_TANF} = 'Yes'",
                    title: "A NOMI was not issued",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JETReferral_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JETReferral_TANF} = 'No'",
                    title: "The client was not referred to JET",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JETReferralTimely_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JETReferralTimely_TANF} = 'No'",
                    title: "The JET referral was not timely",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SignedApplicationAudiosignature_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SignedApplicationAudiosignature_TANF} = 'No'",
                    title:
                      "There is no signed application and/or audio signature",
                    expression: '"Review of: " + {DisplayVariable_SNAP}'
                  }
                ],
                title: "Interview Findings:"
              },
              {
                type: "panel",
                name: "AuthorizationFindings_Panel_TANF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$AuthRepCorrect_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{AuthRepCorrect_TANF} = 'No'",
                    title:
                      "The Authorized Representative information was incorrect or missing",
                    expression:
                      '"Reviewer Comment: "+{AuthRepCorrect_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IntakeCorrectAppDate_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IntakeCorrectAppDate_TANF} = 'No'",
                    title: "The application date was incorrect",
                    expression:
                      '"Reviewer Comment: "+{IntakeCorrectAppDate_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$CertPeriodCorrect_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{CertPeriodCorrect_TANF} = 'No'",
                    title: "The certification period was incorrect",
                    expression:
                      '"Reviewer Comment: "+{CertPeriodCorrect_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RecertBenefitsFromActionDate_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RecertBenefitsFromActionDate_TANF} = 'No '",
                    title:
                      "Benefits were not provided back to the recertification late-submission ",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BenefitsFromRecertReceipt_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BenefitsFromRecertReceipt_TANF} = 'No'",
                    title:
                      "Benefits were not provided back to the application for recertification date",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RuntoComeUpMonth_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RuntoComeUpMonth_TANF} = 'No'",
                    title: "The come-up month of benefits was not run",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$NotAuthWithin30Days_Fault_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{NotAuthWithin30Days_Fault_TANF} = 'Yes'",
                    title:
                      "The case was not authorized timely due to worker error",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$DeniedTimely_Fault_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{DeniedTimely_Fault_TANF} = 'Yes'",
                    title:
                      "The client was not denied timely due to worker error",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  }
                ],
                title: "Authorization Findings:"
              },
              {
                type: "panel",
                name: "BudgetFindings_Panel_TANF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_TANF.Shelter.Verified} = 'No'",
                    title:
                      "A(n) Shelter Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Shelter.ExcludedInError} = TRUE",
                    title:
                      "A(n) Shelter Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Shelter.IncludedInError} = TRUE",
                    title:
                      "A(n) Shelter Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_TANF.Utilities.Verified} = 'No'",
                    title:
                      "A(n) Utilities Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Utilities.ExcludedInError} = TRUE",
                    title:
                      "A(n) Utilities Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Utilities.IncludedInError} = TRUE",
                    title:
                      "A(n) Utilities Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_TANF.Medical.Verified} = 'No'",
                    title:
                      "A(n) Medical Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Medical.ExcludedInError} = TRUE",
                    title:
                      "A(n) Medical Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Medical.IncludedInError} = TRUE",
                    title:
                      "A(n) Medical Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_TANF.Medicare.Verified} = 'No'",
                    title:
                      "A(n) Medicare Premium was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Medicare.ExcludedInError} = TRUE",
                    title:
                      "A(n) Medicare Premium was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Medicare.IncludedInError} = TRUE",
                    title:
                      "A(n) Medicare Premium was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.RecurringMedical.Verified} = 'No'",
                    title:
                      "A(n) RecurringMedical Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.RecurringMedical.ExcludedInError} = TRUE",
                    title:
                      "A(n) RecurringMedical Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.RecurringMedical.IncludedInError} = TRUE",
                    title:
                      "A(n) RecurringMedical Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.ChildSupport.Verified} = 'No'",
                    title:
                      "A(n) ChildSupport Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.ChildSupport.ExcludedInError} = TRUE",
                    title:
                      "A(n) ChildSupport Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.ChildSupport.IncludedInError} = TRUE",
                    title:
                      "A(n) ChildSupport Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_TANF.Childcare.Verified} = 'No'",
                    title:
                      "A(n) Childcare Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Childcare.ExcludedInError} = TRUE",
                    title:
                      "A(n) Childcare Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.Childcare.IncludedInError} = TRUE",
                    title:
                      "A(n) Childcare Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.HealthInsurance.Verified} = 'No'",
                    title:
                      "A(n) HealthInsurance Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.HealthInsurance.ExcludedInError} = TRUE",
                    title:
                      "A(n) HealthInsurance Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_TANF.HealthInsurance.IncludedInError} = TRUE",
                    title:
                      "A(n) HealthInsurance Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {ExpenseMatrix_TANF.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_TANF.Earned.Verified} = 'No'",
                    title:
                      "A(n) Earned Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_TANF.Earned.ExcludedInError} = TRUE",
                    title:
                      "A(n) Earned Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_TANF.Earned.IncludedInError} = TRUE",
                    title:
                      "A(n) Earned Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_TANF.Unearned.Verified} = 'No'",
                    title:
                      "A(n) Unearned Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_TANF.Unearned.ExcludedInError} = TRUE",
                    title:
                      "A(n) Unearned Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_TANF.Unearned.IncludedInError} = TRUE",
                    title:
                      "A(n) Unearned Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_TANF.SSISSDI.Verified} = 'No'",
                    title:
                      "A(n) SSISSDI Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIExcludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_TANF.SSISSDI.ExcludedInError} = TRUE",
                    title:
                      "A(n) SSISSDI Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIIncludedInError_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_TANF.SSISSDI.IncludedInError} = TRUE",
                    title:
                      "A(n) SSISSDI Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {IncomeMatrix_TANF.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BuyInMedicarePremium_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BuyInMedicarePremium_TANF} = 'No'",
                    title:
                      "The Medicare premium paid by State Buy-In was not recorded correctly",
                    expression:
                      '"Reviewer Comment: "+{BuyInMedicarePremium_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SSISSDIOverpayment_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SSISSDIOverpayment_TANF} = 'No'",
                    title:
                      "The different gross and net SSI/SSDI was not processed correctly",
                    expression:
                      '"Reviewer Comment: "+{SSISSDIOverpayment_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherBudgetErrors_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherBudgetErrors_TANF} = 'Yes'",
                    title: "The worker made other budget-related errors",
                    expression:
                      '"Reviewer Comment: "+{OtherBudgetErrors_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  }
                ],
                title: "Budget Findings:"
              },
              {
                type: "panel",
                name: "VerificationsFindings_Panel_TANF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityNecessary_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Identity.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Identity was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityPingHub_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Identity.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Identity Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityChecklist_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Identity.Checklist} = 'No'",
                    title:
                      "A(n) Identity Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Identity.Verified} = 'No'",
                    title:
                      "A(n) Identity Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeNecessary_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Income.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Income was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomePingHub_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Income.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Income Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeChecklist_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Income.Checklist} = 'No'",
                    title:
                      "A(n) Income Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Income.Verified} = 'No'",
                    title:
                      "A(n) Income Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipNecessary_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Citizenship.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Citizenship was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipPingHub_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Citizenship.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Citizenship Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipChecklist_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Citizenship.Checklist} = 'No'",
                    title:
                      "A(n) Citizenship Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Citizenship.Verified} = 'No'",
                    title:
                      "A(n) Citizenship Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterNecessary_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Shelter.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Shelter was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterPingHub_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Shelter.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Shelter Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterChecklist_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Shelter.Checklist} = 'No'",
                    title:
                      "A(n) Shelter Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Shelter.Verified} = 'No'",
                    title:
                      "A(n) Shelter Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentNecessary_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Rent.Necessary} = 'No'",
                    title: "An unnecessary Verification for Rent was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentPingHub_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Rent.PingHub} = 'No'",
                    title: "The Hub was not pinged for a(n) Rent Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentChecklist_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Rent.Checklist} = 'No'",
                    title:
                      "A(n) Rent Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_TANF.Rent.Verified} = 'No'",
                    title:
                      "A(n) Rent Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_TANF} + " -- Reviewer Comment: "+ {RequestedVerifications_TANF.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$NotChildCashCaretaker_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{NotChildCashCaretaker_TANF} = 'No'",
                    title:
                      "The caretaker is not a parent or verified custodian/legal guardian",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ChildRelativeVerified_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ChildRelativeVerified_TANF} = 'No'",
                    title: "The caretaker relationship was not verified",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$TANFBenefitsDenied&WereNot_TANF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{TANFBenefitsDenied&WereNot_TANF} = 'No'",
                    title:
                      "Benefits were approved despite a failure to provide verifications",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UnaddressedAlertsIEVS_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UnaddressedAlertsIEVS_TANF} = 'Yes'",
                    title:
                      "Relevant alerts or IEVS matches were left unaddressed",
                    expression:
                      '"Reviewer Comment: "+{UnaddressedAlertsIEVS_Comment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  }
                ],
                title: "Verifications Findings:"
              },
              {
                type: "panel",
                name: "MiscellaneousFindings_Panel_TANF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$IsOutcomeCorrect_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IsOutcomeCorrect_TANF} = 'No'",
                    title: "The eligibility determination was incorrect",
                    expression:
                      '"Reviewer Comment: "+{OutcomeIncorrectComment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InitialBenefitIncorrect_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{BenefitAmountCorrect_Matrix_TANF.Initial.Correct} = 'No'",
                    title: "Initial Benefit Amount was Incorrect",
                    expression:
                      '"At Review: $"+{BenefitAmountCorrect_Matrix_TANF.Initial.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_TANF.Initial.CorrectedAmt} + " -- " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OngoingBenefitIncorrect_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{BenefitAmountCorrect_Matrix_TANF.Ongoing.Correct} = 'No'",
                    title: "Ongoing Benefit Amount was Incorrect",
                    expression:
                      '"At Review: $"+{BenefitAmountCorrect_Matrix_TANF.Ongoing.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_TANF.Ongoing.CorrectedAmt} + " -- " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$DegreeListUpdatedinOBWP_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{DegreeListUpdatedinOBWP_TANF} = 'No'",
                    title: "The degree list was not updated correctly",
                    expression: '"Review of: " + {DisplayVariable_TANF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherErrors_TANF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherErrors_TANF} = 'Yes'",
                    title: "One or more other errors were made",
                    expression:
                      '"Reviewer Comment: "+{OtherErrorsComment_TANF} + " -- "+"Review of: " + {DisplayVariable_TANF}'
                  }
                ],
                title: "Journal Notes Findings:"
              }
            ],
            title: "TANF Findings"
          },
          {
            type: "panel",
            name: "Findings_Panel_OWF",
            elements: [
              {
                type: "panel",
                name: "JournalNotesFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalNotes_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalNotes_OWF} = 'No'",
                    title: "No Journal Notes were kept",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalAdequate_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalAdequate_OWF} = 'No'",
                    title: "The Journal Notes were inadequate",
                    expression:
                      '"Reviewer Comment: "+{JournalAdequate_Comment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalDescriptionSufficient_OWF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalDescriptionSufficient_OWF} = 'No'",
                    title: "The Journal Notes Description was not Sufficient",
                    expression:
                      '"Reviewer Comment: "+{JournalDescriptionSufficient_Comment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FTIinJournalEntry_OWF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FTIinJournalEntry_OWF} = 'Yes'",
                    title:
                      "There was Federal Tax Information in the Journal Notes",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Journal Notes Findings:"
              },
              {
                type: "panel",
                name: "IntakeInterviewFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$InterviewScheduleDelayByAgency_Fault_OWF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{InterviewScheduleDelayByAgency_Fault_OWF} = 'Yes'",
                    title:
                      "Timely intake interview was not scheduled due to error by this worker",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InterviewDelaybyAgency_Fault_OWF$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{InterviewDelaybyAgency_Fault_OWF} = 'Yes'",
                    title:
                      "The intake interview was not held timely due to this worker",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OOCompleted_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OOCompleted_OWF} = 'No'",
                    title:
                      "The Options & Opportunities review was not completed",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$AssessInterviewScheduled_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{AssessInterviewScheduled_OWF} = 'No'",
                    title: "The Assessment interview was not scheduled",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$PreEmployScreenScheduled_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{PreEmployScreenScheduled_OWF} = 'No'",
                    title: "The pre-employment screening was not scheduled",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$CriminalBackgroundCheckReferral_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{CriminalBackgroundCheckReferral_OWF} = 'No'",
                    title:
                      "The client was not referred for a necessary background check",
                    expression:
                      '"Reviewer Comment: "+{CriminalBackgroundCheckReferral_Comment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Intake Interview Findings:"
              },
              {
                type: "panel",
                name: "VerificationsFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$ChecklistRequiredVerf_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ChecklistRequiredVerf_OWF} = 'No'",
                    title: "A verification checklist was not issued properly",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SignedSelfSuffContract&Plan_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SignedSelfSuffContract&Plan_OWF} = 'No'",
                    title:
                      "There is no signed self-sufficiency contract on file",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Verifications Findings:"
              },
              {
                type: "panel",
                name: "ChildcareFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$ChildcareAppWithChecklist_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ChildcareAppWithChecklist_OWF} = 'No'",
                    title:
                      "The client was not given a childcare application and/or checklist",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$NoChildcareinWriting&Signed_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{NoChildcareinWriting&Signed_OWF} = 'No'",
                    title: "A written declining of childcare is not on file",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Childcare Findings:"
              },
              {
                type: "panel",
                name: "WorkAssignmentFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$TranspAllowAuth_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{TranspAllowAuth_OWF} = 'No'",
                    title: "The transportation allowance was not authorized",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$WEPFLSACalCorrect_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{WEPFLSACalCorrect_OWF} = 'No'",
                    title: "The WEP hours do not comply with FLSA requirements",
                    expression:
                      '"Reviewer Comment: "+{WEPFLSACalCorrect_Comment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JobSearchEndAfter6Wks_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JobSearchEndAfter6Wks_OWF} = 'No'",
                    title:
                      "The Job Search Assignment was not scheduled to end within 6 weeks",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InabilityToWorkPartVerified_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{InabilityToWorkPartVerified_OWF} = 'No'",
                    title:
                      "The client's inability to work was not verified for an Alt Work referral",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Work Assignment Findings:"
              },
              {
                type: "panel",
                name: "DocumentationFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$ServAuthInIWAM_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ServAuthInIWAM_OWF} = 'No'",
                    title:
                      "A service authorization with a provider was not issued correctly",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IWAMAlertsNegAction_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IWAMAlertsNegAction_OWF} = 'No'",
                    title:
                      "Some iWAM Alerts requiring negative action were not processed",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$WorkActivitesUpdatedinOBWP_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{WorkActivitesUpdatedinOBWP_OWF} = 'No'",
                    title:
                      "The work acitivites were not updated correctly in OBWP",
                    expression:
                      '"Reviewer Comment: "+{WorkActivitesUpdatedinOBWP_Comment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OWFActStatusListUpdated_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OWFActStatusListUpdated_OWF} = 'No'",
                    title:
                      "The TANF Work Activities Status List was not updated correctly",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Documentation Findings:"
              },
              {
                type: "panel",
                name: "SanctionFindings_Panel_OWF",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$SanctionCorrectlyRemovedEndDated_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SanctionCorrectlyRemovedEndDated_OWF} = 'No'",
                    title:
                      "The Sanction was not correctly removed or end-dated",
                    expression:
                      '"Reviewer Comment: "+{SanctionCorrectlyRemovedEndDated_Comment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$MinSancPeriod&RequirComplHours_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{MinSancPeriod&RequirComplHours_OWF} = 'No'",
                    title:
                      "The client had not served the minimum sanction period and/or provided compliance hours",
                    expression: '"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IsOutcomeCorrect_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IsOutcomeCorrect_OWF} = 'No'",
                    title: "The eligibility determination was incorrect",
                    expression:
                      '"Reviewer Comment: "+{OutcomeIncorrectComment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherErrors_OWF$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherErrors_OWF} = 'Yes'",
                    title: "One or more other errors were made",
                    expression:
                      '"Reviewer Comment: "+{OtherErrorsComment_OWF} + " -- "+"Review of: " + {DisplayVariable_OWF}'
                  }
                ],
                title: "Journal Notes Findings:"
              }
            ],
            title: "TANF Work Activities Findings"
          },
          {
            type: "panel",
            name: "Findings_Panel_MC",
            elements: [
              {
                type: "panel",
                name: "JournalNotesFindings_Panel_MC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalNotes_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalNotes_MC} = 'No'",
                    title: "No Journal Notes were kept",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalTemplate_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalTemplate_MC} = 'No'",
                    title: "The Journal Note template was not used",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalAdequate_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalAdequate_MC} = 'No'",
                    title: "The Journal Notes were inadequate",
                    expression:
                      '"Reviewer Comment: "+{JournalAdequate_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalDescriptionSufficient_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalDescriptionSufficient_MC} = 'No'",
                    title: "The Journal Notes Description was not Sufficient",
                    expression:
                      '"Reviewer Comment: "+{JournalDescriptionSufficient_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FTIinJournalEntry_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FTIinJournalEntry_MC} = 'Yes'",
                    title:
                      "There was Federal Tax Information in the Journal Notes",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  }
                ],
                title: "Journal Notes Findings:"
              },
              {
                type: "panel",
                name: "AuthorizationFindings_Panel_MC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$AuthRepCorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{AuthRepCorrect_MC} = 'No'",
                    title:
                      "The Authorized Representative information was incorrect or missing",
                    expression:
                      '"Reviewer Comment: "+{AuthRepCorrect_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SignedApplicationAudiosignature_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SignedApplicationAudiosignature_MC} = 'No'",
                    title:
                      "There is no signed application and/or audio signature",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IntakeCorrectAppDate_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IntakeCorrectAppDate_MC} = 'No'",
                    title: "The application date was incorrect",
                    expression:
                      '"Reviewer Comment: "+{IntakeCorrectAppDate_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$CertPeriodCorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{CertPeriodCorrect_MC} = 'No'",
                    title: "The certification period was incorrect",
                    expression:
                      '"Reviewer Comment: "+{CertPeriodCorrect_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RecertBenefitsFromActionDate_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RecertBenefitsFromActionDate_MC} = 'No '",
                    title:
                      "Benefits were not provided back to the recertification late-submission ",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BenefitsFromRecertReceipt_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BenefitsFromRecertReceipt_MC} = 'No'",
                    title:
                      "Benefits were not provided back to the application for recertification date",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RuntoComeUpMonth_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RuntoComeUpMonth_MC} = 'No'",
                    title: "The come-up month of benefits was not run",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$Approve45Days_Fault_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{Approve45Days_Fault_MC} = 'Yes'",
                    title:
                      "Benefits were not approved timely due to worker error",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$DeniedTimely_Fault_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{DeniedTimely_Fault_MC} = 'Yes'",
                    title:
                      "Benefits were not denied timely due to worker error",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$MedAidCodesCorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{MedAidCodesCorrect_MC} = 'No'",
                    title: "The Medicaid Aid Codes were incorrect",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RetroMedBenefits_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RetroMedBenefits_MC} = 'No'",
                    title: "Retroactive Medicaid benefits were not explored",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  }
                ],
                title: "Authorization Findings:"
              },
              {
                type: "panel",
                name: "BudgetFindings_Panel_MC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_MC.Shelter.Verified} = 'No'",
                    title:
                      "A(n) Shelter Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Shelter.ExcludedInError} = TRUE",
                    title:
                      "A(n) Shelter Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Shelter.IncludedInError} = TRUE",
                    title:
                      "A(n) Shelter Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_MC.Utilities.Verified} = 'No'",
                    title:
                      "A(n) Utilities Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Utilities.ExcludedInError} = TRUE",
                    title:
                      "A(n) Utilities Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Utilities.IncludedInError} = TRUE",
                    title:
                      "A(n) Utilities Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_MC.Medical.Verified} = 'No'",
                    title:
                      "A(n) Medical Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Medical.ExcludedInError} = TRUE",
                    title:
                      "A(n) Medical Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Medical.IncludedInError} = TRUE",
                    title:
                      "A(n) Medical Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_MC.Medicare.Verified} = 'No'",
                    title:
                      "A(n) Medicare Premium was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Medicare.ExcludedInError} = TRUE",
                    title:
                      "A(n) Medicare Premium was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Medicare.IncludedInError} = TRUE",
                    title:
                      "A(n) Medicare Premium was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.RecurringMedical.Verified} = 'No'",
                    title:
                      "A(n) RecurringMedical Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.RecurringMedical.ExcludedInError} = TRUE",
                    title:
                      "A(n) RecurringMedical Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.RecurringMedical.IncludedInError} = TRUE",
                    title:
                      "A(n) RecurringMedical Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.ChildSupport.Verified} = 'No'",
                    title:
                      "A(n) ChildSupport Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.ChildSupport.ExcludedInError} = TRUE",
                    title:
                      "A(n) ChildSupport Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.ChildSupport.IncludedInError} = TRUE",
                    title:
                      "A(n) ChildSupport Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_MC.Childcare.Verified} = 'No'",
                    title:
                      "A(n) Childcare Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Childcare.ExcludedInError} = TRUE",
                    title:
                      "A(n) Childcare Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.Childcare.IncludedInError} = TRUE",
                    title:
                      "A(n) Childcare Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.HealthInsurance.Verified} = 'No'",
                    title:
                      "A(n) HealthInsurance Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.HealthInsurance.ExcludedInError} = TRUE",
                    title:
                      "A(n) HealthInsurance Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_MC.HealthInsurance.IncludedInError} = TRUE",
                    title:
                      "A(n) HealthInsurance Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ExpenseMatrix_MC.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_MC.Earned.Verified} = 'No'",
                    title:
                      "A(n) Earned Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_MC.Earned.ExcludedInError} = TRUE",
                    title:
                      "A(n) Earned Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_MC.Earned.IncludedInError} = TRUE",
                    title:
                      "A(n) Earned Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_MC.Unearned.Verified} = 'No'",
                    title:
                      "A(n) Unearned Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_MC.Unearned.ExcludedInError} = TRUE",
                    title:
                      "A(n) Unearned Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_MC.Unearned.IncludedInError} = TRUE",
                    title:
                      "A(n) Unearned Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_MC.SSISSDI.Verified} = 'No'",
                    title:
                      "A(n) SSISSDI Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_MC.SSISSDI.ExcludedInError} = TRUE",
                    title:
                      "A(n) SSISSDI Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_MC.SSISSDI.IncludedInError} = TRUE",
                    title:
                      "A(n) SSISSDI Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {IncomeMatrix_MC.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceLiquidVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_MC.Liquid.Verified} = 'No'",
                    title:
                      "A(n) Liquid Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Liquid.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceLiquidExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Liquid.ExcludedInError} = TRUE",
                    title:
                      "A(n) Liquid Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Liquid.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceLiquidIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Liquid.IncludedInError} = TRUE",
                    title:
                      "A(n) Liquid Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Liquid.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceVehicleVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_MC.Vehicle.Verified} = 'No'",
                    title:
                      "A(n) Vehicle Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Vehicle.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceVehicleExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Vehicle.ExcludedInError} = TRUE",
                    title:
                      "A(n) Vehicle Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Vehicle.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceVehicleIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Vehicle.IncludedInError} = TRUE",
                    title:
                      "A(n) Vehicle Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Vehicle.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePersonalVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_MC.Personal.Verified} = 'No'",
                    title:
                      "A(n) Personal Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Personal.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePersonalExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Personal.ExcludedInError} = TRUE",
                    title:
                      "A(n) Personal Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Personal.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePersonalIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Personal.IncludedInError} = TRUE",
                    title:
                      "A(n) Personal Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Personal.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePropertyVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_MC.Property.Verified} = 'No'",
                    title:
                      "A(n) Property Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Property.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePropertyExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Property.ExcludedInError} = TRUE",
                    title:
                      "A(n) Property Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Property.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePropertyIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Property.IncludedInError} = TRUE",
                    title:
                      "A(n) Property Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Property.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceTransferredVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Transferred.Verified} = 'No'",
                    title:
                      "A(n) Transferred Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Transferred.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceTransferredExcludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Transferred.ExcludedInError} = TRUE",
                    title:
                      "A(n) Transferred Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Transferred.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceTransferredIncludedInError_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_MC.Transferred.IncludedInError} = TRUE",
                    title:
                      "A(n) Transferred Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {ResourceMatrix_MC.Transferred.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BuyInMedicarePremium_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BuyInMedicarePremium_MC} = 'No'",
                    title:
                      "The Medicare premium paid by State Buy-In was not recorded correctly",
                    expression:
                      '"Reviewer Comment: "+{BuyInMedicarePremium_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$HealthInsuranceCorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{HealthInsuranceCorrect_MC} = 'No'",
                    title:
                      "The client's non-Medicaid insurance was not recorded correctly",
                    expression:
                      '"Reviewer Comment: "+{HealthInsuranceCorrect_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UnpaidMedicalBillsReviewed_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UnpaidMedicalBillsReviewed_MC} = 'Yes'",
                    title:
                      "Past, unpaid medicaid bills were not reviewed properly",
                    expression:
                      '"Reviewer Comment: "+{UnpaidMedicalBillsReviewed_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SSISSDIOverpayment_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SSISSDIOverpayment_MC} = 'No'",
                    title:
                      "The different gross and net SSI/SSDI was not processed correctly",
                    expression:
                      '"Reviewer Comment: "+{SSISSDIOverpayment_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherBudgetErrors_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherBudgetErrors_MC} = 'Yes'",
                    title: "The worker made other budget-related errors",
                    expression:
                      '"Reviewer Comment: "+{OtherBudgetErrors_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  }
                ],
                title: "Budget Findings:"
              },
              {
                type: "panel",
                name: "VerificationsFindings_Panel_MC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$SeparateMCChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{SeparateSNMCChecklists_MC} = 'No' AND {SeparateSNMCChecklists_Detail_MC} = 'MC'",
                    title: "A separate checklist was not issued for MC",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SeparateSNAPChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{SeparateSNMCChecklists_MC} = 'No' and {SeparateSNMCChecklists_Detail_MC} = 'SNAP and TANF'",
                    title: "A separate checklist was not issued for SNAP",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityNecessary_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Identity.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Identity was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityPingHub_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Identity.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Identity Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Identity.Checklist} = 'No'",
                    title:
                      "A(n) Identity Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Identity.Verified} = 'No'",
                    title:
                      "A(n) Identity Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeNecessary_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Income.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Income was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomePingHub_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Income.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Income Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Income.Checklist} = 'No'",
                    title:
                      "A(n) Income Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Income.Verified} = 'No'",
                    title:
                      "A(n) Income Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipNecessary_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Citizenship.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Citizenship was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipPingHub_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Citizenship.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Citizenship Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Citizenship.Checklist} = 'No'",
                    title:
                      "A(n) Citizenship Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Citizenship.Verified} = 'No'",
                    title:
                      "A(n) Citizenship Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterNecessary_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Shelter.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Shelter was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterPingHub_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Shelter.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Shelter Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Shelter.Checklist} = 'No'",
                    title:
                      "A(n) Shelter Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Shelter.Verified} = 'No'",
                    title:
                      "A(n) Shelter Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentNecessary_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Rent.Necessary} = 'No'",
                    title: "An unnecessary Verification for Rent was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentPingHub_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Rent.PingHub} = 'No'",
                    title: "The Hub was not pinged for a(n) Rent Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentChecklist_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Rent.Checklist} = 'No'",
                    title:
                      "A(n) Rent Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentVerified_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_MC.Rent.Verified} = 'No'",
                    title:
                      "A(n) Rent Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_MC} + " -- Reviewer Comment: "+ {RequestedVerifications_MC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FollowUp20Days_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FollowUp20Days_MC} = 'No'",
                    title:
                      "A second verification checklist (JFS 7220) was not issued properly",
                    expression:
                      '"Reviewer Comment: "+{FollowUp20Days_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$MCBenefitsDenied&WereNot_MC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{MCBenefitsDenied&WereNot_MC} = 'Yes'",
                    title:
                      "Benefits were approved despite a failure to provide verifications",
                    expression:
                      '"Reviewer Comment: "+{MCBenefitsDenied&WereNot_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UnaddressedAlertsIEVS_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UnaddressedAlertsIEVS_MC} = 'Yes'",
                    title:
                      "Relevant alerts or IEVS matches were left unaddressed",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$NecessaryVerificationsOmitted_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{AgencyRequestVerifications_MC} = 'NoIncorrect'",
                    title:
                      "No, some necessary verifications were not requested",
                    expression:
                      '"Reviewer Comment: "+{AgencyRequestVerifications_Comment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  }
                ],
                title: "Verifications Findings:"
              },
              {
                type: "panel",
                name: "MiscellaneousFindings_Panel_MC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$IsOutcomeCorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IsOutcomeCorrect_MC} = 'No'",
                    title: "The eligibility determination was incorrect",
                    expression:
                      '"Reviewer Comment: "+{OutcomeIncorrectComment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InitialBenefitIncorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{BenefitAmountCorrect_Matrix_MC.Initial.Correct} = 'No'",
                    title: "Initial Benefit Amount was Incorrect",
                    expression:
                      '"At Review: $"+{BenefitAmountCorrect_Matrix_MC.Initial.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_MC.Initial.CorrectedAmt} + " -- " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OngoingBenefitIncorrect_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{BenefitAmountCorrect_Matrix_MC.Ongoing.Correct} = 'No'",
                    title: "Ongoing Benefit Amount was Incorrect",
                    expression:
                      '"At Review: $"+{BenefitAmountCorrect_Matrix_MC.Ongoing.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_MC.Ongoing.CorrectedAmt} + " -- " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BenefitsinMITS_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BenefitsinMITS_MC} = 'No'",
                    title: "Benefits did not cross correctly into MITS",
                    expression: '"Review of: " + {DisplayVariable_MC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherErrors_MC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherErrors_MC} = 'Yes'",
                    title: "One or more other errors were made",
                    expression:
                      '"Reviewer Comment: "+{OtherErrorsComment_MC} + " -- "+"Review of: " + {DisplayVariable_MC}'
                  }
                ],
                title: "Journal Notes Findings:"
              }
            ],
            title: "MC Findings"
          },
          {
            type: "panel",
            name: "Findings_Panel_LTC",
            elements: [
              {
                type: "panel",
                name: "JournalNotesFindings_Panel_LTC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalNotes_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalNotes_LTC} = 'No'",
                    title: "No Journal Notes were kept",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalTemplate_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalTemplate_LTC} = 'No'",
                    title: "The Journal Note template was not used",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalAdequate_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalAdequate_LTC} = 'No'",
                    title: "The Journal Notes were inadequate",
                    expression:
                      '"Reviewer Comment: "+{JournalAdequate_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$JournalDescriptionSufficient_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{JournalDescriptionSufficient_LTC} = 'No'",
                    title: "The Journal Notes Description was not Sufficient",
                    expression:
                      '"Reviewer Comment: "+{JournalDescriptionSufficient_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FTIinJournalEntry_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FTIinJournalEntry_LTC} = 'Yes'",
                    title:
                      "There was Federal Tax Information in the Journal Notes",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  }
                ],
                title: "Journal Notes Findings:"
              },
              {
                type: "panel",
                name: "AuthorizationFindings_Panel_LTC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$AuthRepCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{AuthRepCorrect_LTC} = 'No'",
                    title:
                      "The Authorized Representative information was incorrect or missing",
                    expression:
                      '"Reviewer Comment: "+{AuthRepCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SignedApplicationAudiosignature_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SignedApplicationAudiosignature_LTC} = 'No'",
                    title:
                      "There is no signed application and/or audio signature",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IntakeCorrectAppDate_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IntakeCorrectAppDate_LTC} = 'No'",
                    title: "The application date was incorrect",
                    expression:
                      '"Reviewer Comment: "+{IntakeCorrectAppDate_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$CertPeriodCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{CertPeriodCorrect_LTC} = 'No'",
                    title: "The certification period was incorrect",
                    expression:
                      '"Reviewer Comment: "+{CertPeriodCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RecertBenefitsFromActionDate_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RecertBenefitsFromActionDate_LTC} = 'No '",
                    title:
                      "Benefits were not provided back to the recertification late-submission ",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BenefitsFromRecertReceipt_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BenefitsFromRecertReceipt_LTC} = 'No'",
                    title:
                      "Benefits were not provided back to the application for recertification date",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RuntoComeUpMonth_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RuntoComeUpMonth_LTC} = 'No'",
                    title: "The come-up month of benefits was not run",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$Approve45Days_Fault_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{Approve45Days_Fault_LTC} = 'Yes'",
                    title:
                      "Benefits were not approved timely due to worker error",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$DeniedTimely_Fault_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{DeniedTimely_Fault_LTC} = 'Yes'",
                    title:
                      "Benefits were not denied timely due to worker error",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$MedAidCodesCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{MedAidCodesCorrect_LTC} = 'No'",
                    title: "The Medicaid Aid Codes were incorrect",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  }
                ],
                title: "Authorization Findings:"
              },
              {
                type: "panel",
                name: "BudgetFindings_Panel_LTC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_LTC.Shelter.Verified} = 'No'",
                    title:
                      "A(n) Shelter Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Shelter.ExcludedInError} = TRUE",
                    title:
                      "A(n) Shelter Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseShelterIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Shelter.IncludedInError} = TRUE",
                    title:
                      "A(n) Shelter Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_LTC.Utilities.Verified} = 'No'",
                    title:
                      "A(n) Utilities Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Utilities.ExcludedInError} = TRUE",
                    title:
                      "A(n) Utilities Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseUtilitiesIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Utilities.IncludedInError} = TRUE",
                    title:
                      "A(n) Utilities Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Utilities.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_LTC.Medical.Verified} = 'No'",
                    title:
                      "A(n) Medical Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Medical.ExcludedInError} = TRUE",
                    title:
                      "A(n) Medical Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicalIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Medical.IncludedInError} = TRUE",
                    title:
                      "A(n) Medical Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Medical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_LTC.Medicare.Verified} = 'No'",
                    title:
                      "A(n) Medicare Premium was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Medicare.ExcludedInError} = TRUE",
                    title:
                      "A(n) Medicare Premium was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseMedicareIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Medicare.IncludedInError} = TRUE",
                    title:
                      "A(n) Medicare Premium was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Medicare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.RecurringMedical.Verified} = 'No'",
                    title:
                      "A(n) RecurringMedical Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.RecurringMedical.ExcludedInError} = TRUE",
                    title:
                      "A(n) RecurringMedical Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseRecurringMedicalIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.RecurringMedical.IncludedInError} = TRUE",
                    title:
                      "A(n) RecurringMedical Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.RecurringMedical.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.ChildSupport.Verified} = 'No'",
                    title:
                      "A(n) ChildSupport Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.ChildSupport.ExcludedInError} = TRUE",
                    title:
                      "A(n) ChildSupport Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildSupportIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.ChildSupport.IncludedInError} = TRUE",
                    title:
                      "A(n) ChildSupport Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ExpenseMatrix_LTC.Childcare.Verified} = 'No'",
                    title:
                      "A(n) Childcare Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Childcare.ExcludedInError} = TRUE",
                    title:
                      "A(n) Childcare Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseChildcareIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.Childcare.IncludedInError} = TRUE",
                    title:
                      "A(n) Childcare Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.Childcare.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.HealthInsurance.Verified} = 'No'",
                    title:
                      "A(n) HealthInsurance Expense was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.HealthInsurance.ExcludedInError} = TRUE",
                    title:
                      "A(n) HealthInsurance Expense was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ExpenseHealthInsuranceIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ExpenseMatrix_LTC.HealthInsurance.IncludedInError} = TRUE",
                    title:
                      "A(n) HealthInsurance Expense was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ExpenseMatrix_LTC.HealthInsurance.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_LTC.Earned.Verified} = 'No'",
                    title:
                      "A(n) Earned Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_LTC.Earned.ExcludedInError} = TRUE",
                    title:
                      "A(n) Earned Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeEarnedIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_LTC.Earned.IncludedInError} = TRUE",
                    title:
                      "A(n) Earned Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.Earned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_LTC.Unearned.Verified} = 'No'",
                    title:
                      "A(n) Unearned Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_LTC.Unearned.ExcludedInError} = TRUE",
                    title:
                      "A(n) Unearned Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeUnearnedIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_LTC.Unearned.IncludedInError} = TRUE",
                    title:
                      "A(n) Unearned Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.Unearned.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IncomeMatrix_LTC.SSISSDI.Verified} = 'No'",
                    title:
                      "A(n) SSISSDI Income was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_LTC.SSISSDI.ExcludedInError} = TRUE",
                    title:
                      "A(n) SSISSDI Income was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncomeSSISSDIIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncomeMatrix_LTC.SSISSDI.IncludedInError} = TRUE",
                    title:
                      "A(n) SSISSDI Income was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {IncomeMatrix_LTC.SSISSDI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceLiquidVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_LTC.Liquid.Verified} = 'No'",
                    title:
                      "A(n) Liquid Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Liquid.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceLiquidExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Liquid.ExcludedInError} = TRUE",
                    title:
                      "A(n) Liquid Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Liquid.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceLiquidIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Liquid.IncludedInError} = TRUE",
                    title:
                      "A(n) Liquid Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Liquid.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceVehicleVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_LTC.Vehicle.Verified} = 'No'",
                    title:
                      "A(n) Vehicle Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Vehicle.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceVehicleExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Vehicle.ExcludedInError} = TRUE",
                    title:
                      "A(n) Vehicle Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Vehicle.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceVehicleIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Vehicle.IncludedInError} = TRUE",
                    title:
                      "A(n) Vehicle Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Vehicle.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePersonalVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_LTC.Personal.Verified} = 'No'",
                    title:
                      "A(n) Personal Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Personal.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePersonalExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Personal.ExcludedInError} = TRUE",
                    title:
                      "A(n) Personal Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Personal.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePersonalIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Personal.IncludedInError} = TRUE",
                    title:
                      "A(n) Personal Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Personal.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePropertyVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceMatrix_LTC.Property.Verified} = 'No'",
                    title:
                      "A(n) Property Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Property.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePropertyExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Property.ExcludedInError} = TRUE",
                    title:
                      "A(n) Property Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Property.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourcePropertyIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Property.IncludedInError} = TRUE",
                    title:
                      "A(n) Property Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Property.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceTransferredVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Transferred.Verified} = 'No'",
                    title:
                      "A(n) Transferred Resource was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Transferred.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceTransferredExcludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Transferred.ExcludedInError} = TRUE",
                    title:
                      "A(n) Transferred Resource was excluded from the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Transferred.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceTransferredIncludedInError_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{ResourceMatrix_LTC.Transferred.IncludedInError} = TRUE",
                    title:
                      "A(n) Transferred Resource was included in the Budget in error",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {ResourceMatrix_LTC.Transferred.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RetroMedBenefits_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RetroMedBenefits_LTC} = 'No'",
                    title: "Retroactive Medicaid benefits were not explored",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BuyInMedicarePremium_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BuyInMedicarePremium_LTC} = 'No'",
                    title:
                      "The Medicare premium paid by State Buy-In was not recorded correctly",
                    expression:
                      '"Reviewer Comment: "+{BuyInMedicarePremium_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$HealthInsuranceCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{HealthInsuranceCorrect_LTC} = 'No'",
                    title:
                      "The client's non-Medicaid insurance was not recorded correctly",
                    expression:
                      '"Reviewer Comment: "+{HealthInsuranceCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UnpaidMedicalBillsReviewed_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UnpaidMedicalBillsReviewed_LTC} = 'Yes'",
                    title:
                      "Past, unpaid medicaid bills were not reviewed properly",
                    expression:
                      '"Reviewer Comment: "+{UnpaidMedicalBillsReviewed_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SSISSDIOverpayment_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SSISSDIOverpayment_LTC} = 'No'",
                    title:
                      "The different gross and net SSI/SSDI was not processed correctly",
                    expression:
                      '"Reviewer Comment: "+{SSISSDIOverpayment_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherBudgetErrors_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherBudgetErrors_LTC} = 'Yes'",
                    title: "The worker made other budget-related errors",
                    expression:
                      '"Reviewer Comment: "+{OtherBudgetErrors_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  }
                ],
                title: "Budget Findings:"
              },
              {
                type: "panel",
                name: "VerificationsFindings_Panel_LTC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityNecessary_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Identity.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Identity was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityPingHub_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Identity.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Identity Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityChecklist_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Identity.Checklist} = 'No'",
                    title:
                      "A(n) Identity Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIdentityVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Identity.Verified} = 'No'",
                    title:
                      "A(n) Identity Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Identity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeNecessary_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Income.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Income was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomePingHub_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Income.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Income Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeChecklist_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Income.Checklist} = 'No'",
                    title:
                      "A(n) Income Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationIncomeVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Income.Verified} = 'No'",
                    title:
                      "A(n) Income Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Income.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipNecessary_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Citizenship.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Citizenship was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipPingHub_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Citizenship.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Citizenship Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipChecklist_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Citizenship.Checklist} = 'No'",
                    title:
                      "A(n) Citizenship Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationCitizenshipVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Citizenship.Verified} = 'No'",
                    title:
                      "A(n) Citizenship Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Citizenship.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterNecessary_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Shelter.Necessary} = 'No'",
                    title:
                      "An unnecessary Verification for Shelter was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterPingHub_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Shelter.PingHub} = 'No'",
                    title:
                      "The Hub was not pinged for a(n) Shelter Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterChecklist_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Shelter.Checklist} = 'No'",
                    title:
                      "A(n) Shelter Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationShelterVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Shelter.Verified} = 'No'",
                    title:
                      "A(n) Shelter Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Shelter.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentNecessary_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Rent.Necessary} = 'No'",
                    title: "An unnecessary Verification for Rent was requested",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentPingHub_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Rent.PingHub} = 'No'",
                    title: "The Hub was not pinged for a(n) Rent Verification",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentChecklist_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Rent.Checklist} = 'No'",
                    title:
                      "A(n) Rent Verification was not included in a Checklist",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$VerificationRentVerified_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{RequestedVerifications_LTC.Rent.Verified} = 'No'",
                    title:
                      "A(n) Rent Verification was not verified before authorization",
                    expression:
                      '"Review of: " + {DisplayVariable_LTC} + " -- Reviewer Comment: "+ {RequestedVerifications_LTC.Rent.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SeparateMCChecklists_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{SeparateSNMCChecklists_LTC} = 'No' and {SeparateSNMCChecklists_Detail_LTC} = 'MC'",
                    title: "A separate checklist was not issued for MC",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SeparateSNTFChecklists_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{SeparateSNMCChecklists_LTC} = 'No' and {SeparateSNMCChecklists_Detail_LTC} = 'SNAP and TANF'",
                    title: "A separate checklist was not issued for SNAP/TANF",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$FollowUp20Days_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{FollowUp20Days_LTC} = 'No'",
                    title:
                      "A second verification checklist (JFS 7220) was not issued timely",
                    expression:
                      '"Reviewer Comment: "+{FollowUp20Days_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$MCBenefitsDenied&WereNot_LTC$Finding_NO_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{MCBenefitsDenied&WereNot_LTC} = 'Yes'",
                    title:
                      "Benefits were approved despite a failure to provide verifications",
                    expression:
                      '"Reviewer Comment: "+{MCBenefitsDenied&WereNot_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UnaddressedAlertsIEVS_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UnaddressedAlertsIEVS_LTC} = 'Yes'",
                    title:
                      "Relevant alerts or IEVS matches were left unaddressed",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  }
                ],
                title: "Verifications Findings:"
              },
              {
                type: "panel",
                name: "LongTermCarePolicyFindings_Panel_LTC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$MIAFNACorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{MIAFNACorrect_LTC} = 'No'",
                    title:
                      "The Monthly Income Allowance or Family Need Allowance was incorrectly calculated",
                    expression:
                      '"Reviewer Comment: "+{MIAFNACorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SpousalImprovementCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SpousalImprovementCorrect_LTC} = 'No'",
                    title:
                      "The spousal impoverishment was incorrectly calculated",
                    expression:
                      '"Reviewer Comment: "+{SpousalImprovementCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ImproperTransAccountedFor_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ImproperTransAccountedFor_LTC} = 'No'",
                    title: "Not all improper transfers were accounted for",
                    expression:
                      '"Reviewer Comment: "+{ImproperTransAccountedFor_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ImpropTranfScreenCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ImpropTranfScreenCorrect_LTC} = 'No'",
                    title: "The improper transfer screen was incorrect",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$ResourceAssessComplete_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{ResourceAssessComplete_LTC} = 'No'",
                    title: "The required resource assessment was not completed",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$SOCCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{SOCCorrect_LTC} = 'No'",
                    title: "The Share of Cost was incorrect",
                    expression:
                      '"Reviewer Comment: "+{SOCCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RestrictCoveragePeriodCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RestrictCoveragePeriodCorrect_LTC} = 'No'",
                    title:
                      "The restricted Medicaid coverage period was applied incorrectly",
                    expression:
                      '"Reviewer Comment: "+{RestrictCoveragePeriodCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$RestrictCoveragePeriodCorrect_NOA_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{RestrictCoveragePeriodCorrect_NOA_LTC} = 'No'",
                    title:
                      "A NOA was not issued to confirm dates of restricted coverage",
                    expression: '"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InstitutionalChildCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{InstitutionalChildCorrect_LTC} = 'No'",
                    title: "Institutional  children were not handled correctly",
                    expression:
                      '"Reviewer Comment: "+{InstitutionalChildCorrect_Comment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  }
                ],
                title: "Long Term Care Policy Findings:"
              },
              {
                type: "panel",
                name: "MiscellaneousFindings_Panel_LTC",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$IsOutcomeCorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{IsOutcomeCorrect_LTC} = 'No'",
                    title: "The eligibility determination was incorrect",
                    expression:
                      '"Reviewer Comment: "+{OutcomeIncorrectComment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$InitialBenefitIncorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{BenefitAmountCorrect_Matrix_LTC.Initial.Correct} = 'No'",
                    title: "Initial Benefit Amount was Incorrect",
                    expression:
                      '"At Review: $"+{BenefitAmountCorrect_Matrix_LTC.Initial.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_LTC.Initial.CorrectedAmt} + " -- " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OngoingBenefitIncorrect_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{BenefitAmountCorrect_Matrix_LTC.Ongoing.Correct} = 'No'",
                    title: "Ongoing Benefit Amount was Incorrect",
                    expression:
                      '"At Review: $"+{BenefitAmountCorrect_Matrix_LTC.Ongoing.AtReview} + " --  Correct Amount: $" + {BenefitAmountCorrect_Matrix_LTC.Ongoing.CorrectedAmt} + " -- " + {DisplayVariable_LTC}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$BenefitsinMITS_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{BenefitsinMITS_LTC} = 'No'",
                    title: "Benefits did not cross correctly into MITS"
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$OtherErrors_LTC$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{OtherErrors_LTC} = 'Yes'",
                    title: "One or more other errors were made",
                    expression:
                      '"Reviewer Comment: "+{OtherErrorsComment_LTC} + " -- "+"Review of: " + {DisplayVariable_LTC}'
                  }
                ],
                title: "Miscellaneous Findings:"
              }
            ],
            title: "LTC Findings"
          },
          {
            type: "panel",
            name: "Findings_Panel_UETarget",
            elements: [
              {
                type: "panel",
                name: "IncomeChart_panel_UETarget",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$UnemploymentUEexcludedInError_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.Unemployment.UEexcludederror_UETarget} = 'True'",
                    title: "The Unemployment income was excluded in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.Unemployment.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.Unemployment.UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.Unemployment.UEincludederror_UETarget} = 'True'",
                    title: "The Unemployment income was included in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.Unemployment.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.Workers'Compensation.UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.Workers'Compensation.UEincludederror_UETarget} = 'True'",
                    title:
                      "The Workers' Compensation income was included in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.Workers\'Compensation.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.Workers'Compensation.UEexcludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.Workers'Compensation.UEexcludederror_UETarget} = 'True'",
                    title:
                      "The Workers' Compensation income was excluded in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.Workers\'Compensation.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.SSI.UEexcludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.SSI.UEexcludederror_UETarget} = 'True'",
                    title: "The SSI income was excluded in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.SSI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.SSI.UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.SSI.UEincludederror_UETarget} = 'True'",
                    title: "The SSI income was included in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.SSI.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.SocialSecurity.UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.SocialSecurity.UEincludederror_UETarget} = 'True'",
                    title: "The Social Security income was included in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.SocialSecurity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.SocialSecurity.UEexcludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.Social Security.UEexcludederror_UETarget} = 'True'",
                    title: "The Social Security income was excluded in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.SocialSecurity.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.ChildSupport.UEexcludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.ChildSupport.UEexcludederror_UETarget} = 'True'",
                    title: "The child support income was excluded in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.ChildSupport.Comment}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$IncometypeMatrix_UETarget.ChildSupport.UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf:
                      "{IncometypeMatrix_UETarget.ChildSupport.UEincludederror_UETarget} = 'True'",
                    title: "The child support income was included in error. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.ChildSupport.Comment}'
                  }
                ],
                title: "Income type and verification section."
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Retirement PensionsAnnuities.UEexcludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.RetirementPensions&Annuities.UEexcludederror_UETarget} = 'True'",
                title: "The Retirement income was excluded in error. ",
                expression:
                  '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.RetirementPensions&Annuities.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Retirement PensionsAnnuities.UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.RetirementPensions&Annuities.UEincludederror_UETarget} = 'True'",
                title: "The Retirement income was included in error. ",
                expression:
                  '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.RetirementPensions&Annuities.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Other:Explainbelow..UEexcludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.OtherExplainbelow..UEexcludederror_UETarget} = 'True'",
                title: "The other income was excluded in error.",
                expression:
                  '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.OtherExplainbelow.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Other:Explainbelow..UEincludederror_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.OtherExplainbelow..UEincludederror_UETarget} = 'True'",
                title: "The other income was included in error.",
                expression:
                  '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {IncometypeMatrix_UETarget.OtherExplainbelow.Comment}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Unemployment.IncomeVerified_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.Unemployment.IncomeVerified_UETarget} = 'No'",
                title: "The Unemployment income was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "expression",
                name:
                  "$Finding$ IncometypeMatrix_UETarget.Workers'Compensation.IncomeVerified_UETarget $Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.Workers'Compensation.IncomeVerified_UETarget} = 'No'",
                title: "The Workers' Compensation was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.ssi.IncomeVerified_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.SSI.IncomeVerified_UETarget} = 'No'",
                title: "The SSI income was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.socialsecurity.IncomeVerified_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.SocialSecurity.IncomeVerified_UETarget} = 'No'",
                title: "The Social Security income was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Child Support.IncomeVerified_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.ChildSupport.IncomeVerified_UETarget} = 'No'",
                title: "The child support income was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.RetirementPensions&Annuities.IncomeVerified_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.RetirementPensions&Annuities.IncomeVerified_UETarget} = 'No'",
                title: "The retirement income was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "expression",
                name:
                  "$Finding$IncometypeMatrix_UETarget.Other:Explainbelow..IncomeVerified_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                visibleIf:
                  "{IncometypeMatrix_UETarget.OtherExplainbelow..IncomeVerified_UETarget} = 'No'",
                title: "The other income was not verified. ",
                expression: '"Review of: " + {DisplayVariable_UETarget}'
              },
              {
                type: "panel",
                name: "UETargetMiscUEQuestions_Panel_UETarget",
                elements: [
                  {
                    type: "expression",
                    name:
                      "$Finding$UEIncCalc_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UEIncCalc_UETarget} = 'No'",
                    title: "The income calculation was completed incorrectly. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {UEIncCalc_Comment_UETarget}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UEAllInfoActedOn_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UEAllInfoActedOn_UETarget} = 'No'",
                    title:
                      "All information provided to the agency was not acted on. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {UEAllInfoActedOn_comment_UETarget}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UECorrectType_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UECorrectType_UETarget} = 'No'",
                    title:
                      "The unearned income type was not recorded correctly. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {CorrectUEType_Comment_UETarget}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UEGrossNetDif_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UEGrossNetDif_UETarget} = 'No'",
                    title:
                      "The net amount was not used even thought the SSI/SSD payment was reduced due to overpayment from the same source. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {UEGrossNetDif__comment_UETarget}'
                  },
                  {
                    type: "expression",
                    name:
                      "$Finding$UEIVESWRKD_UETarget$Finding_CORRECTION_REQUIRED$review$3",
                    visibleIf: "{UEIVESWRKD_UETarget} = 'No'",
                    title: "Not all relevant IVES alerts were worked. ",
                    expression:
                      '"Review of: " + {DisplayVariable_UETarget} + " -- Reviewer Comment: "+ {UEIVESWRKD_Comment_UETarget}'
                  }
                ],
                title: "Miscellaneous Findings"
              }
            ],
            title: "Unearned Income Target Review Findings: "
          }
        ],
        title: "Summary Page",
        description: "Final Comments and Summary of Findings"
      }
    ],
    calculatedValues: [
      {
        name: "DisplayVariable_SNAP",
        expression:
          "{ReviewDetails.SNAP.Status} +' '+{ReviewDetails.SNAP.ReviewType} + ' on Case ' +{ReviewDetails.SNAP.CaseNumber} + ' SNAP Block ' +{ReviewDetails.SNAP.Block}"
      },
      {
        name: "DisplayVariable_SNAPET",
        expression:
          " {ReviewDetails.SNAPET.Status} +' Intake on Case ' +{ReviewDetails.SNAPET.CaseNumber} + ' SNAPET Block ' +{ReviewDetails.SNAPET.Block"
      },
      {
        name: "DisplayVariable_TANF",
        expression:
          "{ReviewDetails.TANF.Status} +' '+{ReviewDetails.TANF.ReviewType} + ' on Case ' +{ReviewDetails.TANF.CaseNumber} + ' TANF Block ' +{ReviewDetails.TANF.Block}"
      },
      {
        name: "DisplayVariable_OWF",
        expression:
          "{ReviewDetails.OWF.Status} +' Intake on Case ' +{ReviewDetails.OWF.CaseNumber} + ' TANF WA Block ' +{ReviewDetails.OWF.Block}"
      },
      {
        name: "DisplayVariable_MC",
        expression:
          "{ReviewDetails.MC.Status} +' '+{ReviewDetails.MC.ReviewType} + ' on Case ' +{ReviewDetails.MC.CaseNumber} + ' MC Block ' +{ReviewDetails.MC.Block}"
      },
      {
        name: "DisplayVariable_LTC",
        expression:
          "{ReviewDetails.LTC.Status} +' '+{ReviewDetails.LTC.ReviewType} + ' on Case ' +{ReviewDetails.LTC.CaseNumber} + ' LTC MC Block ' +{ReviewDetails.LTC.Block}"
      },
      {
        name: "DisplayVariable_ UETarget",
        expression:
          "{ReviewDetails.UETarget.Status} +' '+{ReviewDetails.UETarget.ReviewType} + ' on Case ' +{ReviewDetails.UETarget.CaseNumber} + ' Unearned Income Target Review Block ' +{ReviewDetails.UETarget.Block}"
      }
    ],
    showNavigationButtons: "both",
    showQuestionNumbers: "off",
    clearInvisibleValues: "onHidden",
    checkErrorsMode: "onValueChanged"
  };

  //creator.JSON = json;
  window.creator = creator;
  // ko.applyBindings({ creator: creator });
  creator.render("surveyCreator");

  var json3 = {
    pages: [
      {
        name: "page1",
        title: "page1 -- title",
        description: "page1 -- description",
        elements: [
          {
            type: "text",
            name: "question11"
          },
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)"
          },
          {
            type: "checkbox",
            name: "promoter_features",
            visibleIf: "{nps_score} >= 9",
            title: "What features do you value the most?",
            isRequired: true,
            validators: [
              {
                type: "answercount",
                text: "Please select two features maximum.",
                maxCount: 2
              }
            ],
            hasOther: true,
            choices: [
              "Performance",
              "Stability",
              "User Interface",
              "Complete Functionality"
            ],
            otherText: "Other feature:",
            colCount: 2
          },
          {
            type: "comment",
            name: "passive_experience",
            visibleIf: "{nps_score} > 6  and {nps_score} < 9",
            title: "What is the primary reason for your score?"
          },
          {
            type: "comment",
            name: "disappointed_experience",
            visibleIf: "{nps_score} notempty",
            title:
              "What do you miss and what was disappointing in your experience with us?"
          },
          {
            type: "checkbox",
            name: "question4",
            choices: ["item1", "item2", "item3"]
          },
          {
            type: "dropdown",
            name: "question5",
            choices: ["item1", "item2", "item3"]
          },
          {
            type: "rating",
            name: "question6"
          }
        ]
      }
    ]
  };
  var counter = 0;
  function setJSON() {
    window.creator.JSON = counter % 2 == 0 ? json : json3;
    counter++;
  }
  window.creator.JSON = json3;
  creator.toolbarItems.push(new Survey.Action({
    id: "toolboxCustomization",
    visible: true,
    title: "Toolbox Customization",
    enabled: true,
    action: function () {
      alert("Hi!");
    }
  }));
  // creator.toolbox.changeCategories([
  //     {
  //         name: "panel",
  //         category: "Panels"
  //     }, {
  //         name: "paneldynamic",
  //         category: "Panels"
  //     }, {
  //         name: "matrix",
  //         category: "Matrix"
  //     }, {
  //         name: "matrixdropdown",
  //         category: "Matrix"
  //     }, {
  //         name: "matrixdynamic",
  //         category: "Matrix"
  //     }
  // ]);  
  // creator.toolbox.isCompact = false;
}
