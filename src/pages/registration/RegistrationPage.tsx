import React, { useState } from "react";
import axios from "axios";

export function AuthPage() {
  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  async function saveUser() {
    await axios.post("http://localhost:3001/create-user", {
      user: {
        firstName: newUserFirstName,
        lastName: newUserLastName,
        email: newUserEmail,
        password: newUserPassword,
      },
    });
  }

  return (
    <div>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-title">Registration</span>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <span className="form-label">First Name</span>
              <input
                type="text"
                id="first-name"
                className="form-control"
                value={newUserFirstName}
                onChange={(e) => setNewUserFirstName(e.target.value)}
              />
            </div>
            <div className="row border-top">
              <span className="form-label">Last Name</span>
              <input
                type="text"
                id="last-name"
                className="form-control"
                value={newUserLastName}
                onChange={(e) => setNewUserLastName(e.target.value)}
              />
            </div>
            <div className="row border-top">
              <span className="form-label">Email Address</span>
              <input
                type="text"
                id="registration-email"
                className="form-control"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="row border-top">
              <span className="form-label">Password</span>
              <input
                type="password"
                id="registration-password"
                className="form-control"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={saveUser}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
