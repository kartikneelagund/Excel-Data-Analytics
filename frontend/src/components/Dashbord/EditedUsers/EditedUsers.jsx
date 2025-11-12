import { useState, useEffect } from "react";
import axios from "axios";
import { iconsImgs } from "../utils/images";

import "./EditedUsers.css"; // You can reuse this CSS for styling

const EditedUsers = () => {
  const [editedUsers, setEditedUsers] = useState(0);

  useEffect(() => {
    fetchEditedUsers();
  }, []);

  const fetchEditedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/userscrud");

      // Filter users with 'status' === 'edited'
      const edited = res.data.filter(user => user.status === "edited");

      setEditedUsers(edited.length);
    } catch (error) {
      console.error("Error fetching edited users:", error);
    }
  };

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
       
      </div>

      <div className="grid-box1">
        <img src={iconsImgs.usersavatar} alt="icon" />
        <span className="lg-value">
          Edited Users<br /><br />{editedUsers}
        </span>
      </div>
    </div>
  );
};

export default EditedUsers;
