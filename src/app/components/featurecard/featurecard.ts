import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featurecard',
  imports: [],
  templateUrl: './featurecard.html',
  styleUrl: './featurecard.css'
})
export class Featurecard {
  @Input() title:string=''
  @Input() subtitle:string=''
  @Input() image:string=''
}
