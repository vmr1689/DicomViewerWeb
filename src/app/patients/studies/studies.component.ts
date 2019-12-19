import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/utilities';
import {Location} from '@angular/common';


@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  allStudies: any;
  inputParam: any;

  constructor(
    private patientsSvc: PatientsService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private _location: Location) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.inputParam = params['patientId'];
      if (this.inputParam) {
        this.spinnerService.show();
        this.patientsSvc.getStudies(this.inputParam).subscribe(data => {
          this.allStudies = data;
          console.log("Studies By Patient",this.allStudies);
        }).add(() => {
          this.spinnerService.hide();
        });
      } else {
        this.spinnerService.show();
        this.patientsSvc.getAllStudies().subscribe(data => {
          this.allStudies = data;
        }).add(() => {
          this.spinnerService.hide();
        });
      }
    });
  }

  backClicked() {
    this._location.back();
  }
}
