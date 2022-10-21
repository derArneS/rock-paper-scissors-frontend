import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-start-playing',
    templateUrl: './start-playing.component.html',
    styleUrls: ['./start-playing.component.css']
})
export class StartPlayingComponent implements OnInit {

    faPlay = faPlay;

    constructor() { }

    ngOnInit(): void {
    }

}
