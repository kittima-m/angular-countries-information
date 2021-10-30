import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css']
})
export class FilterButtonComponent implements OnInit {
  @Input() countriesList : any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
