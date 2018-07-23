import { Injectable } from "@angular/core";
import { Beanie } from "./beanie";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataService {
  temp = [];

  public test(): void {
    alert("Hello from dataservice");
  }

  //Dependency Injection - Angular will inject an httpclient object
  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    //Get data from the server
    this.http.get('http://angular2api1.azurewebsites.net/api/internships/getall')
      .subscribe(data => { // Subscribe waits for data to come back from the web service
        //When the server responds

        //Clearn any old data in the temp object
        this.temp = [];
        //Push data to the server
        this.temp.push(data);

        //Return the data back to the component using observables
        return data;
      });

    // This is the ideal place to place a loading spinner

  }

  public getBeanie(id: string): Beanie {
    //Return the selected beanie
    return this.temp[0].find(x => x._id === id);
  }

}