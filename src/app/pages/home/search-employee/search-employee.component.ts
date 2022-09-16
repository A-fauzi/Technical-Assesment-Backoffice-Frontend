import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enteenteredSearchValue: string = ''

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>()

  onSearchTextCanged(){
    this.searchTextChanged.emit(this.enteenteredSearchValue)
  }

}
