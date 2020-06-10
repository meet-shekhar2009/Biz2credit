import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISP } from '../home.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
    // htmlToImage.toJpeg(node, { quality: 0.95 })
    // .then((dataUrl)=> {
    //   var link = document.createElement('a');
    //   link.download = this.ISPDetail.name+'.jpeg';
    //   link.href = dataUrl;
    //   link.click();
    // });
    html2canvas(node).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }
}


