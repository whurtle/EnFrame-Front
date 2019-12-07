import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WavesModule, TableModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: Iterable<Object>;
  photos: Iterable<Object>;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    
    this.http.get<Iterable<Object>>("https://enflame-backend.herokuapp.com/user/getAllUsers").subscribe(
      data => {
        this.users = data;
      }
    )
    this.http.get<Iterable<Object>>("https://enflame-backend.herokuapp.com/photo/getAllPhotos").subscribe(
      data => {
        this.photos = data;
      }
    )
  }

  deleteUser(email){
    // this.http.
  }
  deletePhoto(reference){

  }

}
