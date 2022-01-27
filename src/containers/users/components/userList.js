import React from "react";
import "./userList.scss";

function UserList() {
  const getdColors = (type) => {
    switch (type) {
      case "root":
        return { backgroundColor: "rgb(238, 238, 238)", color: "black" };
      case "UI/CLI":
        return { backgroundColor: "rgb(251, 189, 113)", color: "#f7f7f7" };
      case "Application":
        return { backgroundColor: "#5ca6a0", color: "#f7f7f7" };
      default:
        return "#f7f7f7";
    }
  };
  return (
    <React.Fragment>
      <div className="list-item-container">
        <div className="list-item header">
          <p>User name</p>
          <p className="type">Type</p>
          <p>Actions</p>
        </div>
        <div className="list-item item">
          <p>root</p>
          <p>
            <label className="button" style={getdColors("root")}>
              root
            </label>
          </p>
        </div>
        <div className="list-item item">
          <p>goergie</p>
          <p>
            <label className="button" style={getdColors("UI/CLI")}>
              UI/CLI
            </label>
          </p>
          <p>Actions</p>
        </div>
        <div className="list-item item">
          <p>abraham</p>
          <p>
            <label className="button" style={getdColors("Application")}>
              Application
            </label>
          </p>
          <p>Actions</p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default UserList;
