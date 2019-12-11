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

    this.username = sessionStorage.getItem('username');
    let resp = this.http.get("https://enflame-backend.herokuapp.com/user/addFavorite", { params : {email: this.username, reference: reference}});
    resp.subscribe((data) => this.message = data);
    alert('Added to Favorites');
    }
  
  }
}
