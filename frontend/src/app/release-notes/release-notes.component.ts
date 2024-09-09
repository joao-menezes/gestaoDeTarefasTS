import { Component } from '@angular/core';
import {BottomInfoComponent} from "../bottom-info/bottom-info.component";

@Component({
  selector: 'app-release-notes',
  standalone: true,
  imports: [
    BottomInfoComponent
  ],
  templateUrl: './release-notes.component.html',
  styleUrl: './release-notes.component.scss'
})
export class ReleaseNotesComponent {

}
