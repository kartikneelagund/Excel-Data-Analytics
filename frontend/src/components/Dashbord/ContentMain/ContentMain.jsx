import "./ContentMain.css";


import EditedUsers from "../EditedUsers/EditedUsers";
import UnEditedUsers from "../UnEditedUsers/UnEditedUsers";
import Charts from "../Charts/Charts";
import Users from "../Users/UserList";
import DeletedUsers from "../DeletedUsers/DeletedUsers";
import AI_Insights from "../AI_Insights/AI_Insights";
// import Help from "../Help/Help";
import TotalUsers from "../TotalUsers/TotalUsers";

const ContentMain = () => {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <TotalUsers />
            <EditedUsers />
            <UnEditedUsers />
            <DeletedUsers/>
        </div>
        <div className="content-grid-two">
            <Charts />
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Users />
               
              </div>
            </div>

            <div className="grid-two-item">
              <div className="subgrid-two">
                <AI_Insights />
               
              </div>
            </div>
        </div>
    </div>
  )
}

export default ContentMain
