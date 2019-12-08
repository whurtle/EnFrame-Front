import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Prediction } from '../prediction';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  imageSrc: string;
  @ViewChild('img', {static: false}) imageEl: ElementRef;

  predictions: Prediction[];

  model: any;
  loading: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  async ngOnInit() {
    // this.loading = true; 
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Successfully loaded model');
    this.loading = false;
  }
  async fileChangeEvent(event) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (res: any) => {
        this.imageSrc = res.target.result;

        for (let i = 0; i < 2; i++) {
          setTimeout(async () => {
            const imgEl = this.imageEl.nativeElement;
            this.predictions = await this.model.classify(imgEl);
          }, 0);
        }
      };
    }
    this.uploadFile();
  }
  uploadFile() {
    let user = sessionStorage.getItem('username');
    let strings : string[] = [];
    for(let i = 0; i < 3; i++){
      strings.push(this.predictions[i].className);
    }
    let reference;
    this.http.get<String>("https://enflame-backend.herokuapp.com/photo/uploadPhotoAlt", { params : {userWhoUploaded : user, tags : strings}}).subscribe(
      data =>{
        reference = data;
      }
    );
    const bucket = new S3(
          {
              accessKeyId: 'AKIAJZXSN226UE22E4IA',
              secretAccessKey: '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',
              region: 'US_WEST_1'
          }
      );
      const params = {
          Bucket: 'test-bucket438',
          Key: reference,
          Body: this.imageSrc
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });
//for upload progress   
/*bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });*/
}

}
