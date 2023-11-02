import React, { useState, useEffect } from "react";
import "./App.css";
import Notegroup from "./Component/Notegroup/Notegroup";
import Notes from "./Component/Notes/Notes";

function App() {
  const loadNotesFromLocalStorage = () => {
    const data = localStorage.getItem("notesAppData");
    return data
      ? JSON.parse(data)
      : { groups: [], selectedGroup: null, selectedColor: "red" };
  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("notesAppData", JSON.stringify(data));
  };

  const initialData = loadNotesFromLocalStorage();

  const [groups, setGroups] = useState(initialData.groups);
  const [selectedGroup, setSelectedGroup] = useState(initialData.selectedGroup);
  const [selectedColor, setSelectedColor] = useState(initialData.selectedColor);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 700);

  const createGroup = (groupName, color) => {
    const newGroup = {
      name: groupName,
      color: color,
      notes: [],
      created: new Date().toISOString(),
      lastUpdated: null,
    };
    setGroups([...groups, newGroup]);
    setSelectedGroup(groupName);
    setSelectedColor(color);
  };

  const handleGroupClick = (groupName) => {
    setSelectedGroup(groupName);

    const updatedGroups = groups.map((group) => {
      if (group.name === groupName) {
        return {
          ...group,
          lastUpdated: new Date().toISOString(),
        };
      }
      return group;
    });

    setGroups(updatedGroups);
  };

  const handleBackClick = () => {
    setSelectedGroup(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const newData = { groups, selectedGroup, selectedColor };
    saveDataToLocalStorage(newData);
  }, [groups, selectedGroup, selectedColor]);

  return (
    <div style={{ overflowX: "hidden" }} className="App">
      <div className="box">
        {isMobileView ? (
          selectedGroup ? (
            <div className="notes">
              <Notes
                groups={groups}
                selectedGroup={selectedGroup}
                selectedColor={selectedColor}
                updateNotes={(updatedNotes) => setGroups(updatedNotes)}
                handleBackClick={handleBackClick}
              />
            </div>
          ) : (
            <div className="notegroup">
              <Notegroup
                createGroup={createGroup}
                groups={groups}
                selectedColor={selectedColor}
                setSelectedGroup={handleGroupClick}
                setSelectedColor={setSelectedColor}
                updateGroups={setGroups}
              />
            </div>
          )
        ) : (
          <>
            <div className="notegroup">
              <Notegroup
                createGroup={createGroup}
                groups={groups}
                selectedColor={selectedColor}
                setSelectedGroup={handleGroupClick}
                setSelectedColor={setSelectedColor}
                updateGroups={setGroups}
              />
            </div>
            <div className="notes">
              <Notes
                groups={groups}
                selectedGroup={selectedGroup}
                selectedColor={selectedColor}
                updateNotes={(updatedNotes) => setGroups(updatedNotes)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
