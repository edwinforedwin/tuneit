import { Component } from '@angular/core';
import { Topbar } from "../../components/topbar/topbar";
import { Footbar } from "../../components/footbar/footbar";

@Component({
  selector: 'app-home',
  imports: [Topbar, Footbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
