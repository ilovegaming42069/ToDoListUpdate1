import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../firebase/firebase-config';
import { doc, setDoc } from 'firebase/firestore';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile picture to Firebase Storage and update user profile
      if (profilePic) {
        const profilePicRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(profilePicRef, profilePic);
        const photoURL = await getDownloadURL(profilePicRef);

        await updateProfile(user, {
          displayName: username,
          photoURL: photoURL,
        });
      } else {
        await updateProfile(user, {
          displayName: username,
        });
      }

      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        photoURL: user.photoURL || '',
      });

      console.log("Registration successful");

      // Redirect to TodoList app after successful registration
      navigate('/todolist');
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePic(file);
    } else {
      alert('Please select a valid image file.');
      e.target.value = null;
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="form-input"
        />
        <button type="submit" className="form-button">Register</button>
        <button className="form-button" onClick={() => navigate('/login')}>Back to Login</button>
      </form>
    </div>
  );
}

export default RegisterPage;

