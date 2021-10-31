import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Country } from '@core/models/country.model';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , OnChanges {
  @Input() countriesList : Country[] = [];
  @Input() sortDirection: string = "";
  
  displayedColumns: string[] = ['name', 'population', 'region'];
  dataSource = new MatTableDataSource<Country>();

  //paginator
  pageSize = 10;
  pageSizeOptions: number[] = this.constants.PAGINATOR ;
  resultsLength: number = 0;
  pageIndex : number = 0;

  isDataNotFound: boolean = false;
  dataNotFoundMessage : string = this.constants.DATA_NOT_FOUND;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  constructor(private constants : Constants) { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.countriesList){
      this.isDataNotFound = this.countriesList.length == 0 ? true : false ;
      this.dataSource = new MatTableDataSource(this.countriesList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  ngOnInit(): void {
  
  }

  trackByFn(index : number, item : Country) {
    return index;
  }
}
 