import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UpdateAPIHitsCount } from '../state/home.action';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private store: Store) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.APIHitsCount)
                        this.store.dispatch(new UpdateAPIHitsCount(event.body.APIHitsCount));
                }
                return event;
            }));
    }
}