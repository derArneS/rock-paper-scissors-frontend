import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    host: { class: 'main' },
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    jwt!: String;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.jwt = this.userService.getAuth()?.accessToken
    }

    get setJwtFunc() {
        return this.setJwt.bind(this);
    }

    setJwt(jwt: String) {
        this.jwt = jwt;
    }



}
