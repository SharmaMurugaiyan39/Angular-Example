import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from '../app.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-zonalplanned',
  templateUrl: './zonalplanned.component.html',
  styleUrls: ['./zonalplanned.component.css']
})
export class ZonalplannedComponent implements OnInit {

  zonalPlanned = [
    { label: 'Yet to Allocated', isActive: false, value: "pending" },
    { label: 'Completed', isActive: false, value: "planned" }
  ];

  isNew: boolean = false;

  zonalRsmData: any[] = [];


  @Output() statePlanId: any = new EventEmitter();
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.zonalPlannedClick("pending", this.zonalPlanned[0], 0);

    this.zonalPlanned[0].isActive = true;
    this.runningFlag=false;


  }



  planned: boolean = false;
  pending: boolean = false;

  showDiv: boolean = false;
  runningFlag: boolean = false;
  zonalPlannedClick(type: String, selectedItem: any, i: number) {

    this.zonalPlanned.forEach(button => (button.isActive = false));

    this.zonalPlanned[i].isActive = true;
    this.apiService.currentContent.subscribe((content) => {
      let id = content;
      this.apiService.getZonalPlanned(selectedItem.value).subscribe(
        (data) => {
          this.zonalRsmData = data.body;
          console.log(this.zonalRsmData);
          this.isNew = true;
          console.log(selectedItem.value, "tap")
          if (selectedItem.value !== 'planned') {
            this.runningFlag = true;
          }
          else
          {
            this.runningFlag = false;
          }


        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }


  clickEventOfGridPlan(statePlanId: any, type: string) {

    if (type === 'confirm') {
      this.apiService.confirmZonalPostRequest(statePlanId).subscribe(
        (response) => {
          console.log('Response from the API:', statePlanId);

          // Handle the API response here
        },
        (error) => {
          console.error('Error while making the API call:', error);
          // Handle errors here
        }
      );

    }
    else {
      this.router.navigate(['/zonal-detail', statePlanId]);
    }






  }






}
