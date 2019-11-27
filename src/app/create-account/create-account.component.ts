import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user';
import { UserRegestrationService } from '../user-regestration.service';


@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})

export class CreateAccountComponent implements OnInit {
    
    user: User=new User("","","","");
    message:any;

    constructor(private service: UserRegestrationService){ }

    ngOnInit(){

    }

    public registerNow(){
        let resp = this.service.doRegistration(this.user)
        resp.subscribe((data) =>this.message=data);

    }
}
