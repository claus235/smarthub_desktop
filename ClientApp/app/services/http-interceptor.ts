import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable()
export class InterceptedHttp extends Http {
    private router: Router;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router) {
        super(backend, defaultOptions);
        this.router = router;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options))
            .do(res => this.verifyResponses(res));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options))
            .do(res => this.verifyResponses(res));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options))
            .do(res => this.verifyResponses(res));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options))
            .do(res => this.verifyResponses(res));
    }

    private verifyResponses(res: Response) {
        if (res.status === 401) {
            Swal({
                type: 'warning',
                text: 'Your session has expired, await until we redirect you.',
                customClass: 'animated fadeInDown unauthorizedLogin',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 3000
            }).then((result) => {
                this.router.navigateByUrl('/login');
            })
        }
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        return options;
    }
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router): Http {
    return new InterceptedHttp(xhrBackend, requestOptions, router);
}