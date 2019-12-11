import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photos: Iterable<Object>;
  message: any;
  username = '';
  isAdminBool : boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.addFavorite("1234");
    let user = sessionStorage.getItem('username');
    this.http.get<boolean>("https://enflame-backend.herokuapp.com/user/isAdmin", { params : {email : user}}).subscribe(
      data => {
        this.isAdminBool = data;
      }
    );
  }
  
  isAdmin() {
    
    
      this.router.navigate(['/admin']);
  }
  searchImage(curTag){
    this.http.get<Iterable<Object>>("https://enflame-backend.herokuapp.com/photo/getPhotosByTag", {params: {tag : curTag}}).subscribe(
      data => {
        this.photos = data;
      }
    )
  }

  addFavorite(reference) {

    this.username = sessionStorage.getItem('username');
    if(this.username == null) {
      return;
    }
    else {

    this.username = "av123@gmail.com";
    let resp = this.http.get("https://enflame-backend.herokuapp.com/user/addFavorite", { params : {email: this.username, reference: reference}});
    resp.subscribe((data) => this.message = data);
    alert('Success');
    }
  
  }
}
