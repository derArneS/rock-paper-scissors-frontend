import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
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
            environment.baseUrl.concat('/authenticate'),
            {
                "username": username,
                "password": password
            }
        );
    }

    createUser(user: User) {
        return firstValueFrom<User>(
            this.http.post<User>(
                environment.baseUrl.concat('/user'),
                user
            ).pipe(retry(2))
        );
    }

    readUserByUsername(username: string) {
        return firstValueFrom<User>(
            this.http.get<User>(
                environment.baseUrl.concat('/user?username=').concat(username)
            )
        );
    }

    readCompleteUserByUsername(username: string) {
        const headerDict = {
            'auth-token': this.authentication!.accessToken
        }

        return firstValueFrom<User>(
            this.http.get<User>(
                environment.baseUrl.concat('/user?username=').concat(username),
                {
                    headers: new HttpHeaders(headerDict)
                }
            )
        );
    }

    readUserByEmail(email: string) {
        return firstValueFrom<User>(
            this.http.get<User>(
                environment.baseUrl.concat('/user?email=').concat(email)
            )
        );
    }

    private deleteUser() {
        const headerDict = {
            'Authorization': 'Bearer '.concat(this.authentication!.accessToken)
        }

        this.http.delete<User>(
            environment.baseUrl.concat('/user/').concat(this.username!),
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

    logoutAndDeleteUser() {
        this.deleteUser();

        this.authentication = null;
        this.username = null;
        this.broadcastJwtChange('');
    }

}
