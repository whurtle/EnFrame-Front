import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})

export class CreateAccountComponent implements OnInit {
    
    user: User=new User("","","","");
    message:any;

    constructor(
                private formBuilder: FormBuilder,
                private router: Router,
                private http: HttpClient,
        ){ }
    ngOnInit(){
    }

    onSubmit() {
        alert('Success!! :-)\n\n' + JSON.stringify(this.user, null, 4));

        let resp = this.http.post("https://enflame-backend.herokuapp.com/user/addUser",this.user,{responseType: 'text' as 'json'})
        resp.subscribe((data) =>this.message=data);
        this.router.navigate(['/login']);
    }
}
