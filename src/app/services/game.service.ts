import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComputerResponse } from '../model/computerresponse';
import { GameResult } from '../model/gameresult';
import { ShapeOverview } from '../model/shapeoverview';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    getShapes() {
        return firstValueFrom<ShapeOverview>(
            this.http.get<ShapeOverview>(
                environment.baseUrl.concat('/shapes')
            )
        );
    }

    getComputerPlayer(url: string) {
        return firstValueFrom<ComputerResponse>(
            this.http.get<ComputerResponse>(
                url
            )
        );

    }

    play(url: string) {
        let token: string | undefined = this.userService.getAuth()?.accessToken;

        // if the token is set, it should be send as a header, because then the statistics will be updated
        if (token) {
            console.debug('token is true', token);
            const headerDict = {
                'auth-token': token
            }

            return firstValueFrom<GameResult>(
                this.http.get<GameResult>(
                    url,
                    {
                        headers: new HttpHeaders(headerDict)
                    }
                )
            );
        } else {
            console.debug('token is false', token);
            return firstValueFrom<GameResult>(
                this.http.get<GameResult>(
                    url
                )
            );
        }
    }
}
