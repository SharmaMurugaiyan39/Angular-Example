import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {


  //private baseUrl="http://localhost:8095/vkc/";
  private baseUrl="http://3.89.86.219:8095/vkc/";
  stateplanId: any=0;
  getTableData(statePlanId : any): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.stateplanId=statePlanId;
    return this.http.get<any>(this.apiUrl+ this.stateplanId, { headers });
    
  }
  private contentSource = new BehaviorSubject<string>(this.getTableData.name);
  currentContent = this.contentSource.asObservable();
  private apiUrl = this.baseUrl+'zonal-plan?statePlanId=';
  private token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ6b25hbCIsInJvbGUiOlsiWm9uYWwiXSwiY2FyZW1hbmFnZXJJZCI6NDMsImlhdCI6MTY5MDk3NTY5NX0._gsXjDZEj9d5JIe6o41b3mSiRDdkoaNGUHKGQHVlL1mXJqbQLJf_DS4HvutHMN2O";
  changeContent(content: string) {
    this.contentSource.next(content);
  }
  constructor(private http: HttpClient) { }



  getNewDataFromTableId(id: number, type: String): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(this.baseUrl+"rsm-final-plan?type=" + type + "&gridPlanId=" + id + "&stateCode=TN", { headers });
  }
  saveZonalPostRequest(payload: any,id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = this.baseUrl+'zonal-final-plan?action=save&gridPlanId='+id+""; // Replace with your API endpoint
    return this.http.post(url, payload, { headers });
  }
  confirmZonalPostRequest(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = this.baseUrl+'zonal-final-plan?action=confirm&statePlanId='+id+""; // Replace with your API endpoint
    return this.http.post(url, { headers });
  }


  getZonalPlanned(type: String): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(this.baseUrl+"zonal-final:state-plans?type=" + type + "", { headers });
  }
}
