import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { getSavedNotes, rerenderNotes, SaveNotes } from "./notes-functions";

//DOM - Document Object Model.
let notes = getSavedNotes();

//empty array
const inputToFilter = {
  textToFilter: "",
  sortBy: "byEditing",
};

// initiale rerender
rerenderNotes(notes, inputToFilter); //this call appears all notes coz you undifind the filtering by what .. because he put in include method ; noting ,so it will return true by the same notes Array.

//event to search input
document.querySelector("#search-notes").addEventListener("input", (e) => {
  inputToFilter.textToFilter = e.target.value;
  rerenderNotes(notes, inputToFilter);
});

//create note
document.querySelector("#creat-note").addEventListener("click", (e) => {
  const timestamps = moment().valueOf();
  const id = uuidv4();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamps,
    updatedAt: timestamps,
  });
  SaveNotes(notes);
  location.assign(`/edit.html#${id}`);
});

//sorting notes

document.querySelector("#sort").addEventListener("change", (e) => {
  inputToFilter.sortBy = e.target.value;
  rerenderNotes(notes, inputToFilter);
});

//Syncing Data Across pages
window.addEventListener("storage", (e) => {
  if (e.key === "note") {
    notes = JSON.parse(e.newValue);
    rerenderNotes(notes, inputToFilter);
  }
});
