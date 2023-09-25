import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'http://localhost:3000/budget';
  private data: any = null;

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    // If data is already fetched, return it
    if (this.data) {
      return of(this.data);
    }

    // Otherwise, fetch data from the backend
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.get(this.dataUrl, { headers: headers })
      .pipe(
        tap(response => {
          this.data = response;
        })
      );
  }

  getData(): any {
    return this.data;
  }
}
