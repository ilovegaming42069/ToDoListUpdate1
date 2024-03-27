import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase/firebase-config'; // Update this path as needed
import '../App.css'; // Assuming the CSS is stored here


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Adjust as needed for your app
    } catch (error) {
      console.error("Error signing in with email and password", error);
      setError('Failed to log in');
    }
  };

  
  // Navigate to the Register Page
  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        {error && <p className="error">{error}</p>}
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      <button type="submit" className="form-button">Login</button>
      <button type="button" onClick={navigateToRegister} className="form-button">Need an account? Register</button>
      </form>
    </div>
  );
}

export default LoginPage;
