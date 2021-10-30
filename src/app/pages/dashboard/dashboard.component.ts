import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/app/core/services/countries.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  populationTitle: string = "Top 10 Population By Country";
  regionTitle : string = "Regions";
  searchTitle : string = "Quick Search";
  searchPlaceholder:string = " Search Country Name ..." ;

  top10PopulationList:any[] = [];
  countryRegionGroup : {region : string , amount : number , countries : any[] }[]= [];
  countryList : string[] = [];
  columnTop10Table = [
    { code: 'index', name: '#', type: 'index' },
    { code: 'name', name: 'Country Name', type: 'string' },
    { code: 'population', name: 'Population', type: 'number' }
  ];

  constructor(
    private countriesService: CountriesService ,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.countriesService.getAllCountries().then((response) => {
      if (response) {
        this.getCountryRegionGroup(response).then(() => {
          this.countryRegionGroup.sort((c1, c2) => c2['amount'] - c1['amount'])
        });

        response.sort((c1, c2) => c2['population'] - c1['population'])
          .slice(0, 10)
          .map(value => {
            this.top10PopulationList.push(value);
          });
      }
    });
  }

  private async getCountryRegionGroup(response : any){
    await response.forEach((data:any) => {
      this.countryList.push(data.name);
      let foundRegion = this.countryRegionGroup.find(value => value['region'] == data['region']) ?? null;
      if(foundRegion){
        foundRegion.amount = foundRegion.amount + 1;
        foundRegion.countries.push(data);
      } else {
        this.countryRegionGroup.push({
          region : data['region'],
          amount : 1 ,
          countries : [data]
        });
      }
    });
  }

  onSearch(value : string , property : string){
    if(value){
      let param : any = {} ;
      param[property] = value;
       
      this.router.navigate(['/information'] , { queryParams : param });
    }
  }

  getImagePath(index: number) {
    let path = `../assets/images/icon/`;
    switch (index) {
      case 0:
        return `${path}gold-medal.png`;
      case 1:
        return `${path}silver-medal.png`;
      case 2:
        return `${path}bronze-medal.png`;
      default:
        return null;
    }
  }

  checkImageIndex(index : number){
    return [0,1,2].indexOf(index) > -1 ? true : false; 
  }

}
