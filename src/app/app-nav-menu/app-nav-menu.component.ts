import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './app-nav-menu.component.html',
  styleUrls: ['./app-nav-menu.component.scss']
})
export class AppNavMenuComponent implements OnInit {
@Input() sideContainer: any;
  constructor() { }

  ngOnInit() {
  }

  menuClick() {
console.log(this.sideContainer);
  }

}
