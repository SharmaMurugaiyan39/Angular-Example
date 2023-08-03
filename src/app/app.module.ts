import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftMenuComponent } from './left-menu/left-menu.component';

import { ZonalplannedComponent } from './zonalplanned/zonalplanned.component';
import { MatListModule } from '@angular/material/list';
import { RightContentComponent } from './right-content/right-content.component';
import { ApiService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { ZonalDetailsComponent } from './zonal-details/zonal-details.component';
import { TopComponent } from './top/top.component';
import { ToastrModule } from 'ngx-toastr'; // Import ngx-toastr
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 
  declarations: [
    AppComponent,
    TopComponent,
    LeftMenuComponent,
    RightContentComponent
    ,ZonalplannedComponent, ZonalDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000, // Time to close the toast automatically (in milliseconds)
      positionClass: 'toast-top-right', // Position of the toast on the screen
      preventDuplicates: true, // Prevent duplicate toasts from appearing
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
