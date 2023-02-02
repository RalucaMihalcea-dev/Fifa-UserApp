import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public API = 'https://localhost:44348/api';
  public baseUrl = `${this.API}/User`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.baseUrl);
  }

  create(model: User): Observable<void> {
    return this.http.post<void>(this.baseUrl, model);
  }

  update(model: User): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/' + model.id, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }
}
