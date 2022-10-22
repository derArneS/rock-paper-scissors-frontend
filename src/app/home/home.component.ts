import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    host: { class: 'main' },
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    jwt!: string;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.jwt = this.userService.getAuth()?.accessToken
    }

    get setJwtFunc() {
        return this.setJwt.bind(this);
    }

    setJwt(jwt: string) {
        this.jwt = jwt;
    }



}
