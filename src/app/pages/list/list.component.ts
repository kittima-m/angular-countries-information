import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/core/services/countries.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  countriesList: any[] = [];
  sortActive : string = 'population';
  tableContent: any[] = [
    { code: 'flag', name : 'Flag' , type: 'flag' },
    { code: 'name', name : 'Name', type: 'string' },
    { code: 'region', name : 'Region', type: 'string' },
    { code: 'population', name : 'Population', type: 'number' , sortable : true  }
  ];
  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countriesService.getAllCountries().then((response) => {
      if (response) {
        this.countriesList = response;
        console.log('countriesList :', this.countriesList)
      }
    });
  }

  ngOnDestroy() {
  }

}
