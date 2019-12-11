import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { SpinnerService } from '../../shared/utilities';
declare var $: any;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  loading = false;
  allPatients: any;

  constructor(
    private patientsSvc: PatientsService,
    private router: Router,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.patientsSvc.getAllPatients().subscribe(data => {
      this.allPatients = data;
    }).add(() => {
      this.spinnerService.hide();
    });
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  }

  patientsClick(id: any) {
    this.router.navigate(['/studies'], { queryParams: { id } });
  }
}


