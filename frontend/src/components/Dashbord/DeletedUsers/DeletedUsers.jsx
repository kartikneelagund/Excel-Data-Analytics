import { useState, useEffect } from "react";
import { iconsImgs } from "../utils/images";
import "./DeletedUsers.css";

const DeletedUsers = () => {
  const [deletedUsers, setDeletedUsers] = useState(0);

  useEffect(() => {
    fetchDeletedUsers();
  }, []);

  const fetchDeletedUsers = () => {
    const deletedIds = JSON.parse(localStorage.getItem("deletedUserIds") || "[]");
    setDeletedUsers(deletedIds.length);
  };

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
       
      </div>
      <div className="grid-box1">
        <img src={iconsImgs.deleteduser} alt="icon" />
        <span className="lg-value">
          Deleted Users<br /><br />{deletedUsers}
        </span>
      </div>
    </div>
  );
};

export default DeletedUsers;
