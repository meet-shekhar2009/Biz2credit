import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/home.reducer'
import { HomeService } from './home/home.service';
import { HomeComponent } from './home/home.component';
import { IspListComponent } from './home/isp-list/isp-list.component';
import { IspDetailComponent } from './home/isp-detail/isp-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpConfigInterceptor } from './common/app.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IspDetailComponent,
    IspListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ Biz2Actions: reducer }),
    FormsModule
  ],
  providers: [HomeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
