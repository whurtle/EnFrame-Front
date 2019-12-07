import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WavesModule, TableModule } from 'angular-bootstrap-md';
import { throwMatDuplicatedDrawerError } from '@angular/material';

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
  reload(){
    setTimeout(() => 
    {
      this.router.navigateByUrl(`/`).then(
        () => {
          this.router.navigateByUrl(`/admin`);
        });
    },
    1000);
  }
  deleteUser(currEmail){
    this.http.delete<Boolean>("https://enflame-backend.herokuapp.com/user/deleteUser", {params: {email: currEmail}}).subscribe();
    this.reload();
  }
  deletePhoto(currReference){
    this.http.delete<Boolean>("https://enflame-backend.herokuapp.com/photo/deletePhoto", { params : {reference : currReference}}).subscribe();
    this.reload();
  }

}
