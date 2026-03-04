import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth,sendPasswordResetEmail,signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: '${process.env.FIREBASE_API_KEY}',
  authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
  projectId: '${process.env.FIREBASE_PROJECT_ID}',
  storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
  messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${process.env.FIREBASE_APP_ID}',
  measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  private router = inject(Router);

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
