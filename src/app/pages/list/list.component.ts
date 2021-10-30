import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    { code: 'population', name : 'Population', type: 'number' }
  ];
  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCountries().then(() => {
      this.route.queryParams.subscribe(params => {
        Object.keys(params).forEach(param => {
          this.countriesList = this.countriesList.filter(country => country[param] == params[param])
        })
      })
    })
  }

  private async getCountries(){
    await this.countriesService.getAllCountries()
    .then((response) => {
      if (response) {
        this.countriesList = response;
      }
    });
  }

  ngOnDestroy() {
  }
}
