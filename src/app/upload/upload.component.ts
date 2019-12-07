import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Prediction } from '../prediction';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service'
import { hostViewClassName } from '@angular/compiler';
import { HTTPRequest } from '@tensorflow/tfjs-core/dist/io/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  imageSrc: File;
  @ViewChild('img', {static: false}) imageEl: ElementRef;

  //predictions: Prediction[];
  predictions: String[];
  model: any;
  loading: boolean;
  message: any;
  username = 'username';

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) { }

  async ngOnInit() {
    //this.loading = true; 
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Successfully loaded model');
    this.loading = false;
  }

  getUsername(){
    sessionStorage.getItem('username');
  }

async fileChangeEvent(event) {

  if(event.target.files && event.target.files[0]) {
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

      }
    }
    const uploadeImage = new FormData();
    uploadeImage.append('Myfile',this.imageSrc);
    this.http.post('http://localhost:8080/photo/uploadPhoto', uploadeImage,{
      // headers: undefined,
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event)
      });

  }
}
