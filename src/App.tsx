import styles from "./App.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import NoteList from "./components/NoteList/NoteList";
import NoteItem from "./components/NoteItem/NoteItem";
import { addNote, clearNotes, useAppDispatch, useAppSelector } from "./store";

function App() {
  const noteInput = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState("");
  const titleInput = useRef<HTMLInputElement>(null);
  const notes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch(() => setError("Something went wrong"));
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (noteInput.current != null && noteInput.current.value !== "") {
      dispatch(addNote(noteInput.current.value ));
      noteInput.current.value = "";
    }
  }

  function handleSubmitTitle(event: FormEvent) {
    event.preventDefault();
    if (titleInput.current != null && titleInput.current.value !== "") {
      setTitle(titleInput.current.value);
      titleInput.current.value = "";
    }
  }

  if (error) {
    return <p className={styles.error_info}>Error: {error} </p>;
  }

  if (!user) {
    return <p className={styles.loading_info}>Loading...</p>;
  }

  return (
    <div className={styles.app}>
      <p className={styles.user_info}>
        UserName: <b>{user.name}</b>
      </p>
      <h1>Your notesList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userNote"
          placeholder="Enter note"
          ref={noteInput}
        />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleSubmitTitle}>
        <input
          type="text"
          name="notesTitle"
          placeholder="Enter title"
          ref={titleInput}
        />
        <button type="submit">Change title</button>
      </form>
      <NoteList title={title}>
        {notes.length === 0 ? (
          <p className={styles.notes_wrap}>There are no notes</p>
        ) : (
          notes.map((note, index) => (
            <NoteItem
              note={note}
              key={index}
            />
          ))
        )}
      </NoteList>
      {
        notes.length !== 0 && 
        <button className={styles.clearBtn} onClick={() => dispatch(clearNotes())}>Delete notes</button>
      }
    </div>
  );
}

export default App;
