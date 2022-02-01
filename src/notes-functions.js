import moment from "moment";
//get saved notes
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("note");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

//save notes
const SaveNotes = (notes) => {
  localStorage.setItem("note", JSON.stringify(notes));
};

//remove item(note)
const removeNote = (id, notes) => {
  const noteIndex = notes.findIndex((item) => item.id === id);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
  }
};

//generate notes DOM

const generateNotes = (item) => {
  const wrapper = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  //setup link to editpage
  wrapper.setAttribute("href", `/edit.html#${item.id}`);
  wrapper.classList.add("list-item");

  //setup note title text
  item.title.length > 0
    ? (textEl.textContent = item.title)
    : (textEl.textContent = "Unnamed note");
  textEl.classList.add("list-item__title");
  wrapper.appendChild(textEl);

  //setup statusEl
  statusEl.textContent = editNoteHistory(item.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  wrapper.appendChild(statusEl);

  return wrapper;
};

//sort notes by any of three ways
const sortBy = (notes, sortBy) => {
  if (sortBy === "byEditing") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      }
    });
  } else if (sortBy === "byRecentlyCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      }
    });
  } else if (sortBy === "alphabetically") {
    return notes.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

//rerender notes-app
const rerenderNotes = (notes, inputToFilter) => {
  const notesEl = document.querySelector("#notes");
  notes = sortBy(notes, inputToFilter.sortBy);
  const resultArray = notes.filter((note) =>
    note.title.toLowerCase().includes(inputToFilter.textToFilter.toLowerCase())
  );

  notesEl.innerHTML = "";
  if (resultArray.length > 0) {
    resultArray.forEach((item) => {
      const wrapper = generateNotes(item);
      notesEl.appendChild(wrapper);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

//Generate lastEdited text
const editNoteHistory = (lastEdited) =>
  `last edited ${moment(lastEdited).fromNow()}`;

export { getSavedNotes, SaveNotes, removeNote, editNoteHistory, rerenderNotes };
