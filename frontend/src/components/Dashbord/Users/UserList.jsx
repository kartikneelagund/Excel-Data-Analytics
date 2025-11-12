import { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import { iconsImgs } from "../utils/images";
import EditUser from "./EditUser";
import { useAppStore } from "./AppStore/appStore";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


import "./User.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formid, setFormid] = useState(null);
  const [editopen, setEditOpen] = useState(false);
  const [userRole, setUserRole] = useState("user"); // default role = user

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  const location = useLocation();
  const navigate = useNavigate();

  // Decode JWT to get user role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role || "user");
      } catch (err) {
        console.error("Invalid token:", err);
        setUserRole("user");
      }
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  // Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get("https://excel-data-analytics-backend.vercel.app/api/userscrud");
      const activeUsers = res.data.filter((u) => u.status !== "deleted");
      setRows(
        activeUsers.map((u) => ({
          id: u._id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          date: u.date || "N/A",
        }))
      );
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Delete user (admin only)
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://excel-data-analytics-backend.vercel.app/api/userscrud/${id}`);
      Swal.fire("Deleted!", "User has been permanently deleted.", "success");

      const deletedIds = JSON.parse(localStorage.getItem("deletedUserIds") || "[]");
      deletedIds.push(id);
      localStorage.setItem("deletedUserIds", JSON.stringify(deletedIds));

      getUsers();
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Could not delete user.", "error");
    }
  };

  const filterData = (v) => {
    if (v) setRows([v]);
    else getUsers();
  };

  const editData = (user) => {
    setFormid(user);
    handleEditOpen();
  };

  return (
    <div className="grid-two-item grid-common grid-c5">
      <div className="grid-c-top text-silver-v5">
        <h2 className="lg-value">Users</h2>
        {location.pathname !== "/users" && (
          <button className="grid-c-title-icon" onClick={() => navigate("/users")}>
            <img src={iconsImgs.plus} alt="Add" />
          </button>
        )}
      </div>

      <div className="grid-c5-content bg-jet">
        <Modal open={editopen} onClose={handleEditClose}>
          <Box sx={modalStyle}>
            {formid && <EditUser fid={formid} closeEvent={handleEditClose} />}
          </Box>
        </Modal>

        <Paper className="paper" sx={{ width: "100%", overflow: "hidden" }}>
          <Divider />
          <Box height={10} />

          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              className="Searchbar"
              disablePortal
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(option) =>
                `${option.firstName || ""} ${option.lastName || ""}`
              }
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Users" />
              )}
            />
          </Stack>

          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date</TableCell>
                  {/* Show “Action” column only for admin */}
                  {userRole === "admin" && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {new Date(row.date).toLocaleDateString("en-GB") +
                          " : " +
                          new Date(row.date).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                      </TableCell>

                      {/*  Only admin sees edit/delete buttons */}
                      {userRole === "admin" && (
                        <TableCell>
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              sx={{ fontSize: 20, color: "blue", cursor: "pointer" }}
                              onClick={() => editData(row)}
                            />
                            <DeleteIcon
                              sx={{ fontSize: 20, color: "darkred", cursor: "pointer" }}
                              onClick={() => deleteUser(row.id)}
                            />
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 20, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Paper>
      </div>
    </div>
  );
}
