import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string="http://localhost:8080"
  
  constructor(private http:HttpClient) { }

  public getvilles()
  {
    return this.http.get(this.host+"/villes")
      
  }
  public getCinemas(v)
  {
    return this.http.get(v._links.cinemas.href);
  }
}
