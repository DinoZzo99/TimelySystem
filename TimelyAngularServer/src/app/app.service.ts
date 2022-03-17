import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:44303/api/TimeLog';

@Injectable({
  providedIn: 'root'
})

export class TimeLogService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  get(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(data: any): Observable<any> {
    return this.http.put(baseUrl, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteEmpty(): Observable<any> {
    return this.http.delete(`${baseUrl}/empty`);
  }
}
