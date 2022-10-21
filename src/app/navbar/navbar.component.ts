import { Component, OnInit } from '@angular/core';
import { faPlaneDeparture, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortAwesome/free-brands-svg-icons';

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

    constructor() { }

    ngOnInit(): void {
    }

}