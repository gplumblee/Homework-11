const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

/*  • The following HTML routes should be created:
    • GET `/notes` - Should return the `notes.html` file.
    • GET `*` - Should return the `index.html` file */

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

/*  • The application should have a `db.json` file on the backend that 
      will be used to store and retrieve notes using the `fs` module.
    • The following API routes should be created:
      1. GET `/api/notes` - Should read the `db.json` file and 
         return all saved notes as JSON. */

app.get("/api/notes", function(req, res) {
  let dbInfo;
  res.fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) { console.log("error"); } 
    else {
      dbInfo = data
    }
  });
  
});

/*    2. POST `/api/notes` - Should recieve a new note to save 
         on the request body, add it to the `db.json` file, 
         and then return the new note to the client. */

app.post("/api/notes", function(req, res) {
  
  let dbInfo;
  fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) { console.log("error"); } 
    else {
     data = JSON.parse(data);
     data.push("TODO")
     console.log(data)
      
    }

  })

//   fs.writeFileSync("./db/db.json", JSON.stringify(req.body), function(err) {
//     if (err) throw err;
//   });
});

/*    3. DELETE `/api/notes/:id` - Should recieve a query paramter 
         containing the id of a note to delete. This means you'll need to 
         find a way to give each note a unique `id` when it's saved. 
         In order to delete a note, you'll need to read all notes 
         from the `db.json` file, remove the note with the given `id` property, 
         and then rewrite the notes to the `db.json` file. */

app.post("/api/clear", function(req, res) {
  tableData.length = 0;
  waitListData.length = 0;

  res.json({ ok: true });
});
