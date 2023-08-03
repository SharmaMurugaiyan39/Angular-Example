import { GridPlan } from './../left-menu/left-menu.component';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../app.service';
import { ToastrService } from 'ngx-toastr'; // Import ngx-toastr service

declare var bootstrap: any;
@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.css'],
})

export class RightContentComponent implements OnInit {
  
  tableData: any[] = [];

  newType: any;
  isDivHiddenRunning = true;
  isDivHiddenNew = true;
  isNew :boolean = false;


  buttonClick(index: number, item: any) {
    console.log(index, "item", item);

  }

  openModelAsmCalculation(item : any,i:number): void {
    this.showTableData=item;
    console.log(this.showTableData,"show Table")
    const myModal = document.getElementById('myModalLabelAsm');
    const modal = new bootstrap.Modal(myModal);
    console.log(item,"",i,"","ASN")
    modal.show();
  }
  openModelRsmCalculation(item : any,i:number): void {
    const myModal = document.getElementById('myModalLabelRsm');
    const modal = new bootstrap.Modal(myModal);
    console.log(item,"",i,"","RSM")
    modal.show();
  }
  
  successModel()
  {
    const myModal = document.getElementById('successModel');
    const modal = new bootstrap.Modal(myModal);
    modal.show();
  }

  Qty:any;
  
  Newindex :any;

  openModelZonalCalculation(item : any,i:number,value : any):void {
    const myModal = document.getElementById('myModalLabelZonal');
    this.showTableData=item;
    console.log(this.showTableData);
    this.tableData[i].apZonalQty=value;
    for(let j=0;j<this.tableData[i].apZonalQtyList.length;j++)
    {
      if(j==this.tableData[i].apZonalQtyList.length-1)
      {
      this.tableData[i].apZonalQtyList[j].qty=value;
      }
      else{
        this.tableData[i].apZonalQtyList[j].qty=value;
      }
    }
    const modal = new bootstrap.Modal(myModal);
    

    this.Newindex=i;
    modal.show(item);
  }
  
  getCalculationZonal(event:any,gridplanId : any)
  {
    const inputValue = event.target.value;
    console.log(inputValue,388783434,this.Newindex);
    
    
    let i=this.Newindex;
    this.tableData[i].apZonalQty=inputValue;
    for(let j=0;j<this.tableData[i].apZonalQtyList.length;j++)
     {
       if(j==this.tableData[i].apZonalQtyList.length-1)
       {
       this.tableData[i].apZonalQtyList[j].qty=inputValue;
       }
       else{
         this.tableData[i].apZonalQtyList[j].qty=inputValue;
       }
     }
  }

  
  
  onSavedZonalQtyCalculation()
  {
    let i=this.Newindex;
  }
  showTableData:any =[];
  formSubmitted: boolean = false;
  successMessage: string = 'Form submitted successfully!';
  isLoading: boolean = true;
  showDiv: boolean = false;
  tapClickEnableRunning(type: String, selectedItem: any) {

    this.tableData=[];
    this.tap.forEach(button => (button.isActive = false));
    selectedItem.isActive = true;

   

    this.newType = selectedItem.label;

    let flag=false;

    this.apiService.currentContent.subscribe((content) => {
      let id = content;
      this.apiService.getNewDataFromTableId(parseInt(id), this.newType).subscribe(
        (data) => {
          this.tableData = data.body;
          this.isNew = true;
          flag=true;
          this.isLoading = false;
          
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        }
      );
    });

    let length = this.tableData.length;
    if (length === 0) {
      this.showDiv = false;
    }
    else { 
      this.showDiv = true;
    }
    
    this.isDivHiddenRunning = !this.isDivHiddenRunning;
  }
  tapClickEnableNew(type: String) {

    this.apiService.currentContent.subscribe((content) => {
      let id = content;
      this.apiService.getNewDataFromTableId(parseInt(id), "new").subscribe(
        (data) => {
          this.tableData = [];
          this.tableData = data.body;
          console.log(this.tableData)
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
    this.isNew = !this.isDivHiddenRunning;
    this.isDivHiddenNew = !this.isDivHiddenNew;
  }
  selectedItem!: string;

  constructor(private apiService: ApiService,private toastr: ToastrService) { }

  @Input() clkEve: any;

  fetchTableData() {


  }

  ngOnInit() {
    
   this.tapClickEnableRunning("running", this.tap[0])
  }

  tap = [
    { label: 'Running', isActive: false },
    { label: 'New', isActive: false }
  ];
  showMessage: boolean = false;
  
  saveFunction()
  {
    this.apiService.saveZonalPostRequest(this.tableData,this.tableData[0].gridPlanId).subscribe(
      (response) => {
        console.log('Response from the API:', this.tableData[0].gridPlanId);
        this.toastr.success('This is a success toast!', 'Success');
     
       // this.successModel();

        // Handle the API response here
   
      },
      (error) => {
        console.error('Error while making the API call:', error);
        // Handle errors here
      }
    );
    this.toastr.success('This is a success toast!', 'Success');
    this.toastr.success('This is a success toast!', 'Success');
  }
  confirmFunction()
  {

  }
 

}
