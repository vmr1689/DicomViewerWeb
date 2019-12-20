import { Component, OnInit, ViewChild } from '@angular/core';
import { SegmentsService } from 'src/app/shared/services/segments.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/utilities';

import Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
declare var $: any;
declare var cornerstoneWADOImageLoader: any;

@Component({
  selector: 'app-kmsegments',
  templateUrl: './kmsegments.component.html',
  styleUrls: ['./kmsegments.component.css']
})
export class KmsegmentsComponent implements OnInit {
  activeBtn : any;
  imageSegment = {};
  selectedSegmentId = '';
  selectedSegmentImg: any;
  segmentsTotlaCount = 0;
  inputParam: any;
  inputSegmentVal: any;

  state: string = 'default';
  @ViewChild('fullScreen', { static: false }) divRef;
  selectedItem: any;

  constructor(
    private segmentsSVC: SegmentsService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService) {
      cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    //cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
      beforeSend: function (xhr) {
        // Add custom headers here (e.g. auth tokens)
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }
    });


    cornerstoneTools.init();
     }

  ngOnInit() {
    debugger;
    this.spinnerService.show();
    $('body').layout('fix');
    const trees: any = $('[data-widget="tree"]');
    trees.tree();
    $('body').addClass('hold-transition');

    this.route.queryParams.subscribe(params => {
      this.inputParam = params['instanceId'];
      this.inputSegmentVal = params['segmentsVal'];
      let inputModel = {
        InstanceId: this.inputParam,
        Segment: this.inputSegmentVal,
        IsThreshold : false,
        IsKMeans:true,
        IsRegionGrowth:false
      }
      if (this.inputParam) {
        this.segmentsSVC.segmentFiles(inputModel).subscribe(segmentResp => {
          debugger;
          if (segmentResp) {
            this.segmentsSVC.getKMSegmentedFiles(this.inputParam).subscribe(data => {
              this.selectedSegmentImg = data.segments.length > 0 ? 1 : 0;
              this.segmentsTotlaCount = data.segments.length;
              this.imageSegment = data;
              console.log("Segmented Images",this.imageSegment);
              setTimeout(() => {
                this.initDiacomToolsForImages();
              }, 2000);
            }).add(() => {
              this.spinnerService.hide();
            });
          }
        });

      }
    });
  }

  public initDiacomToolsForImages() {
    const that = this;
    let itemsProcessed = 0;

    const imageId = 'dicomImage';
    const diacomImageElement = document.getElementById(imageId);
    cornerstone.enable(diacomImageElement);
    const PanTool = cornerstoneTools.PanTool;

    cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
    cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
    cornerstoneTools.addTool(cornerstoneTools.PanTool);
    cornerstoneTools.addTool(cornerstoneTools.AngleTool);
    cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
    cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);
    const configuration = {
      markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
      current: 'F5',
      ascending: true,
      loop: true,
    }
    cornerstoneTools.addTool(cornerstoneTools.TextMarkerTool, { configuration });
    itemsProcessed++;
    this.selectedItem = this.imageSegment['segments'][0].name;

    that.loadSegmentedImages(this.imageSegment['segments'][0].url);

  }

  renderImage(segmentImageURL : any,imgName:any) {
    debugger;
    //cornerstone.reset(document.getElementById('dicomImage'));
    this.selectedItem = imgName;
    this.spinnerService.show();
    
      this.loadSegmentedImages(segmentImageURL);
    
  }

  public loadSegmentedImages(segmentImageURL: any) {
    const that = this;
    const imageId = 'dicomImage';
    const diacomImageElement = document.getElementById(imageId);


    cornerstone.resize(diacomImageElement, true);
    // this.patientsSvc.GetInstancePreviewById(this.selectedinstanceId).subscribe((data: any) => {
      const aa = segmentImageURL;
      cornerstone.loadImage(aa).then(function (image) {
        cornerstone.displayImage(diacomImageElement, image);
        that.spinnerService.hide();
      });
    // }).add(() => {
    //   this.spinnerService.hide();
    // });
  }

  public enableTools(tool: string, imageName: string, ) {
    debugger;
    const diacomImageElement = document.getElementById('dicomImage');
    if (tool === 'bright') {
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    }
    if (tool === 'zoom') {
      cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    }
    if (tool === 'pan') {
      cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    }
    if (tool === 'angle') {
      cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
    }
    if (tool === 'rectangleRoi') {
      cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 });
    }
    if (tool === 'invert') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.invert = !viewport.invert;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'elliptical') {
      const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
      cornerstoneTools.addTool(EllipticalRoiTool)
      cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 })
    }
    if (tool === 'bi-directional') {
      const BidirectionalTool = cornerstoneTools.BidirectionalTool;
      cornerstoneTools.addTool(BidirectionalTool)
      cornerstoneTools.setToolActive('Bidirectional', { mouseButtonMask: 1 })
    }
    if (tool === 'arrow-annotation') {
      const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
      cornerstoneTools.addTool(ArrowAnnotateTool)
      cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 })
    }
    if (tool === 'dragprobe') {
      const DragProbeTool = cornerstoneTools.DragProbeTool;
      cornerstoneTools.addTool(DragProbeTool)
      cornerstoneTools.setToolActive('DragProbe', { mouseButtonMask: 1 })
    }
    if (tool === 'probe') {
      const ProbeTool = cornerstoneTools.ProbeTool;
      cornerstoneTools.addTool(ProbeTool)
      cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 })
    }
    if (tool === 'length') {
      const LengthTool = cornerstoneTools.LengthTool;
      cornerstoneTools.addTool(LengthTool)
      cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 })
    }
    if (tool === 'cobb') {
      const CobbAngleTool = cornerstoneTools.CobbAngleTool;
      cornerstoneTools.addTool(CobbAngleTool)
      cornerstoneTools.setToolActive('CobbAngle', { mouseButtonMask: 1 })
    }
    if (tool === 'magnify') {
      cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
    }
    if (tool === 'text') {
      cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
    }
    if (tool === 'rotate') {
      const RotateTool = cornerstoneTools.RotateTool;
      cornerstoneTools.addTool(RotateTool)
      cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 })
    }
    if (tool === 'hFlip') {
      const viewport = cornerstone.getViewport(diacomImageElement);
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'vFlip') {
      const viewport = cornerstone.getViewport(diacomImageElement);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'reset') {
      cornerstone.reset(diacomImageElement);
    }
  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    const elem = this.divRef.nativeElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  btnActive(check){
    //    console.log(check);
        if(check=='pan'){
          this.activeBtn = 'pan';
        }else if(check=='zoom'){
          this.activeBtn = 'zoom';
        }
        else if(check=='annotate'){
          this.activeBtn = 'annotate';
        }  
        else if(check=='rotateDDL'){
          this.activeBtn = 'rotateDDL';
        }  
        else if(check=='magnify'){
          this.activeBtn = 'magnify';
        }  
        else if(check=='windowningDDL'){
          this.activeBtn = 'windowningDDL';
        }  
        else if(check=='dragprobe'){
          this.activeBtn = 'dragprobe';
        }  
        else if(check=='fullscreen'){
          this.activeBtn = 'fullscreen';
        }  
        else if(check=='reset'){
          this.activeBtn = 'reset';
        }  
      
    }
}
