import { useState, useEffect } from "react";
import { Typography, Box, IconButton, Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppStore } from './AppStore/appStore';

export default function EditUser({ fid, closeEvent }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const setRows = useAppStore((state) => state.setRows);

  // Load user data into form
  useEffect(() => {
    if (fid) {
      setFirstName(fid.firstName || "");
      setLastName(fid.lastName || "");
      setEmail(fid.email || "");
    }
  }, [fid]);

  // Submit updated data
  const updateUser = async () => {
    if (!firstName || !lastName || !email) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/userscrud/${fid.id}`, {
        firstName,
        lastName,
        email,
        date: new Date().toLocaleDateString() + ' : ' + new Date().toLocaleTimeString({
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        }),
      });

      await fetchUsers(); // Refresh UI list
      closeEvent(); // Close modal
      Swal.fire("Success!", "User updated successfully.", "success");
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  // Refresh user list from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/userscrud");
      setRows(res.data.map((u) => ({
        id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        date: u.date,
      })));
    } catch (err) {
      console.error("Get Users Error:", err);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">Edit User</Typography>

      <IconButton onClick={closeEvent} sx={{ position: "absolute", top: 0, right: 0 }}>
        <CloseIcon />
      </IconButton>

      <Box height={20} />

      <Grid item xs={12}>
        <TextField
          label="First Name"
          fullWidth
          variant="outlined"
          size="small"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <br />

      <Grid item xs={12}>
        <TextField
          label="Last Name"
          fullWidth
          variant="outlined"
          size="small"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>
      <br />

      <Grid item xs={12}>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <br />

      <Grid item xs={12} textAlign="center">
        <Button variant="contained" onClick={updateUser}>
          Submit
        </Button>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
