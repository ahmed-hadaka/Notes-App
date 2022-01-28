import moment from "moment";
import {
  getSavedNotes,
  editNoteHistory,
  removeNote,
  SaveNotes,
} from "./notes-functions";

const noteTitle = document.querySelector("#note-title");
const noteText = document.querySelector("#note-text");
const removeButton = document.querySelector("#remove-note");
const editHistory = document.querySelector("#lastEdited");

const noteId = location.hash.substring(1); //get id for the comming note
let notes = getSavedNotes(); //get the array here

// target the spacific note
let note = notes.find((item) => item.id === noteId);

if (!note) {
  location.assign("/index.html");
}

// get note details into edit page
noteTitle.value = note.title;
noteText.value = note.body;

//Generate lastedited text
editHistory.textContent = editNoteHistory(note.updatedAt);

//event to input note title
noteTitle.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  editHistory.textContent = editNoteHistory(note.updatedAt);
  SaveNotes(notes);
});

//event to input note body
noteText.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  editHistory.textContent = editNoteHistory(note.updatedAt);
  SaveNotes(notes);
});

//event to remove note button
removeButton.addEventListener("click", () => {
  removeNote(noteId, notes);
  SaveNotes(notes);
  location.assign("/index.html");
});

//Syncing Data Across pages
window.addEventListener("storage", (e) => {
  if (e.key === "note") {
    notes = JSON.parse(e.newValue);

    //get the note Object itself
    note = notes.find((item) => item.id === noteId);

    if (!note) {
      location.assign("/index.html");
    }
    noteTitle.value = note.title;
    noteText.value = note.body;
    editHistory.textContent = editNoteHistory(note.updatedAt);
  }
});
