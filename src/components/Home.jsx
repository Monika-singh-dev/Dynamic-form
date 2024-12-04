import React, { useContext, useState } from "react";
import { userContext } from "../store/userContext";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"
// import Table from "./Table";
import {
  Button,
  Typography,
} from "@mui/material";

const Home = () => {
  const { users, setUsers } = useContext(userContext);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();

  const handleEdit = (index) => {
    navigate(`/edit-info`, { state: { editUser: users[index], index } });
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    setSuccessMessage("Entry deleted successfully✔️");
    setTimeout(() => {
      setSuccessMessage(""); // Clear message after 3 seconds
    }, 3000);
  };

  return (
    <div className="home-container">
      {/* Success Message */}
      {successMessage && (
        <Typography variant="h6" color="green" sx={{ mb: 2 }}>
          {successMessage}
        </Typography>
      )}
      {/* Users Table */}
      <h2 class="title">Submitted Data:</h2>
      {users.length > 0 && (
        <div class="table-container">
          <div>
            <table class="data-table">
              <thead>
                <tr class="header-row">
                  {/*  Replace formFields.map logic with actual table headers */}
                  <th class="header-cell">Name</th>
                  <th class="header-cell">Email</th>
                  <th class="header-cell">Country</th>
                  <th class="header-cell">Payment Method</th>
                  <th class="header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Replace submittedData.map logic with actual table rows --> */}
                {users.map((user, index) => (
                <tr class="data-row" key={index}>
                  <td class="data-cell">{user.name}</td>
                  <td class="data-cell">{user.email}</td>
                  <td class="data-cell">{user.country}</td>
                  <td class="data-cell">{user.paymentMethod}</td>
                  <td class="data-cell">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(index)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {users.length === 0? <p class="no-data">No data submitted yet.</p>: ""}
      
      <Link to="/">
        <button className="btn">Add User</button>
      </Link>
    </div>
  );
};

export default Home;
