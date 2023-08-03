import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  selectedMenuItem!: string;


  onMenuItemSelected(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }
  clkEve:boolean=false;
  clkFunc(event : any)
  {

    this.clkEve=event;
    console.log("",event);
    
  }
}
