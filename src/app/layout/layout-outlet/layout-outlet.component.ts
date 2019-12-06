import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-layout-outlet',
  templateUrl: './layout-outlet.component.html',
  styleUrls: ['./layout-outlet.component.css']
})
export class LayoutOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    debugger;
    $('body').layout('fix');
    const trees: any = $('[data-widget="tree"]');
    trees.tree();
    $('body').removeClass('login-page');
  }

  LogoutFunction() {
  }
}

