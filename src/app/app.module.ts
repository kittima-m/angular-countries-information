import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './shared/component/nav-bar/nav-bar.component';
import { FilterButtonComponent } from './shared/button/filter-button/filter-button.component';
import { SortButtonComponent } from './shared/button/sort-button/sort-button.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableComponent } from './shared/component/table/table.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavBarComponent,
    FilterButtonComponent,
    SortButtonComponent,
    DashboardComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
