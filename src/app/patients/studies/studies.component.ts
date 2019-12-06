import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  allStudies: any;
  inputParam:any;
  constructor(private patientsSvc: PatientsService,private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      debugger;
      this.inputParam = params['patientId'];
      console.log("Input Param", this.inputParam);
      if (this.inputParam) {
        this.patientsSvc.getStudies(this.inputParam).subscribe(data => {
          console.log("Studies Response", data);
          this.allStudies = data;
        });
      }
      else{
        this.patientsSvc.getAllStudies().subscribe(data => {
          console.log("All Studies Response", data);
          this.allStudies = data;
        });
        
      }
    });

    
  }

}
