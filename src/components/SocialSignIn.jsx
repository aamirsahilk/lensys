import React, {useState, useEffect} from 'react'
import { GoogleAuthProvider,FacebookAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config";
import api from '@/api/api';

const SocialSignIn = () => {
    

  return (
    <div>
        <button type="button" onClick={loginGoogle}>Google Sign In</button>
    </div>
  )
}

export default SocialSignIn