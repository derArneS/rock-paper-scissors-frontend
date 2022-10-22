import { Component, OnInit } from '@angular/core';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-regular-svg-icons';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, map, take, timer } from 'rxjs';
import { ComputerResponse } from '../model/computerresponse';
import { GameResult } from '../model/gameresult';
import { ShapeOverview } from '../model/shapeoverview';
import { GameService } from '../services/game.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

    faRock = faHandBackFist;
    faPaper = faHand;
    faScissors = faHandScissors;

    private shapes: Map<string, string> = new Map<string, string>();
    private computerUrl!: string;
    private playing = false;

    message!: string;
    growing = false;

    constructor(
        private gameService: GameService
    ) { }

    async ngOnInit(): Promise<void> {
        this.message = 'Select your shape to play the game!';

        let shapeOverview = await this.gameService.getShapes();
        shapeOverview?._embedded.resourceList.forEach(shape => {
            this.shapes.set(shape.name.toLowerCase(), shape.resource);
        });
        
        this.computerUrl = shapeOverview?._embedded.resourceList[0]._links.computer.href;
    }

    async playRock() {
        this.play(this.shapes.get('rock') || '');
    }

    async playPaper() {
        this.play(this.shapes.get('paper') || '');
    }

    async playScissors() {
        this.play(this.shapes.get('scissors') || '');
    }

    private async play(user: string) {
        if(this.playing) {
            return;
        } 

        this.playing = true;

        let computer = await this.gameService.getComputerPlayer(this.computerUrl);
        console.log('computer shape', computer.shape);
        let result = await this.gameService.play(computer._links.play.href.replace('%1', user));

        this.growing = true;
        this.message = '3';
        await firstValueFrom(timer(1000).pipe(take(1)));

        this.message = '2';
        await firstValueFrom(timer(1000).pipe(take(1)));

        this.message = '1';
        await firstValueFrom(timer(1000).pipe(take(1)));

        this.growing = false;

        
        switch(result.result) {
            case 'DRAW': {
                this.message = 'It\'s a draw.'; 
                break;
            }
            case 'PLAYER_ONE': {
                this.message = 'YOU WIN!!!';
                break;
            }
            case 'PLAYER_TWO': {
                this.message = 'Sorry, this time you lose.'
                break;
            }
        }

        this.playing = false;
    }

}
