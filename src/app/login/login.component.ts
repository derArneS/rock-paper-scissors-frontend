import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Authentication } from '../model/authentication';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Input() setJwt!: Function;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {

    }

    loginForm = this.formBuilder.group({
        username: '',
        password: ''
    });

    onSubmit(): void {
        console.warn('Your login has been submitted', this.loginForm.value);
        this.userService.authenticate(this.loginForm.value.username!, this.loginForm.value.password!).subscribe((data: Authentication) => {
            this.userService.setAuth(data);
            this.setJwt(data.accessToken);
            console.warn('this is the object', this.userService.getAuth())
        })
            
    }

}

