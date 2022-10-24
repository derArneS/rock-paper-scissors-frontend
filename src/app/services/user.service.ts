import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { Authentication } from '../model/authentication';
import { User } from '../model/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private authentication!: Authentication | null;

    
    jwt: Subject<string> = new Subject();
    username?: string | null;

    constructor(
        private http: HttpClient
    ) { }

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

    deleteUser() {
        const headerDict = {
            'Authorization': 'Bearer '.concat(this.authentication!.accessToken)
          }

        this.http.delete<User>(
            'http://localhost:8080/user/'.concat(this.username!),
            {
                headers: new HttpHeaders(headerDict)
            }
        ).subscribe();
    }

    getAuth() {
        return this.authentication;
    }

    setAuth(authentication: Authentication) {
        this.authentication = authentication
    }

    broadcastJwtChange(text: string) {
        this.jwt.next(text);
    }

    logout() {
        this.deleteUser();

        this.authentication = null;
        this.username = null;
        this.broadcastJwtChange('');
    }

}
