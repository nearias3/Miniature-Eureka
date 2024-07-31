const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API Routes
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) throw err;
        res.json(newNote);
      }
    );
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Received DELETE request for note ID: ${id}`); // Debug log

  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading notes:", err);
      res.status(500).json({ error: "Failed to read notes" });
      return;
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== id);
    console.log(
      `Remaining notes after deletion: ${JSON.stringify(notes, null, 2)}`
    ); // Debug log

    fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) {
          console.error("Error deleting note:", err);
          res.status(500).json({ error: "Failed to delete note" });
          return;
        }
        console.log("Successfully deleted note"); // Debug log
        res.json({ ok: true });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
