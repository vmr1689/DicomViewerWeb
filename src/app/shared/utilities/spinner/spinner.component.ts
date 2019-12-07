import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SpinnerComponent implements OnInit {


  public template: any = `
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;


  public showSpinner: boolean;
  constructor(public spinnerService: SpinnerService) {
  }

  ngOnInit() {
    const that = this;
    this.spinnerService.loadingStatus$.subscribe((loading) => {
      that.showSpinner = loading;
    });
  }

}
