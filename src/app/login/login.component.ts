import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Authentication } from '../model/authentication';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Input() setJwt!: Function;

    username = new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(3)
        ]
    });

    password = new FormControl('', {
        validators: [
            Validators.minLength(3)
        ]
    });

    loginForm = this.formBuilder.group({
        username: this.username,
        password: this.password
    });

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {

    }

    onSubmit(): void {
        console.debug('Your login has been submitted', this.loginForm.value);
        this.userService.authenticate(this.loginForm.value.username!, this.loginForm.value.password!).subscribe((data: Authentication) => {
            this.userService.setAuth(data);
            this.userService.broadcastJwtChange(data.accessToken);
            this.userService.username = this.loginForm.value.username!;
            this.setJwt(data.accessToken);
            console.debug('this is the object', this.userService.getAuth())
        })
            
    }

}

