import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Constants } from './constants/constants';

const MaterialComponents : any[] = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  providers: [Constants]
})
export class SharedModule { }
