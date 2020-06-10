import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import htmlToImage from 'html-to-image';
import { ISP } from '../home.model';
@Component({
  selector: 'app-isp-detail',
  templateUrl: './isp-detail.component.html',
  styleUrls: ['./isp-detail.component.css']
})
export class IspDetailComponent implements OnInit {
  ISPDetail: ISP;
  Ratings: boolean[];

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.pipe(select((k: any) => k.Biz2Actions.currentISP))
      .subscribe(
        res => {
          this.ISPDetail = res;
          if (res) {
            this.setRatings(res.rating)
          }
        },
        err => console.log(err.message)
      );
  }
  setRatings(rating: number) {
    this.Ratings = new Array(5)
      .fill(false)
      .map((item, index) => {

        if (index + 1 <= rating) item = true;
        return item;
      })
  }
  exportToImage() {
 
    var node = document.getElementById('dtls');
    htmlToImage.toJpeg(node, { quality: 0.95 })
    .then((dataUrl)=> {
      var link = document.createElement('a');
      link.download = this.ISPDetail.name+'.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }
}

