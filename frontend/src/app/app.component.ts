import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayReleaseNotes: boolean = false;

  constructor() {}

  ngOnInit() {
    const hasSeenReleaseNotes = localStorage.getItem('hasSeenReleaseNotes');

    if (!hasSeenReleaseNotes || hasSeenReleaseNotes !== 'true') {
      this.displayReleaseNotes = true;
    }
  }


  closeReleaseNotes() {
    this.displayReleaseNotes = false;
    localStorage.setItem('hasSeenReleaseNotes', 'true');
  }
}
