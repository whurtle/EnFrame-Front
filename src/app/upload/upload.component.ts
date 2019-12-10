import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Prediction } from '../prediction';
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

  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  

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
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }
  
  onSubmit() {
      const formData = new FormData();
      formData.append('file', this.fileData);
      console.log(this.fileData);
      //let resp = this.http.get<boolean>("https://enflame-backend.herokuapp.com/user/isAdmin", { params : {email : user}});
      this.http.post<string>('https://enflame-backend.herokuapp.com/photo/uploadPhoto', formData)
        .subscribe(res => {
          console.log(res);
          // this.uploadedFilePath = res.data.filePath;
          alert('SUCCESS !!');
        }) 
    }
}
