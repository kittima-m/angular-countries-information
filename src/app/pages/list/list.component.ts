import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/core/models/country.model';
import { Table } from 'src/app/core/models/table.model';
import { CountriesService } from 'src/app/core/services/countries.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private subject$ : Subject<boolean> = new Subject<boolean>();

  countriesList: Country[] = [];
  filteredList: Country[] = [];
  tableContent: Table[] = [
    { code: 'flag', name: 'Flag', type: 'flag' },
    { code: 'name', name: 'Name', type: 'string' },
    { code: 'region', name: 'Region', type: 'string' },
    { code: 'population', name: 'Population', type: 'number' }
  ];

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    region: new FormControl(''),
    population: new FormControl(''),
  });
  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getCountries().then(() => {
      this.route.queryParams.pipe(takeUntil(this.subject$)).subscribe(params => {
        Object.keys(params).forEach(param => {
          this.filteredList = Object.assign([], this.countriesList)
            .filter((country : Country) => country[param as keyof Country].toString().startsWith(params[param]));
          this.searchForm.controls[param].setValue(params[param]);
        })
      });
    }).then(() => {
      this.listenFormGroup();
    })
  }


  private async getCountries() {
    await this.countriesService.getAllCountries()
      .then((response) => {
        if (response) {
          this.countriesList = response;
          this.filteredList = response ;
        }
      });
  }

  private listenFormGroup() {
    this.searchForm.valueChanges.pipe(takeUntil(this.subject$)).subscribe((changed) => {
      this.checkIsEmptyForm(changed).then((emptyFilterList => {
        if (emptyFilterList) {
          this.filteredList = Object.assign(this.countriesList);
        } else {
          let searchingList = Object.assign([] ,this.countriesList);
          Object.keys(changed).forEach(change => {
            if (changed[change]) {
              searchingList = Object.assign(searchingList.filter(country =>
                this.prepareValue(country[change]).startsWith(this.prepareValue(changed[change]))
              ));
            }
          });
          this.filteredList = searchingList;
          }
      }))
    })
  }

  private async checkIsEmptyForm(changed: any) {
    let countEmpty: number = 0;
    Object.keys(changed).forEach(change => {
      if (!changed[change]) {
        countEmpty = countEmpty + 1;
      }
    });
    return Object.keys(changed).length == countEmpty ? true : false;
  }

  private prepareValue(value: string) {
    return value ? value.toString().replace(/\s/g, '').toUpperCase() : '' ;
  }

  ngOnDestroy() {
    this.subject$.next(true);
    this.subject$.unsubscribe();
  }
}
