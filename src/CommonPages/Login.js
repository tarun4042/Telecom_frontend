import React, { useState } from 'react';
import axios from 'axios';
import './Styling_Components/Login.css';
import { useNavigate } from 'react-router-dom';
 
const Login = ({ setIsUser }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);
 
    try {
const response = await axios.post('http://localhost:8082/login', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
 
      if (response.status === 200) {
const roleResponse = await axios.get('http://localhost:8082/checkLoggedInUser', {
          withCredentials: true,
        });
 
        // Extract role from response
        const userRole = roleResponse.data.userRole;
        console.log('User Role:', userRole);
 
 
        // Set admin status and navigate accordingly
        if (userRole === 'ROLE_ADMIN') {
          setIsUser(false);
          localStorage.setItem('isAdmin', 'true'); // Adjust as needed
          navigate('/admin'); // Redirect to admin page
        } else if (userRole === 'ROLE_USER') {
          setIsUser(true);
          localStorage.setItem('isUser', 'true');
          navigate('/user'); // Redirect to user dashboard
        } else {
          navigate('/home'); // Default or fallback page
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password');
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };
 
  return (
    <div className='back'> 
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};
 
export default Login;

