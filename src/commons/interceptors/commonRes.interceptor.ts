import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';


@Injectable()
export class CommonResInterceptor implements HttpInterceptor {
    // Must initialize injector in constructor to be able to inject and instantiate AuthenticationService directly
    constructor(
      private auth: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const certError: string = 'Unknown Error';
        return next.handle(req)
          .pipe(map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.url.indexOf('api') >= 0 && event.body.exceptions) {
                        // If session_token cookie is invalid, log user out and delete userId cookie
                        if (event.body.exceptions.indexOf('exceptions') >= 0) {
                            this.auth.sendBacktoHome();
                        }
                    }
                } 
                return event;
            }))
            .pipe(catchError((err: any, caught) => {
              if (err instanceof HttpErrorResponse) {
                this.auth.deleteToken();
                if (err.status === 0 || err.statusText === certError) {
                  console.error('You must accept the certificates');
                }
                return Observable.throw(err);
              }
            }));
    }
}