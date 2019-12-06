import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  loading = false;
  allPatients: any;

  constructor(private patientsSvc: PatientsService,private router: Router,) { }

  ngOnInit() {
      this.patientsSvc.getAllPatients().subscribe(data => {
          console.log("All Patients Response", data);
          this.allPatients = data;
        });
  }

  patientsClick(id:any){
      debugger;

      this.router.navigate(['/studies'], { queryParams: { id: id } });
  }

}
