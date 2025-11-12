import { useState, useEffect } from "react";
import axios from "axios";
import { iconsImgs } from "../utils/images";

import "./UnEditedUsers.css"; // You can reuse or copy the existing EditedUsers.css

const UnEditedUsers = () => {
  const [unEditedUsers, setUnEditedUsers] = useState(0);

  useEffect(() => {
    fetchUnEditedUsers();
  }, []);

  const fetchUnEditedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/userscrud");

      // Filter users that are NOT marked as edited
      const unedited = res.data.filter(
        user => !user.status || user.status !== "edited"
      );

      setUnEditedUsers(unedited.length);
    } catch (error) {
      console.error("Error fetching unedited users:", error);
    }
  };

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
        {/* <p>Unedited Users</p> */}
      </div>

      <div className="grid-box1">
        <img src={iconsImgs.users} alt="icon" />
        <span className="lg-value">
          Unedited Users<br /><br />{unEditedUsers}
        </span>
      </div>
    </div>
  );
};

export default UnEditedUsers;
