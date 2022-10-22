import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, firstValueFrom, Observable, Subject, throwError } from 'rxjs';
import { Authentication } from '../model/authentication';
import { User } from '../model/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private authentication!: Authentication;

    jwt: Subject<string> = new Subject();

    constructor(
        private http: HttpClient
    ) { }

    broadcastJwtChange(text: string) {
        this.jwt.next(text);
    }

    getAuth() {
        return this.authentication;
    }

    setAuth(authentication: Authentication) {
        this.authentication = authentication
    }

    authenticate(username: string, password: string) {
        console.debug('username', username);
        return this.http.post<Authentication>(
            'http://localhost:8080/authenticate',
            {
                "username": username,
                "password": password
            }
        );
    }

    createUser(user: User) {
        return firstValueFrom<User>(
            this.http.post<User>(
                'http://localhost:8080/user',
                user
            )
        );
    }

    readUserByUsername(username: string) {
        return firstValueFrom<User>(
            this.http.get<User>(
                'http://localhost:8080/user?username='.concat(username)
            )
        );
    }

    readUserByEmail(email: string) {
        return firstValueFrom<User>(
            this.http.get<User>(
                'http://localhost:8080/user?email='.concat(email)
            )
        );
    }
}
