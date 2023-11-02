import React, { useState } from "react";
import "./Notes.css";

function Notes({
  groups,
  selectedGroup,
  selectedColor,
  updateNotes,
  handleBackClick,
}) {
  const [newNote, setNewNote] = useState("");

  const handleNoteSubmit = () => {
    if (newNote.trim() !== "") {
      const updatedGroups = groups.map((group) => {
        if (group.name === selectedGroup) {
          const newNoteObject = {
            text: newNote,
            date: new Date().toLocaleString(),
          };
          group.notes.push(newNoteObject);
        }
        return group;
      });

      updateNotes(updatedGroups);
      setNewNote("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleNoteSubmit();
    }
  };

  return (
    <div className="notes-bg">
      {selectedGroup ? (
        <div>
          <div
            className={`group-dp group-notes-dp ${selectedColor}`}
            style={{ backgroundColor: selectedColor }}
          >
            <div className="group-display">
              {selectedGroup.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <h1 className="grp-txt">{selectedGroup}</h1>
          {handleBackClick && (
            <button className="back-button" onClick={handleBackClick}>
              <img src="/vector1.png" alt="" />
            </button>
          )}
          <div className="input-bg">
            <textarea
              className="notes-input"
              placeholder="Enter your notes here"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button className="note-submit" onClick={handleNoteSubmit}>
            <img src="/vector.png" alt="" />
          </button>
          <div className="comp-notes">
            {groups.map((group) => {
              if (group.name === selectedGroup) {
                return group.notes.map((note, index) => (
                  <div className="notes-sec" key={index}>
                    <p className="note-metadata">
                      Last Updated:<br></br> {note.date}
                    </p>
                    <p className="note-write">{note.text}</p>
                  </div>
                ));
              }
              return null;
            })}
          </div>
        </div>
      ) : (
        <div>
          <img className="note-bg" src="/bg.png" alt="Background" />
          <h1 className="note-txt">Pocket Notes</h1>
          <p className="notes-p">
            Send and receive messages without keeping your phone online. <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <footer>End-to-end encrypted</footer>
        </div>
      )}
    </div>
  );
}

export default Notes;
