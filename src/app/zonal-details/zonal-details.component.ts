import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-zonal-details',
  templateUrl: './zonal-details.component.html',
  styleUrls: ['./zonal-details.component.css']
})
export class ZonalDetailsComponent implements OnInit  {

  selectedMenuItem!: string;
  @Input() statePlanId: any;
  


  onMenuItemSelected(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }
  clkEve:boolean=false;
  clkFunc(event : any)
  {
   
    this.clkEve=event;
    console.log("",event);
    
  }
  
  statePlanIdNew:any;
  
  ngOnInit() {
  


    
  }
 
  


  
}
