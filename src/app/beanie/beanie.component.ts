import { HttpClient } from '@angular/common/http';
import { DataService } from './../data.service';
import { Beanie } from './../beanie';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from '@angular/common/http/src/params';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-beanie',
  templateUrl: './beanie.component.html',
  styleUrls: ['./beanie.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BeanieComponent implements OnInit {
  private beanie: Beanie;
  private selectedBtn: string;

  constructor(private route: ActivatedRoute,
    private data: DataService,
    private router: Router,
    private http: HttpClient) {

    // Retrieving the id from the url via the ActivatedRoute object
    route.params.subscribe(params => {
      let id = params['_id'];

      if (id) {
        // Object.assign assigns a shallow copy of the beanie object 
        // only saves beanie on submit
        this.beanie = Object.assign({}, this.data.getBeanie(id));
      } else {
        this.beanie = new Beanie('', undefined, '');
      }
      // Populate the view with the data in the returned beanie object.
    });
  }

  ngOnInit() {
  }

  // Optional type system
  private onMySubmit(form) {
    // Check if form is valid.
    if (form.valid) {
      
      if (this.beanie._id) { // Editing beanie

        //Submit edited beanie to the server
        const body = this.beanie;
        this.http.post('http://angular2api1.azurewebsites.net/api/internships/update/' + this.beanie._id,
          body,
          { responseType: 'text' } //This api sends back text
        ).subscribe(data => {

          //Redirect the user to the beanie list page after the server call is complete
          return this.router.navigate(['beanies']);
        });

      } else { // Creating new
        // Save data to the server
        this.data.temp.push(this.beanie);

        //Setup a custom id for my items
        this.beanie.customerId = "100001";
        //Push the new beanie to the server
        // Create a placeholder for the beanie
        const body = this.beanie;
        this.http.post('http://angular2api1.azurewebsites.net/api/internships/create',
          body,
          { responseType: 'text' } //This api sends back text
        ).subscribe(data => {
          //Redirect the user to the beanie list page after the server call is complete
          return this.router.navigate(['beanies']);
        });

      }
    }
    else {
      // alert("Error, fix first");
    }
  }

  private delete() {
    console.log("Attempting to delete beanie");
    //Submitting edited beanie to the server
    const body = this.beanie;
    this.http.post('http://angular2api1.azurewebsites.net/api/internships/delete/' + this.beanie._id, body,
      { responseType: 'text' } //This api sends back text
    ).subscribe(data => {
      console.log("Data deleted from to server!");
      //Redirect the user to the beanie list page after the server call is complete
      return this.router.navigate(['beanies']);
    });
  }

  private cancel() {
    this.router.navigate(['beanies']);
  }

  private callA() {
    let a = "a";
    this.selectedBtn = a;
  }

  private callB() {
    let a = "b";
    this.selectedBtn = a;
  }

  // onCryptoFolioDeleteClick(CryptoFolio){
  //   this.http.post('http://angular2api1.azurewebsites.net/api/internships/delete/'+CryptoFolio._id,
  //   CryptoFolio, {responseType: 'text'})
  //   .subscribe(data => {
  //     console.log(data);
  //     this.grabCryptofolio();
  //     //this.router.navigate(['mycryptofolio']);
  //   }) 
  // }

}
