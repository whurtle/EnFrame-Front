import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { UserRegestrationService } from '../user-regestration.service';
import { Router } from '@angular/router';
// import { MustMatch } from './_helpers/must-match.validator';

@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})

export class CreateAccountComponent implements OnInit {
    
    user: User=new User("","","","");
    message:any;
    // model: any = { };

    constructor(private service: UserRegestrationService,
                private formBuilder: FormBuilder,
                private router: Router,
        ){ }

    ngOnInit(){
    }

    onSubmit() {
        alert('Success!! :-)\n\n' + JSON.stringify(this.user, null, 4));
        let resp = this.service.doRegistration(this.user)
        resp.subscribe((data) =>this.message=data);
        this.router.navigate(['/login']);
    }
}
