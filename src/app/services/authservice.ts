import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';

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

  authService(email:string,password:string):any {
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      const user = userCredential.user.email;
      this.router.navigateByUrl('/app/userhome');
    }).catch((error)=>{
      console.log(error);
      alert("Invalid User");
    })
  }
}
