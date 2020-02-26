const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let noteArray = [
  {
    noteTitle: "",
    noteText: ""
  }
];

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8");
  res.json(noteArray);
});

app.post("/api/notes", function(req, res) {
  fs.writeFileSync("./db/db.json", JSON.stringify(req.body), function(err) {
    if (err) throw err;
  });
  noteArray.push(req.body);
});

app.post("/api/clear", function(req, res) {
  tableData.length = 0;
  waitListData.length = 0;

  res.json({ ok: true });
});
