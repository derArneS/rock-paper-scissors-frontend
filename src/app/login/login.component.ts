import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, EMPTY, throwError } from 'rxjs';
import { Authentication } from '../model/authentication';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // function from the home component
    @Input() setJwt!: Function;

    usernameError = false;
    passwordError = false;

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
        this.usernameError = false;
        this.passwordError = false;
        console.debug('Your login has been submitted', this.loginForm.value.username);
        this.userService.authenticate(this.loginForm.value.username!, this.loginForm.value.password!)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.debug('error in authentication happend', error);
                    
                    // 401 means username not found
                    if(error.status == 401) {
                        this.usernameError = true;
                        return EMPTY;
                    }

                    // 403 means wrong password
                    if(error.status == 403) {
                        this.passwordError = true;
                        return EMPTY;
                    }
                
                    return throwError(() => new Error('ups something happened'));
                })
            ).subscribe((data: Authentication) => {
                this.usernameError = false;
                this.passwordError = false;
                this.userService.setAuth(data);
                this.userService.broadcastJwtChange(data.accessToken);
                this.userService.username = this.loginForm.value.username!;
                this.setJwt(data.accessToken);
                console.debug('this is the object', this.userService.getAuth())
            })

    }

}

