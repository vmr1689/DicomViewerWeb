import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as dicomParser from 'dicom-parser';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';

import { PatientsService, EmailService } from 'src/app/shared/services';
import { SpinnerService } from 'src/app/shared/utilities';

import { ImageStudy, FirstInstanceModel } from '../../shared/models';
import { NgForm } from '@angular/forms';
import { NotesService } from 'src/app/shared/services/notes.service';
import {Location} from '@angular/common';
declare var $: any;
declare var cornerstoneWADOImageLoader: any;

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  activeBtn : any;
  studyId: any;
  seriesId: any;
  imageStudy = {};
  selectedinstanceId = '';
  selectedInstanceModel = {};
  selectedInstanceImg: any;
  instancesTotlaCount: any;
  listDicomTags: any[];
  dicomTags: object;
  currentURL = '';
  notesList: any;
  state: string = 'default';
  subjecttext : string;
  messagetext = "Request you to comment on the study images";
  @ViewChild('fullScreen', { static: false }) divRef;
  constructor(
    private patientsSvc: PatientsService,
    private emailSvc: EmailService,
    private notesSvc: NotesService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private _location: Location) {
    this.currentURL = window.location.href;
    console.log("Current URL", this.currentURL);
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    //cornerstoneWebImageLoader.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
      beforeSend: function (xhr) {
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
      //this.studyId = params['studyId'];
      this.seriesId = params['seriesId'];
      if (this.seriesId) {
        this.spinnerService.show();
        this.patientsSvc.GetImageStudyByStudyId(this.seriesId).subscribe((data: ImageStudy) => {
          this.imageStudy = data;
          this.subjecttext = "Radiology Second opinion - " + this.imageStudy['patientName'];
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

  renderImage(instanceId: any, selectedInstanceImg: any, instancesCount: any) {
    debugger;
    cornerstone.reset(document.getElementById('dicomImage'));

    this.selectedInstanceImg = selectedInstanceImg + 1;
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
      cornerstone.loadImage(aa).then(function (image) {
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
    const diacomImageElement = document.getElementById('dicomImage');
    if (tool === 'bright') {
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    }
    if (tool === 'zoom') {
      cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    }
    if (tool === 'pan') {
      cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
      //this.onClick('pan');
    }
    if (tool === 'angle') {
      cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
    }
    if (tool === 'rectangleRoi') {
      cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 });
    }
    if (tool === 'invert') {
      // const diacomImageElement = document.getElementById('dicomImage');
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

  viewDicomTags() {
    debugger;
    console.log("Instance", this.selectedinstanceId);
    this.spinnerService.show();
    this.patientsSvc.GetDicomTagsById(this.selectedinstanceId).subscribe((data: any) => {
      console.log("Dicom Tags", data);
      //   let dicomTags = Object.keys(data);
      //   let goodResponse = [];
      //   for (let prop of dicomTags) { 
      //     goodResponse.push(dicomTags[prop]);
      // }
      this.dicomTags = data;
    }).add(() => {
      this.spinnerService.hide();
    });
  }

  sendEmail(form: NgForm) {
    debugger;
    this.spinnerService.show();
    let emailModel = {
      ToAddress: form.value.email,
      Subject: form.value.subject,
      BodyMessage: form.value.message + '<br/>' + this.currentURL
    };

    this.emailSvc.sendEmail(emailModel).subscribe((response: any) => {
      if (response) {
        $("#emailModal").modal('hide');
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    });
  }

  addNotes(form: NgForm) {
    debugger;
    this.spinnerService.show();
    //this.getNotesByInstanceId();
    let notesModel = {
      InstanceId: this.selectedinstanceId,
      NotesSummary: form.value.notes
    };

    this.notesSvc.addNotes(notesModel).subscribe((response: any) => {
      if (response) {
        this.getNotesByInstanceId();
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.hide();
      }
    });
  }

  getNotesByInstanceId() {
    debugger;
    this.notesSvc.getNotesByInstanceId(this.selectedinstanceId).subscribe((response: any) => {
      this.notesList = response;
      console.log("Notes List", this.notesList);
      this.spinnerService.hide();
    });
  }

  viewAddNotes() {
    this.spinnerService.show();
    $("#notesModal").modal('show');
    this.getNotesByInstanceId();
  }

  deleteNotes(notesId: any) {
    var result = confirm("Are you sure to delete this notes?");
    if (result) {
      this.spinnerService.show();
      this.notesSvc.deleteNotesByNoteId(notesId).subscribe((response: any) => {
        this.getNotesByInstanceId();
      });
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

  backClicked() {
    this._location.back();
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


