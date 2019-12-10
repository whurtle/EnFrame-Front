import { Component, OnInit, ViewChild, ElementRef, SystemJsNgModuleLoader } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Prediction } from '../prediction';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service'
import { hostViewClassName } from '@angular/compiler';
import { Router } from '@angular/router';

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
              private router: Router,
              private localStorageService: LocalStorageService) { }
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  
  curRef: string = null;

  async ngOnInit() {
    // this.loading = true; 
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Successfully loaded model');
    this.loading = false;
  }

  getUsername(){
    sessionStorage.getItem('username');
  }


  async fileChangeEvent(event) {
    this.fileProgress(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
    }

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
      let tagList = [];
      for(let i = 0; i < 3; i++){
        tagList.push(this.predictions[i].className);
      }
      //let resp = this.http.get<boolean>("https://enflame-backend.herokuapp.com/user/isAdmin", { params : {email : user}});
      this.http.post<Object>('https://enflame-backend.herokuapp.com/photo/uploadPhoto', formData)
        .subscribe(res => {
          console.log(res);
          console.log(tagList);
          let user = sessionStorage.getItem('username');
          console.log(user);
          this.curRef = res['response'];
          console.log(this.curRef)
          
          this.http.post('https://enflame-backend.herokuapp.com/photo/uploadMetadata', {params : {reference : this.curRef, tags : tagList, userWhoUploaded : user}})
          // .subscribe(res => {
          //   console.log(res);
          // });
          
          alert('SUCCESS !!');
        });
      // setTimeout(() => 
      //   {
          
      //   },
      //   5000);
    }
}

