import { Component } from '@angular/core';
import { Topbar } from "../../components/topbar/topbar";
import { Footbar } from "../../components/footbar/footbar";
import { Featurecard } from "../../components/featurecard/featurecard";

@Component({
  selector: 'app-home',
  imports: [Topbar, Footbar, Featurecard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
