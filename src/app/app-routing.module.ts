import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonalplannedComponent } from './zonalplanned/zonalplanned.component';
import { ZonalDetailsComponent } from './zonal-details/zonal-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'zone-list', pathMatch: 'full' },
  { path: 'zonal-detail/:id', component:ZonalDetailsComponent },
  { path: 'zone-list', component:ZonalplannedComponent },

  // Add more routes as needed
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
