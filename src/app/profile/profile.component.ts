import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    faTrash = faTrashCan;

    user: User = {
        username: '',
        email: '',
        password: '',
        rock: 0,
        paper: 0,
        scissors: 0,
        computerRock: 0,
        computerPaper: 0,
        computerScissors: 0,
    };

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        let jwt = this.userService.getAuth()?.accessToken;

        if (!jwt) {
            this.router.navigateByUrl('/home')
        }

        this.readUser();
    }

    async readUser() {
        this.user = await this.userService.readCompleteUserByUsername(this.userService?.username!);
        // this.user = await this.userService.readUserByUsername('Arne');
    }

    delete() {
        console.log('click')
        this.userService.logout();
        this.router.navigateByUrl('/home')
    }
}
