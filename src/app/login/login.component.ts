import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserRegestrationService } from '../user-regestration.service';

//  import { AlertService, AuthenticationService } from '@_services';

@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
 })
export class LoginComponent implements OnInit {
    username = ''
    password = ''
    message:any;
    // model: any = { };

    constructor(private service: UserRegestrationService,
                private formBuilder: FormBuilder,
                private router: Router,
        ){ }

    ngOnInit(){
        // localStorage.removeItem('currentUser');
        
    }

    checkLogin() {
        // alert('Success!! :-)\n\n' + JSON.stringify(this.user, null, 4));
        let resp = this.service.loginValidation(this.username, this.password); // should also take password
      
        resp.subscribe((res)=>{
            status = res;
          
        //   alert(status);
        if(status == 'true'){
            this.router.navigate(['']);
            
        }    
        else
            alert("LOGIN FAILED");
        });
    }
}