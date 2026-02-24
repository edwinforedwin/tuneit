import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth,sendPasswordResetEmail,signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkIvOanSvHj8bobBltvzb6F7od-suRIRc",
  authDomain: "tuneitapp-ed6b6.firebaseapp.com",
  projectId: "tuneitapp-ed6b6",
  storageBucket: "tuneitapp-ed6b6.firebasestorage.app",
  messagingSenderId: "837236966162",
  appId: "1:837236966162:web:e56febb9753777999529cb",
  measurementId: "G-3767NQWZ9X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  constructor(private router:Router){};

  async authLogin(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.router.navigateByUrl('/app/userhome');
      return null;
    } catch (error) {
      return 'Invalid username or password';
    }
  }
  async authSentEmail(email: string): Promise<string | null> {
    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (error) {
      return "User doesn't exist";
    }
  }
}
