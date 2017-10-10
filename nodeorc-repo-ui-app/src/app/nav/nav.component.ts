import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  private _routeName: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this._routeName = 'dashboard';
  }
  ngOnInit() {
  }
  onNavPanelClick(routeName: string) {
    this._routeName = routeName;
  }
}
