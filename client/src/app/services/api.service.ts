import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


  getData() :Observable<Project[]>{
    return this.http.get<Project[]>(
      'http://localhost:3000/api/projects');
  }
}

