import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISP } from './home.model';
import { HomeState } from '../state/home.reducer';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class HomeService {
    serviceBaseUrl: string = "http://localhost:3300/api";
    constructor(private http: HttpClient) { }
    getIsps(searchText): Observable<any> {
        return this.http.get(`${this.serviceBaseUrl}/home/${searchText}`)     
            .pipe(map((res: any) => {
                if (res.Status == 200)
                    return <ISP[]>res.Data;
                return new Error(res.error);
            }),
            debounceTime(500),
            distinctUntilChanged());
    }
}