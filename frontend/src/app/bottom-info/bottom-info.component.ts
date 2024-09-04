import { Component, OnInit } from '@angular/core';
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-bottom-info',
  templateUrl: './bottom-info.component.html',
  standalone: true,
  imports: [
    TooltipModule
  ],
  styleUrls: ['./bottom-info.component.scss']
})
export class BottomInfoComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  appVersion: string = '1.0.0';

  constructor() {}

  ngOnInit(): void {}
}
