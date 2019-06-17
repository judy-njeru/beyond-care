import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map, filter } from "rxjs/operators";
import { Sitter } from "../entities/sitter";

@Injectable({
  providedIn: "root"
})
export class SittersApiService {
  baseUrl: string = "https://freshly-data.firebaseapp.com/api/sitters";

  constructor(private http: HttpClient) {}//inject the HttpClient to make it available in the component class

  getSitters(): Observable<Sitter[]> {
    return this.http.get(this.baseUrl) as Observable<Sitter[]>;
  }

  getSitter(id: string): Observable<any> {
    return this.http.get(this.baseUrl + "/" + id); //observable is returned from the get method with retrieve data from the webserver.
  }

  createSitter(sitter: Sitter): Observable<any> {
    console.log(sitter);
    return this.http.post(this.baseUrl, sitter);
  }

  updateSitter(sitter: Sitter): Observable<any> {
    const sitterID = sitter.id;
    return this.http.put(this.baseUrl + "/" + sitterID, sitter);
  }

  deleteIssue(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
