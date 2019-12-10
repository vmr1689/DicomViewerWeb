import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';

import { PatientsService } from 'src/app/shared/services';
import { SpinnerService } from 'src/app/shared/utilities';

import { ImageStudy, FirstInstanceModel } from '../../shared/models';

declare var $: any;
declare var cornerstoneWADOImageLoader: any;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  studyId: any;
  seriesId: any;
  imageStudy = {};
  selectedinstanceId = '';
  selectedInstanceModel = {};
  selectedInstanceImg: any;
  instancesTotlaCount: any;

  constructor(
    private patientsSvc: PatientsService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService) {

    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    //cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
      beforeSend: function(xhr) {
          // Add custom headers here (e.g. auth tokens)
          xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }
  });


    cornerstoneTools.init();

  }

  ngOnInit() {

    $('body').layout('fix');
    const trees: any = $('[data-widget="tree"]');
    trees.tree();
    $('body').addClass('hold-transition');

    this.route.queryParams.subscribe(params => {
      this.studyId = params['studyId'];
      this.seriesId = params['seriesId'];
      if (this.studyId) {
        this.spinnerService.show();
        this.patientsSvc.GetImageStudyByStudyId(this.studyId).subscribe((data: ImageStudy) => {
          this.imageStudy = data;
          this.selectedInstanceImg = data.series[0].instancesCount > 0 ? 1 : 0;
          this.instancesTotlaCount = data.series[0].instancesCount;
          this.selectedinstanceId = data.series[0].firstInstanceId;
          this.selectedInstanceModel = data.series[0].firstInstanceModel;
          setTimeout(() => {
            this.initDiacomToolsForImages();
          }, 2000);

        }).add(() => {
          this.spinnerService.hide();
        });
      }
    });
  }

  renderImage(instanceId: any,selectedInstanceImg:any,instancesCount:any) {
    debugger;
    cornerstone.reset(document.getElementById('dicomImage'));

    this.selectedInstanceImg = selectedInstanceImg+1;
    this.instancesTotlaCount = instancesCount;
    this.selectedinstanceId = instanceId;
    this.spinnerService.show();
    this.patientsSvc.GetInstanceById(this.selectedinstanceId).subscribe((data: any) => {
      this.selectedInstanceModel = data;
      this.loadDiacomImages(this.selectedInstanceModel);
    }).add(() => {
      this.spinnerService.hide();
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
    that.loadDiacomImages(this.selectedInstanceModel);

  }

  public loadDiacomImages(imageModel: any) {
    const that = this;
    const imageId = 'dicomImage';
    const diacomImageElement = document.getElementById(imageId);


    cornerstone.resize(diacomImageElement, true);
    //diacomImageElement.style.width = '1720px';
    //diacomImageElement.style.height = '350px';
    //diacomImageElement.style.marginLeft = '500px';

    this.patientsSvc.GetInstancePreviewById(this.selectedinstanceId).subscribe((data: any) => {
      const aa = 'wadouri:' + data.path;
      cornerstone.loadImage(aa).then(function(image) {
        cornerstone.displayImage(diacomImageElement, image);
      });
    }).add(() => {
      this.spinnerService.hide();
    });
  }

  public enableTools(tool: string, imageName: string, ) {
    debugger;
    // cornerstoneTools.setToolDisabled('Wwwc');
    // cornerstoneTools.setToolDisabled('Zoom');
    // cornerstoneTools.setToolDisabled('Pan');
    // cornerstoneTools.setToolDisabled('Angle');
    // cornerstoneTools.setToolDisabled('RectangleRoi');

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
      const imageId = 'dicomImage_' + imageName;
      const diacomImageElement = document.getElementById(imageId);

      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.invert = !viewport.invert;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'magnify') {
      cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
    }
    if (tool === 'text') {
      cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
    }
  }

  viewDicomTags(){
    debugger;
    console.log("Instance",this.selectedinstanceId);
  }
  
}


