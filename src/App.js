import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";

function App() {
  const [notes, setNotes] = useState([
    {
      text: "Dummy data",
      date: "15/04/2021",
      id: nanoid(),
    },
    {
      text: "can filter through notes",
      date: "1/05/2021",
      id: nanoid(),
    },
    {
      text: "Remember to go shopping",
      date: "1/04/2091",
      id: nanoid(),
    },
  ]);
  const [searchText, setSearchText] = useState("");

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString(),
      id: nanoid(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  // this retrives the data and displays the data
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
    } // checks if saved notes has data
  }, []);

  useEffect(() => {
    // have to give it a key inside the setItem which is a string which will be used to retive the notes late
    // the second parameter that you pass into the item is the data you want to save
    // good practise to stringy data before yous ave data
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container">
      <Search handleSearchNote={(text) => setSearchText(text.toLowerCase())} />
      <NotesList
        notes={notes.filter((note) =>
          note.text.toLowerCase().includes(searchText)
        )}
        handleDeleteNote={deleteNote}
        handleAddNote={addNote}
      />
    </div>
  );
}

export default App;
