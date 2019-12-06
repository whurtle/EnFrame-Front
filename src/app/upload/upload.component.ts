import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Prediction } from '../prediction';

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

  constructor() { }

  async ngOnInit() {
    //this.loading = true; 
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Successfully loaded model');
    this.loading = false;
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
  
    
    }

}
