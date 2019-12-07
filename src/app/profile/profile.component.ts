import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkLogin(){
    let user = sessionStorage.getItem('username')
    // alert(user)
  }

}
