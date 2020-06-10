import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISP } from '../home.model';
import { Subject, Observable, fromEvent, from } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
@Component({
  selector: 'app-isp-list',
  templateUrl: './isp-list.component.html',
  styleUrls: ['./isp-list.component.css'],

})
export class IspListComponent implements OnInit {
  ISPsList: ISP[];
  sortby = 'rating';
  searchtext = '';
  @Output() onSearch = new EventEmitter<string>();
  @Output() rowClick: any = new EventEmitter<any>();
  private searchUpdated: any = new Subject();
  private results$: any;
  constructor(private store: Store) { }

  ngOnInit() {

    this.store.pipe(select((k: any) => k.Biz2Actions.ISPs))
      .subscribe(
        res => {
          this.ISPsList = res;
          this.onsortChange(this.sortby);
        },
        err => console.log(err.message)
      );
    this.results$ = this.searchUpdated.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(k => { this.onSearch.emit(k); });
  }
  onKeydown(searchtext) {

    this.searchUpdated.next(searchtext)
  }
  onrowClick(data) {
    this.rowClick.emit(data);
  }
  onsortChange(value) {
    this.sortby = value;
    this.ISPsList = this.ISPsList.slice().sort((a, b) => this.compare(a, b, this.sortby));
  }
  compare(a, b, prop) {
    if (a[prop] < b[prop]) {
      return 1;
    }
    if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  }

}
