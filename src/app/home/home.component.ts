import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> HomeGrid
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD

=======
  photos: Iterable<Object>;
>>>>>>> HomeGrid
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
<<<<<<< HEAD
  
  isAdmin() {
    
    let user = sessionStorage.getItem('username');
    let resp = this.http.get<boolean>(`https://enflame-backend.herokuapp.com/user/isAdmin?email=${user}`, { params : {email : user}});
    if(!resp){
      alert("Incorrect");
    }else{
      this.router.navigate(['/admin']);
    }
=======
  searchImage(curTag){
    this.http.get<Iterable<Object>>("https://enflame-backend.herokuapp.com/photo/getPhotosByTag", {params: {tag : curTag}}).subscribe(
      data => {
        this.photos = data;
      }
    )
>>>>>>> HomeGrid
  }
}
