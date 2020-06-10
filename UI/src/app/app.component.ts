import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TotalIsps, UpdateAPIHitsCount } from './state/home.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Biz2credit';
  ApiCount = 0;
  ToatalIsp = 0;
  constructor(private store: Store) {
  }
  ngOnInit() {
    this.setCounts();

  }
  setCounts() {
    this.store.pipe(select((k: any) => { return { APIHitsCount: k.Biz2Actions.APIHitsCount, TotalIsps: k.Biz2Actions.TotalIsps } }))
      .subscribe(
        res => {
          this.ApiCount = res.APIHitsCount;
          this.ToatalIsp = res.TotalIsps;
        },
        err => console.log(err.message)
      );
  }
}
