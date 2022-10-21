import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  host: { class: 'main'},
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
