import { useState, useEffect } from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase-config';
import Navbar from '../components/Navbar';;

function Login() {

  useEffect(() => {
      document.title = 'Login - ShowOff';
  }, [] );

  return (
    <div>
      <Navbar />
      Hello from Login
    </div>
  )
}

export default Login;