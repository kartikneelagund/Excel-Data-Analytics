import "./Users_page.css";
import ContentTop from '../../ContentTop/ContentTop';
import UserList from "../../Users/UserList"


const History_page = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <UserList/>
    </div>
  )
}

export default History_page