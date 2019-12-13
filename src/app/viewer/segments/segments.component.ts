import { Component, OnInit } from '@angular/core';
import { SegmentsService } from 'src/app/shared/services/segments.service';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.css']
})
export class SegmentsComponent implements OnInit {

  constructor(private segmentsSVC : SegmentsService) { }

  ngOnInit() {
  }

}
