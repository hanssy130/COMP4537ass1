const xhttp = new XMLHttpRequest();

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", myFunction);

function myFunction() {
    let question = document.getElementById("question").value;
    let q1 = document.getElementById("question1").value;
    let q2 = document.getElementById("question2").value;
    let q3 = document.getElementById("question3").value;
    let q4 = document.getElementById("question4").value;

    console.log(question.indexOf("'"));
    console.log(q1.indexOf("'"));
    console.log(q2.indexOf("'"));
    console.log(q3.indexOf("'"));
    console.log(q4.indexOf("'"));

    console.log(typeof q4.indexOf("'"));
    // || q1.index.indexOf("'") > -1 || q2.indexOf("'") > -1 || q3.indexOf("'") > -1 || q4.indexOf("'") > -1
    if (question.indexOf("'") > -1 || q1.indexOf("'") > -1 || q2.indexOf("'") > -1 || q3.indexOf("'") > -1 || q4.indexOf("'") > -1) {
        alert("Please remove quotation ( ' )");
        return false;
    }

    if (!(document.getElementById("correctAns1").checked || document.getElementById("correctAns2").checked || document.getElementById("correctAns3").checked || document.getElementById("correctAns4").checked)) {
        alert("Please select an answer.");
        return false;
    }

    let correctAnswer;
    for (let i = 1; i < 5; i++) {
        let thisRadio = "correctAns" + i;
        if (document.getElementById(thisRadio).checked === true) {
            correctAnswer = i;
        }
    }

    xhttp.open("POST", "/COMP4537/ass1/questions/?question=" + question + "&correctAnswer=" + correctAnswer
        + "&q1=" + q1 + "&q2=" + q2 + "&q3=" + q3 + "&q4=" + q4)
    xhttp.send();
    location.reload();
}

let data;
function setAttributeHelper(element, attr) {
    // sets multiple attributes
    // element: an element
    // attr: {"attribute": "value"}
    for (var key in attr) {
        element.setAttribute(key, attr[key]);
    }
}

function generateQuestions(question, num, ans) {
    let questionArea = document.getElementById("currentQuestions");
    let questionNumber = document.createElement("h4");
    let questionText = document.createElement("input");
    let responseList = document.createElement("div");
    let update = document.createElement("input");
    let exist = [];
    let br = document.createElement("br");


    questionNumber.classList.add("question-number");
    questionNumber.innerHTML = "Question " + num;

    questionText.classList.add("question-text", "textArea");
    questionText.setAttribute("type", "text");
    questionText.setAttribute("value", question.question);

    let answersHeader = document.createElement("h4");
    answersHeader.innerHTML = "Answers: ";

    // list of answers
    for (let i = 1; i < 5; i++) {
        let name = "radio" + num;
        let id = "radio_id" + num + "x" + i;
        let radioButton = document.createElement("input");
        setAttributeHelper(radioButton, {
            type: "radio",
            name: name,
            id: id,
        });

        if (i == ans) {
            radioButton.checked = true;
        }

        const answerText = document.createElement("input");
        answerText.setAttribute("type", "text");
        answerText.id = num + "-" + i + "ans";
        answerText.setAttribute("value", question["ans" + i]);
        responseList.appendChild(radioButton);
        responseList.appendChild(answerText);
        exist[i] = answerText;
        exist[i + 4] = radioButton;
    }

    update.setAttribute("value", "Update");
    update.type = "button";

    update.onclick = function () { // Note this is a function
        let radio_answer = "";
        for (i = 1; i < 5; i++) {
            if (exist[i + 4].checked == true) {
                radio_answer = i;
            }
        }

        console.log("questionTExt value:" + questionText.value);
        if (questionText.value.indexOf("'") > -1 || exist[1].value.indexOf("'") > -1 || exist[2].value.indexOf("'") > -1 || exist[3].value.indexOf("'") > -1 || exist[4].value.indexOf("'") > -1) {
            alert("Remove the quotation ( ' )");
            return false;
        }

        xhttp.open("PUT", "/COMP4537/ass1/questions/?question=" + questionText.value + "&correctAnswer=" + radio_answer
            + "&q1=" + exist[1].value + "&q2=" + exist[2].value + "&q3=" + exist[3].value + "&q4=" + exist[4].value + "&id=" + num)
        xhttp.send();
        location.reload();
    };

    questionArea.appendChild(questionNumber);
    questionArea.appendChild(questionText);
    questionArea.append(answersHeader);
    questionArea.append(responseList);
    questionArea.appendChild(br.cloneNode(true));
    questionArea.appendChild(update);
    questionArea.appendChild(br.cloneNode(true));
    questionArea.appendChild(br.cloneNode(true));
}

function adminQuestions() {
    xhttp.open("GET", "/COMP4537/ass1/questions", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);

            let correctAnswers = [];
            for (let i = 0; i < data.length; i++) {
                question = data[i];
                correctAnswers.push(question.correctAnswer);
            }

            for (i = 0; i < data.length; i++) {
                question = data[i];
                generateQuestions(question, i + 1, correctAnswers[i]);
            }
        }
    };
}

adminQuestions();
