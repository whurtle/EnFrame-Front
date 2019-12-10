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
  

  constructor(
                private router: Router,
                private http: HttpClient,
  ) { }

  ngOnInit() {

    let resp = this.http.get<string>("http://enflame-backend.herokuapp.com/user/getUser", { params : {email: this.username}});
    console.log(this.firstName)
    }
  

    checkLogin(){
    this.username = sessionStorage.getItem('username')
    // alert(user)
    }

}
