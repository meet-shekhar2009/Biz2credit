import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISP } from './home.model';
import { HomeState } from '../state/home.reducer';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class HomeService {

    constructor(private http: HttpClient) { }
    getIsps(searchText): Observable<any> {
        return this.http.get(`${environment.serviceBaseUrl}/home/${searchText}`)
            .pipe(
                map((res: any) => {
                    if (res.Status == 200)
                        return <ISP[]>res.Data;
                    return new Error(res.error);
                })
            );
    }
}