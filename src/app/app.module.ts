import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AuthguardService } from '../service/authguard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms'
import * as firebase from 'firebase';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {HttpClientModule} from '@angular/common/http'
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,

  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule,
  MatDialogRef,
} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AddWorkerComponent } from './components/add-worker/add-worker.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { RequestComponent } from './components/request/request.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ServiceComponent } from './components/service/service.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RequestMComponent } from './components/request-m/request-m.component';
import { RequestAppComponent } from './components/request-app/request-app.component';
import { RequestMDetailComponent } from './components/request-m-detail/request-m-detail.component';
import { OutputGraphComponent } from './charts/output-graph/output-graph.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { WidgetPieComponent } from './widgets/widget-pie/widget-pie.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { HomeComponent } from '../app/components/home/home.component';
const firebaseConfig = {
    apiKey: "AIzaSyB83CuKn-QSuzzxN6X8l2L5UKqfeb2NjvA",
    authDomain: "eletrical-engineer-cms.firebaseapp.com",
    databaseURL: "https://eletrical-engineer-cms.firebaseio.com",
    projectId: "eletrical-engineer-cms",
    storageBucket: "eletrical-engineer-cms.appspot.com",
    messagingSenderId: "931661674739",
    appId: "1:931661674739:web:65e43541f406b1822c1f86",
    measurementId: "G-99GQV7XQHK"
  };
  firebase.initializeApp(firebaseConfig);
  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
LoginComponent,
MainNavComponent,
AddWorkerComponent,
AddServiceComponent,
ListServiceComponent,
ListUserComponent,
RequestComponent,
InvoiceComponent,
ServiceComponent,
RequestDetailsComponent,
RequestMComponent,
RequestAppComponent,
RequestMDetailComponent,
OutputGraphComponent,
ProfileComponent,
WidgetPieComponent,
SignUpComponent,
ReviewsComponent,
CreateInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    // FormGroup,
    // FlexLayoutModule,
    HighchartsChartModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,

    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
    LayoutModule,
    NgbModule
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
