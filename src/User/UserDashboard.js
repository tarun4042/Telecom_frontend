import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './Styling_Components/UserDashboard.css';
import Services from './Services';

const UserDashboard = () => {
  const navigate = useNavigate();

  // Handle logout and redirect to the home page
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth tokens, etc.)
    
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="user-dashboard">
      <header className="user-dashboard-navbar">
        <nav>
          <ul className="dashboard-nav-links">
            {/* Remove the Services link */}
            <li>
            <NavLink 
                to="/user" 
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Services
              </NavLink>
            </li>
            <li>
            <NavLink 
                to="pending-requests-status" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Request Status
              </NavLink>
            </li>
            <li>
            <NavLink 
                to="subscribed-services" 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                My Services
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Directly render the Services component */}
       
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
