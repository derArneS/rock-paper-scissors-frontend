import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ComputerResponse } from '../model/computerresponse';
import { GameResult } from '../model/gameresult';
import { ShapeOverview } from '../model/shapeoverview';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private computerResponse!: ComputerResponse;

    constructor(
        private http: HttpClient
    ) { }

    getShapes() {
        return firstValueFrom<ShapeOverview>(
            this.http.get<ShapeOverview>(
                'http://localhost:8080/shapes'
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
        return firstValueFrom<GameResult>(
            this.http.get<GameResult>(
                url
            )
        );
    }
}
