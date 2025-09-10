import { Component, Inject } from '@angular/core';
import { Footbar } from "../../components/footbar/footbar";
import { Authservice } from '../../services/authservice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Footbar,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private router:Router,private authService:Authservice){};

  email:string='';
  password:string='';

  login(email:string,password:string){
    this.authService.authService(email,password)
  }
}
