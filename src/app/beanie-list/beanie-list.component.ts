import { DataService } from './../data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-beanie-list',
  templateUrl: './beanie-list.component.html',
  styleUrls: ['./beanie-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BeanieListComponent implements OnInit {

  private temp;
  showSpinner: boolean = false;

  constructor(private router: Router, 
    private data: DataService, 
    private http: HttpClient) { 
      //Push all the data retrieved from the server into a temporary variable
    this.temp = this.data.getAll();
  }

  ngOnInit() {
    //Show the searching spinner
    this.showSpinner = true;
    this.http.get('http://angular2api1.azurewebsites.net/api/internships/getall')
      .subscribe((data: any[]) => {
        //This code runs only once the server responds
        //Return the data back to the component using observables
        this.temp = data;
        this.temp = data.filter(x => x.customerId == "100001"); //Filter only my data from the server

        //Hide the searching spinner
        this.showSpinner = false;

        return data;
      });
  }

  onBeanieClick(beanie) {
    this.router.navigate(['beanie/', beanie._id]);
    var count = Object.keys(beanie).length;
  }

  onResponse() {
  }

}
