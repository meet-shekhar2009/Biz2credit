import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Store } from '@ngrx/store';
import { PopulateIspsAction, PopulateSelectedIspAction, TotalIsps } from '../state/home.action';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: HomeService, private store: Store) { }

  ngOnInit() {
    this.searchIsps();
  }
  searchIsps(searchText = '') {
    this.service.getIsps(searchText).subscribe(response => {
      this.store.dispatch(new PopulateIspsAction(response));
      this.store.dispatch(new TotalIsps(response.length));
      if (response && response.length > 0)
        this.store.dispatch(new PopulateSelectedIspAction(response[0]));
    },
      err => console.error(err)
    )
  }
  onSearch(text) {
    this.searchIsps(text);
  }
  onrowClick(isp: any) {
    this.store.dispatch(new PopulateSelectedIspAction(isp));
   debugger
    let element: any = document.querySelector("#dtls")
    element.scrollIntoView();
  }
}
