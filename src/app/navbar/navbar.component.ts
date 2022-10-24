import { Component, Input, OnInit } from '@angular/core';
import { faPlaneDeparture, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    faPlaneDeparture = faPlaneDeparture;
    faLinkedin = faLinkedin;
    faGithub = faGithub;
    faUser = faUser;

    jwt!: string;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.jwt.subscribe((val) => {
            this.jwt = val;
        });
    }




}