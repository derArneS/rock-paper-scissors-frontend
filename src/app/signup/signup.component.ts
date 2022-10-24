import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { emailAlreadyExistsValidator } from '../validators/emailvalidator';
import { usernameAlreadyExistsValidator } from '../validators/usernamevalidator';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Authentication } from '../model/authentication';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    username = new FormControl('', {
        validators: [
            Validators.required,
            Validators.minLength(3)
        ],
        asyncValidators: [
            usernameAlreadyExistsValidator(this.userService)
        ]
    });

    email = new FormControl('', {
        validators: [
            Validators.required
        ],
        asyncValidators: [
            emailAlreadyExistsValidator(this.userService)
        ]
    });

    password = new FormControl('', {
        validators: [
            Validators.minLength(3)
        ]
    });

    createUserForm = this.formBuilder.group({
        username: this.username,
        email: this.email,
        password: this.password
    });

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    async onSubmit() {
        let user: User = {
            username: this.createUserForm.value.username!,
            email: this.createUserForm.value.email!,
            password: this.createUserForm.value.password!
        }

        let createdUser = await this.userService.createUser(user);
        console.debug('user created', createdUser);

        this.userService.authenticate(createdUser.username, user.password).subscribe(
            (data: Authentication) => {
                this.userService.setAuth(data);
                this.userService.broadcastJwtChange(data.accessToken);
                this.userService.username = createdUser.username;
                console.debug('user authenticated', this.userService.getAuth())
                this.router.navigateByUrl('/home');
            }
        );
    }
}
