import React, { useState, useEffect, useRef } from "react";
import "./Notegroup.css";

function Notegroup({
  createGroup,
  groups,
  selectedColor,
  setSelectedColor,
  setSelectedGroup,
  selectedGroup,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [groupName, setGroupName] = useState("");
  const popupRef = useRef(null);

  const handleCreateGroup = () => {
    createGroup(groupName, selectedColor);

    setIsCreating(false);
    setGroupName("");
  };

  const handleClickOutsidePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidePopup);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, []);

  return (
    <div className={`pocket-notes ${isCreating ? "light-background" : ""}`}>
      <h2 className="pocket-txt">Pocket Notes</h2>
      <button className="pocket-btn" onClick={() => setIsCreating(true)}>
        <pre>+ Create Notes Group</pre>
      </button>
      {isCreating && (
        <div
          className={`popup ${isCreating ? "light-background" : ""}`}
          ref={popupRef}
        >
          <h2>Create New Notes Group</h2> <br />
          <div className="flex">
            <label>Group Name</label>
            <input
              className="pop-input"
              type="text"
              placeholder="Enter your group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <br />
          <div className="color-options">
            <label>Choose Color </label>
            <div className="color-palette">
              {[
                "#B38BFA",
                "#FF79F2",
                "#43E6FC",
                "#F19576",
                "#0047FF",
                "#6691FF",
              ].map((color) => (
                <div
                  key={color}
                  className={`color-circle ${color}`}
                  style={{
                    backgroundColor: color,
                    border:
                      selectedColor === color ? "2px solid white" : "none",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          <br />
          <button className="pop-btn" onClick={handleCreateGroup}>
            Create
          </button>
        </div>
      )}
      {groups.map((group, index) => (
        <div
          key={index}
          className={`group-wrapper ${
            selectedGroup === group.name ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedGroup(group.name);
            setSelectedColor(group.color);
          }}
        >
          <div
            className={`group-dp ${group.color}`}
            style={{ backgroundColor: group.color }}
          >
            {/* {group.name.charAt(0).toUpperCase()} */}
            {group.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="grp-name">{group.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Notegroup;
