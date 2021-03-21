const xhttp = new XMLHttpRequest();
let data;
function setAttributeHelper(element, attr) {
  // sets multiple attributes
  // element: an element
  // attr: {"attribute": "value"}
  for (var key in attr) {
    element.setAttribute(key, attr[key]);
  }
}

function checkAnswer() {
  let studentSelection = [];
  let correctAnswers = [];

  console.log(data);

  for (let i = 0; i < data.length; i++) {
    question = data[i];
    correctAnswers.push(parseInt(question.correctAnswer));
  }

  for (let i = 1; i <= data.length; i++) {
    for (let j = 1; j < 5; j++) {
      if (document.getElementById("radio_id" + i + "x" + j).checked === true) {
        studentSelection.push(j);
      }
    }
  }

  if (studentSelection.length !== data.length) {
    alert("ANSWER ALL THE QUESTIONS!!!!");
    return;
  }

  let num_correct = 0;
  for (let i = 0; i < data.length; i++) {
    console.log(data.length);
    correctTextArea = document.getElementById("answer_id" + (i + 1) + "x" + correctAnswers[i]);
    console.log(typeof correctTextArea);
    correctTextArea.classList.add("correctAnswer");
    if (studentSelection[i] === correctAnswers[i]) {
      num_correct += 1;
    } else {
      studentSelectionTextArea = document.getElementById(
        "answer_id" + (i + 1) + "x" + studentSelection[i]
      );
      studentSelectionTextArea.classList.add("wrongAnswer");
    }
  }

  alert("Quiz mark: " + num_correct + "/" + data.length);
}

function generateQuestions(question, num) {
  let quiz = document.getElementById("quiz");
  let questionTitle = document.createElement("h2");
  let questionText = document.createElement("div");

  questionTitle.innerHTML = "Question " + num + ": " + question.question;
  quiz.appendChild(questionTitle);
  quiz.appendChild(questionText);

  // create and add radio + answer box
  for (let i = 1; i < 5; i++) {
    let radio_name = "radio" + num;
    let radio_id = "radio_id" + num + "x" + i;
    const radio_button = document.createElement("input");
    setAttributeHelper(radio_button, {
      type: "radio",
      name: radio_name,
      id: radio_id,
    });

    let answer_id = "answer_id" + num + "x" + i;
    const answer_text = document.createElement("span");
    setAttributeHelper(answer_text, { type: "text", id: answer_id });
    answer_text.innerHTML = question["ans" + i];

    quiz.appendChild(document.createElement("br"));
    quiz.appendChild(radio_button);
    quiz.appendChild(answer_text);
  }

}

function adminQuestions() {
  xhttp.open("GET", "/COMP4537/ass1/questions", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    console.log("xhttp ready");
    console.log(this.responseText);
    if (this.readyState == 4 && this.status == 200) {
      jsonObj = JSON.parse(this.responseText);
      if (jsonObj === null) {
        alert("There is no quiz available.");
      } else {
        data = jsonObj;
        console.log(data);
        for (i = 0; i < jsonObj.length; i++) {
          question = jsonObj[i];
          generateQuestions(question, i + 1);
        }
      }
    }
  };
}

adminQuestions();
