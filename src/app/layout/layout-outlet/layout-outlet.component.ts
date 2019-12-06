import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-layout-outlet',
  templateUrl: './layout-outlet.component.html',
  styleUrls: ['./layout-outlet.component.css']
})
export class LayoutOutletComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    $('body').layout('fix');
    const trees: any = $('[data-widget="tree"]');
    trees.tree();
    $('body').removeClass('login-page');
    $('body').addClass('hold-transition skin-midnight');
  }

  ngOnDestroy() {
    $('body').addClass('login-page');
    $('body').removeClass('hold-transition skin-midnight');
  }

  LogoutFunction() {
  }
}

