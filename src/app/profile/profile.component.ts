import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstName = '';
  lastName = '';
  username = '';
  user: Object;
  favorites: Iterable<String>;
  reference = '';
  
  constructor(
                private router: Router,
                private http: HttpClient,
  ) { }


  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    let resp = this.http.get<Object>("http://localhost:8080/user/getUser", { params : {email: this.username}})
    .subscribe( data => {
      this.user = data;
    })

    let resp2 = this.http.get<Iterable<String>>("http://localhost:8080/user/getUserFavorites", { params : {email: this.username}})
    .subscribe( data => {
      this.favorites = data;
      console.log(this.favorites)
    });
    }
  

    checkLogin(){
    this.username = sessionStorage.getItem('username')
    // alert(user)
    }

}
