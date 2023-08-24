import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi aplicación Angular';
  public header_color:string;

  constructor(){
    this.header_color = GLOBAL.header_color;
  }

}
