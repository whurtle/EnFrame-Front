import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  photos: Iterable<Object>;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {

  }
  searchPhotos(searchTag){
    this.http.get<Iterable<Object>>("https://enflame-backend.herokuapp.com/photo/getPhotosByTag", {params: {tag : searchTag}}).subscribe(
      data => {
        this.photos = data;
        alert(this.photos);
      }
    )
  }
  isAdmin() {
    
    let user = sessionStorage.getItem('username');
    let resp = this.http.get<boolean>("https://enflame-backend.herokuapp.com/user/isAdmin", { params : {email : user}});
    if(!resp){
      alert("Incorrect");
    }else{
      this.router.navigate(['/admin'])
    }
  }
}
