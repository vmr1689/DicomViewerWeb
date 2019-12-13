import { Component, OnInit } from '@angular/core';
import { SegmentsService } from 'src/app/shared/services/segments.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/utilities';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css']
})
export class SegmentsComponent implements OnInit {
  imageSegment = {};
  selectedSegmentId = '';
  selectedSegmentImg: any;
  segmentsTotlaCount = 0;
  inputParam: any;

  constructor(
    private segmentsSVC: SegmentsService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.inputParam = params['instanceId'];
      if (this.inputParam) {
        this.spinnerService.show();
        this.segmentsSVC.getSegmentedFiles(this.inputParam).subscribe(data => {
          this.selectedSegmentImg = data.segments.length > 0 ? 1 : 0;
          this.segmentsTotlaCount = data.segments.length;
          this.imageSegment = data;
        }).add(() => {
          this.spinnerService.hide();
        });
      }
    });
  }

}
