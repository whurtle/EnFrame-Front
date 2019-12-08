import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
  
  isAdmin() {
    
    let user = sessionStorage.getItem('username');
    let resp = this.http.get<boolean>("https://enflame-backend.herokuapp.com/user/isAdmin", { params : {email : user}});
    if(!resp){
      alert("Incorrect");
    }else{
      this.router.navigate(['/admin']);
    }
  }
}
