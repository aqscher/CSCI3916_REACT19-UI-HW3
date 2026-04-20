import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import { Nav } from 'react-bootstrap';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login');

  // Retrieve Redux state values
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  // Switch tabs when user selects a tab
  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-container">
      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect} className="mb-3 dark-tabs justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="register">Register</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === 'register' ? <Register /> : <Login />}
    </div>
  );
};

export default Authentication;