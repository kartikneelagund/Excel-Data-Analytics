import { useEffect, useState } from 'react';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation(); 
  // const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <span className="info-name">Excel Analytics</span>
      </div>
      <nav className="navigation">
          <div className="nav-list">
            {navigationLinks.map((navigationLink) => (
                <div className="nav-item" key = { navigationLink.id }>
                  <Link to={navigationLink.path} className={`nav-link ${location.pathname === navigationLink.path ? 'active' : ''}`}>
                    <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                    <span className="nav-link-text">{navigationLink.title}</span>
                  </Link>
                </div>
              ))}
          </div>
      </nav>
    </div>
  )
}

export default Sidebar
