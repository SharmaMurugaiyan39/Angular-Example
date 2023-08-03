import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../app.service';
export interface GridPlan {
  gridPlanId: number;
  gridPlanCode: string;
  gridPlanMonth: string;
  gridPlanYear: number;
  createdBy: string;
  createdDate: string;
  status: string;
  openGrid: number;
  noofArticle: number;
  stateCode: string;
}
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})

export class LeftMenuComponent implements OnInit {


  @Input() statePlanId: any;


  @Output() tabClick: any = new EventEmitter()
  tableData: any[] = [];
  gridPlans: any[] = [];
  gridPlansNew: any = [];

  newId: number | undefined;
  isActive = false;
  activeIndex: number | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  selectnewItem(item: string,i : number)
  {

  }


  ngOnInit(): void {

    let name:any="";
    this.route.paramMap.subscribe(params => {
      name=params.get("id");
      this.fetchTableData(params.get("id"));
    
      const index =0;
       this.activeIndex = index;
       //this.apiService.changeContent(item);

       console.log(this.statePlanId, "statePlanId",this.gridPlansNew," select menu items");
    
    })    
 
  }

  selectMenuItem(item: string,i : number) {

    if(item==='')
    {
    
      console.log("null point");
    }
    else
    {
      console.log("not null",item,"j",i)
    }
    console.log(item,"iteee");
    const index = this.gridPlans.findIndex((person) => person.gridPlanId === parseInt(item));

  
    console.log(this.statePlanId, "statePlanId",item," select menu items");
    this.activeIndex = index;
    this.apiService.changeContent(item);
    let data = true;
    this.tabClick.emit(data);

  }


  isLoading: boolean = true;

  myNewList:any;
  fetchTableData(number: any) {

    this.apiService.getTableData(number).subscribe(
      (data) => {
        this.gridPlans = data.body;
        console.log(this.gridPlans)
        this.myNewList=this.gridPlans[0];
       this.gridPlansNew=data.body;
       this.activeIndex = 0;
       this.apiService.changeContent(this.gridPlans[0].gridPlanId);
        let data1 = true;
        this.tabClick.emit(data1);
               this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  
    console.log("sdsdsdddddddddddddd",this.gridPlansNew)
    return this.gridPlans;

  }


}
