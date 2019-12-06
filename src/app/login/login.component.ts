import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service'

@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
 })
export class LoginComponent implements OnInit {
    username = ''
    password = ''
    message:any;

    constructor(
                private formBuilder: FormBuilder,
                private router: Router,
                private http: HttpClient,
                private localStorageService: LocalStorageService
        ){ }

    ngOnInit(){
        const newUser = 'new user'; 
    }

    checkLogin() {
        let resp = this.http.get<string>("http://localhost:8080/user/checkCredentials", { params : {email : this.username, password : this.password}});
      
        resp.subscribe((res)=>{
            status = res;
          
        if(status == 'true'){
            this.router.navigate(['']);
            sessionStorage.setItem('username', this.username)
        }    
        else
            alert("LOGIN FAILED");
        });
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username')
        console.log(!(user === null))
        return !(user === null)
      }
    
      logOut() {
        sessionStorage.removeItem('username')
      }

}