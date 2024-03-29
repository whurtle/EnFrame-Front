import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MustMatchDirective } from './_helpers/must-match.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatPaginator } from '@angular/material';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatInputModule } from '@angular/material/input';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage.service';
import { UploadComponent } from './upload/upload.component';
import { AdminComponent } from './admin/admin.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    CreateAccountComponent,
    NavComponent,
    MustMatchDirective,
    UploadComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgMatSearchBarModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    StorageServiceModule,
    MatGridListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
   


  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
