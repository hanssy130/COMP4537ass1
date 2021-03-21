const express = require("express");
const app = express();
app.use("/static", express.static("public"));
const mysql = require("mysql");
const { join } = require("path");
const path = require("path");
const port = 8000;
const bodyparser = require("body-parser");
const url = require("url");

app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = mysql.createConnection({
    host: "localhost",
    user: "nutnutte_root",
    password: "rootroot",
    database: "nutnutte_question",
    port: 3306,
    multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Connected");
});

app.get("/COMP4537/ass1/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/COMP4537/ass1/admin", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/admin.html"));
});

app.get("/COMP4537/ass1/student", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/student.html"));
});

app.post("/COMP4537/ass1/questions", (req, res) => {
  let q = url.parse(req.url, true);
  // get choices
  let choiceList = '';
  for (let i = 1; i < 5; i++) {
    let thisChoice = "q" + i;
    choiceList += ("'" + q.query[thisChoice] + "', ");
  }
  console.log(choiceList);

  // get answer
  let correctAnswer = q.query['correctAnswer'];

  let sql =
    "INSERT INTO QUESTION (question, ans1, ans2, ans3, ans4, correctAnswer) value ('" + q.query['question'] + "'," + choiceList + correctAnswer + ")";
  db.query(sql, (err) => {
    if (err) throw err;
    console.log("1 record");
  });
});

app.get("/COMP4537/ass1/questions", (req, res) => {

  sql = "SELECT * FROM QUESTION";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    let jsonObj = JSON.stringify(results);
    res.end(jsonObj);
  });
});

app.put("/COMP4537/ass1/questions", (req, res) => {
  let q = url.parse(req.url, true);
  // get choices
  let choiceList = '';
  for (let i = 1; i < 5; i++) {
    let thisChoice = "q" + i;
    choiceList += ("'" + q.query[thisChoice] + "', ");
  }
  console.log(choiceList);

  // get answer
  let correctAnswer = q.query['correctAnswer'];

  console.log(choiceList);

  let qarray = [];
  for (let i = 1; i < 5; i++) {
    let thisChoice = "q" + i;
    qarray[i] = q.query[thisChoice];
  }
  qarray[5] = q.query["question"];

  console.log("---Updating database: ---");
  console.log(q.query);
  console.log("---Updated question: ---");
  console.log(q.query["question"]);

  let sql =
    "UPDATE QUESTION SET ans1 = '" + qarray[1] + "', ans2 = '" + qarray[2] + "', ans3 = '" + qarray[3] + "', ans4 = '" + qarray[4] + "', question = '" + q.query["question"] + "', correctAnswer = '" + q.query["correctAnswer"] + "' WHERE id = '" + q.query["id"] + "'";
  db.query(sql, (err) => {
    if (err) {
        console.log("---there was AN ERROR!---")
        throw err;
    }
    console.log("1 record");
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
