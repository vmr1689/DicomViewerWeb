import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../shared/utilities';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  allSeries: any;
  inputParam: any;

  constructor(
    private patientsSvc: PatientsService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
debugger;
    this.route.queryParams.subscribe(params => {
      this.inputParam = params['studyId'];
      if (this.inputParam) {
        this.spinnerService.show();
        this.patientsSvc.getSeries(this.inputParam).subscribe(data => {
          this.allSeries = data;
        }).add(() => {
          this.spinnerService.hide();
        });
      } else {
        this.spinnerService.show();
        this.patientsSvc.getAllSeries().subscribe(data => {
          this.allSeries = data;
        }).add(() => {
          this.spinnerService.hide();
        });
      }
    });
  }

}
