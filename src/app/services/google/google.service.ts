import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../typings/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private readonly apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  auth(credential: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, { credential });
  }
}
