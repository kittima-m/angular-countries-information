import { Component, Input, OnInit } from '@angular/core';
import { pipe } from 'rxjs';

@Component({
  selector: 'sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.css']
})
export class SortButtonComponent implements OnInit {
  @Input() countriesList: any[] = [];
  @Input() columnCode: string = "";

  private sorted: { column: string, isAsc : boolean } = {} as any;
  constructor() { }

  ngOnInit(): void {
  }

  sortByColumn() {
    if (this.sorted.isAsc) {
      this.countriesList.sort((obj1, obj2) => obj2[this.columnCode] - obj1[this.columnCode])
      this.sorted.isAsc = false; 
    } else {
      this.countriesList.sort((obj1, obj2) =>
        obj1[this.columnCode] - obj2[this.columnCode]
      ).map(sorted => {
        console.log(sorted);
      });
      this.sorted.isAsc = true;
    }


  }

  compare(o1: any, o2: any) {
    return
  }
}
