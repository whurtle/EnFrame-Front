import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegestrationService {

  constructor(private http: HttpClient) { }

  public doRegistration(user){
    return this.http.post("http://localhost:8080/user/addUser",user, {responseType: 'text' as 'json'})
  }

  getUserDetails(){
    // post these details to http API and return user info if correct.
  }

  public loginValidation(username, pass){
    return this.http.get<string>("http://localhost:8080/user/checkCredentials", { params : {email : username, password : pass}});
  }
}
