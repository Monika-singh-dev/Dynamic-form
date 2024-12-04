import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { userContext } from "../store/userContext";
import "./Editinfo.css"
const Editinfo = () => {
  const { state } = useLocation();
  const { editUser, index } = state;
  const { users, setUsers } = React.useContext(userContext);
  const [name, setName] = useState(editUser.name);
  const [email, setEmail] = useState(editUser.email);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(editUser.name); 
    setEmail(editUser.email);
  }, [editUser]);

  const handleSubmit = () => {
    // Update the user data
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], name, email };
    setUsers(updatedUsers);

    // Show success message
    setSuccessMessage("Changes successful✔️");
    setTimeout(() => {
      setSuccessMessage(""); // Clear message after 3 seconds
      navigate("/"); // Redirect to home after saving changes
    }, 1000);
  };

  return (
    <div className="edit-section">
      {/* Success Message */}
      {successMessage && (
        <Typography variant="h6" color="green" sx={{ mb: 2 }}>
          {successMessage}
        </Typography>
      )}

      <Typography variant="h4" gutterBottom className="edit-section-heading">
        Edit User Info :
      </Typography>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
    
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
             
            sx={{ mb: 2 }}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mr: 2 }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/home")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default Editinfo;
