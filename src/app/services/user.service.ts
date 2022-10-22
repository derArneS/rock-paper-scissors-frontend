import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private authentication!: Authentication;

    constructor(
        private http: HttpClient
    ) { }

    getAuth() {
        return this.authentication;
    }

    setAuth(authentication: Authentication) {
        this.authentication = authentication
    }

    authenticate(username: string, password: string) {
        return this.http.post<Authentication>(
            'http://localhost:8080/authenticate',
            {
                "username": username,
                "password": password
            }
        );
    }
}
