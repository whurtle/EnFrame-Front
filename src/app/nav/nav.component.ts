import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  logOut(){
    sessionStorage.removeItem('username');
    // sessionStorage.clear();
  }

  isLoggedIn() {
    
    let user = sessionStorage.getItem('username');
    if(user == null){
      this.router.navigate(['./login'])
    }else{
    this.router.navigate(['/profile'])
    }
  }

}
