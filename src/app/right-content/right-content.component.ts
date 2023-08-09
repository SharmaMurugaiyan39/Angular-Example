import { GridPlan } from './../left-menu/left-menu.component';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../app.service';
import { ToastrService } from 'ngx-toastr'; // Import ngx-toastr service
import { find, findIndex } from 'rxjs';

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
  isNew: boolean = false;


  buttonClick(index: number, item: any) {
    console.log(index, "item", item);

  }

  openModelAsmCalculation(item: any, i: number): void {
    this.showTableData = item;
    console.log(this.showTableData, "show Table")
    const myModal = document.getElementById('myModalLabelAsm');
    const modal = new bootstrap.Modal(myModal);
    console.log(item, "", i, "", "ASN")
    modal.show();
  }
  openModelRsmCalculation(item: any, i: number): void {
    const myModal = document.getElementById('myModalLabelRsm');
    const modal = new bootstrap.Modal(myModal);
    console.log(item, "", i, "", "RSM")
    modal.show();
  }

  successModel() {
    const myModal = document.getElementById('successModel');
    const modal = new bootstrap.Modal(myModal);
    modal.show();
  }

  Qty: any;

  Newindex: any;

  openModelZonalCalculation(item: any, i: number, value: any): void {
    const myModal = document.getElementById('myModalLabelZonal');
    this.showTableData = item;
    console.log(this.showTableData);
    this.tableData[i].apZonalQty = value;
    console.log("Flag Set Open",this.QtyChangeFlag)
    if(this.QtyChangeFlag)
    {
    this.calculationQty(i,value);
    }
    else
    {
      this.setValueZonalQty(i,value);
    }
    const modal = new bootstrap.Modal(myModal);
    this.Newindex = i;
    modal.show(item);
  }

  setValueZonalQty(i: number,value : any)
  {
   
    this.tableData[i].apZonalQty = value;
    for (let j = 0; j < this.tableData[i].apZonalQtyList.length; j++) {
        this.tableData[i].apZonalQtyList[j].qty = this.tableData[i].apZonalQtyList[j].qty;
     
    }
  
  }
  onClickedOutside()
  {
    this.Newindex=0;
    this.QtyChangeFlag=false;
    console.log("close function call" )
  }
  calculationQtyNew(i:any,event : any,value : any)
  {
    console.log("size",i);
    console.log("size mail locaton",this.Newindex)
    console.log("size111",value)

    this.tableData[this.Newindex].apZonalQtyList[i].qty=value;

    let number=0;
    for(let index=0;index<this.tableData[this.Newindex].apZonalQtyList.length;index++)
    {
      number=number+parseInt(this.tableData[this.Newindex].apZonalQtyList[index].qty)
    }
    this.tableData[this.Newindex].apZonalQty=number;
  }

  QtyChangeFlag:Boolean=false;
  savedFlag(flag : Boolean,event : any,locationIndex : any)
  {

    this.QtyChangeFlag=flag;
    console.log("Flag Set neeww",this.QtyChangeFlag);
   this.calculationQty(locationIndex,event.target.value);

   let number=0;
   for(let i =0;i<this.tableData.length;i++)
   {
    number=number+  parseInt(this.tableData[i].apZonalQty);
   }
   this.totalQty=number;
  }
  calculationQty(i:number ,value : any)
  {
    let number=0;
    let totalZonal = value / 2;
    this.tableData[i].apZonalQty = value;
    for (let j = 0; j < this.tableData[i].apZonalQtyList.length; j++) {
      if (totalZonal.toString().includes('.')) {
        let dotSplit = totalZonal.toString().split('.');
        console.log("log", dotSplit[1])
        number = number + parseFloat('.' + dotSplit[1]);
        this.tableData[i].apZonalQtyList[j].qty = dotSplit[0];
      }
      else {
        this.tableData[i].apZonalQtyList[j].qty = totalZonal;

      }
      if (j == this.tableData[i].apZonalQtyList.length - 1) {
        let dotSplit = totalZonal.toString().split('.');
        this.tableData[i].apZonalQtyList[j].qty = parseInt(dotSplit[0]) + number;
      }
    }
  }

  getCalculationZonal(event: any, gridplanId: any) {
    const inputValue = event.target.value;
    console.log(inputValue, 388783434, this.Newindex);
    console.log("Flag Set Calculation",this.QtyChangeFlag)
    let i = this.Newindex;
    if(this.QtyChangeFlag)
    {
      this.calculationQty(i,inputValue);
    }
    else
    {
      this.setValueZonalQty(i,inputValue);
    }
  
  }


  totalQty: number = 0;

  onSavedZonalQtyCalculation() {
    let i = this.Newindex;
  }
  showTableData: any = [];
  formSubmitted: boolean = false;
  successMessage: string = 'Form submitted successfully!';
  isLoading: boolean = true;
  showDiv: boolean = false;
  tapClickEnableRunning(type: String, selectedItem: any) {

    this.tableData = [];
    this.NewtableData = [];
    this.tap.forEach(button => (button.isActive = false));
    selectedItem.isActive = true;



    this.newType = selectedItem.label;

    let flag = false;

    this.apiService.currentContent.subscribe((content) => {
      let id = content;
      this.apiService.getNewDataFromTableId(parseInt(id), this.newType).subscribe(
        (data) => {
          this.tableData = data.body;
          this.isNew = true;
          flag = true;
          let number = 0;
          for (let i = 0; i < this.tableData.length; i++) {


            if (this.tableData[i].apZonalQty !== null) {
              number = number + parseInt(this.tableData[i].apZonalQty);
            }
          }
          this.totalQty = number;
          console.log(number, "total");
          console.log(this.totalQty, "qty");
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

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  @Input() clkEve: any;

  fetchTableData() {

  }

  getDimensionsByFilter(event: any) {
    return this.tableData.filter(x => x.brand === event.target.value);
  }

  ngOnInit() {

    this.clkEve = true;
    console.log("click evt", this.clkEve);
    this.totalQty = 0;
    setTimeout(() => {
      this.tapClickEnableRunning("running", this.tap[0])
    }, 800);

  }

  tap = [
    { label: 'Running', isActive: false },
    { label: 'New', isActive: false }
  ];
  showMessage: boolean = false;


  NewtableData: any[] = [];

  filterFlag: boolean = false;

  keyPressedFilter(findStr: any, flag: number, searchColumn: string) {

    let number: number = 0;
    console.log("Search column", searchColumn);

    if (flag == 1) {
      const filteredData = this.NewtableData.filter(item => item[searchColumn].toString().toLowerCase().includes(findStr.toLowerCase()));
      this.NewtableData = filteredData;
      this.filterFlag = true;
      for (let i = 0; i < this.NewtableData.length; i++) {

        number = number + parseInt(this.NewtableData[i].apZonalQty);
      }


    }
    else if (flag == 2) {
      this.filterFlag = true;
      const filteredData = this.tableData.filter(item => item[searchColumn].toString().toLowerCase().includes(findStr.toLowerCase()));
      this.NewtableData = filteredData;
      for (let i = 0; i < this.NewtableData.length; i++) {

        number = number + parseInt(this.NewtableData[i].apZonalQty);
      }
    }
    else {
      this.filterFlag = false;
    }

    this.totalQty = number;
  }


  saveFunction() {
    this.apiService.saveZonalPostRequest(this.tableData, this.tableData[0].gridPlanId).subscribe(
      (response) => {
        console.log('Response from the API:', this.tableData[0].gridPlanId);
        this.toastr.success('Zonal Grid Plan Save Successfully!', 'Success');
        // this.successModel();

        // Handle the API response here

      },
      (error) => {
        console.error('Error while making the API call:', error);
        // Handle errors here
      }
    );


  }
  confirmFunction() {

  }


}
