import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddWorkerComponent } from './components/add-worker/add-worker.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ServiceComponent } from './components/service/service.component';
import { RequestComponent } from './components/request/request.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RequestMComponent } from './components/request-m/request-m.component';
import { RequestAppComponent } from './components/request-app/request-app.component';
import { RequestMDetailComponent } from './components/request-m-detail/request-m-detail.component';
import { OutputGraphComponent } from './charts/output-graph/output-graph.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WidgetPieComponent } from './widgets/widget-pie/widget-pie.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { AuthGuard } from './service/auth-guard/auth.guard';
import { ReverseAuthGuard } from './service/reverse-auth-guard/reverse-auth.guard';

const routes: Routes = [

  { path : 'main-nav', component : MainNavComponent , children : [
    { path: '', redirectTo: 'listService', pathMatch: 'full' },
    { path : 'home', component:HomeComponent, canActivate: [AuthGuard] },
    { path : 'addWorker', component:AddWorkerComponent, canActivate: [AuthGuard] },
    { path : 'addService', component:AddServiceComponent, canActivate: [AuthGuard] },
    { path : 'listUser', component : ListUserComponent, canActivate: [AuthGuard] },
    { path : 'listService', component : ListServiceComponent, canActivate: [AuthGuard] },
    { path : 'invoice', component : InvoiceComponent, canActivate: [AuthGuard] },
    { path : 'service', component : ServiceComponent, canActivate: [AuthGuard] },
    { path : 'create-invoice', component : CreateInvoiceComponent, canActivate: [AuthGuard] },
    { path : 'output-graph', component : OutputGraphComponent, canActivate: [AuthGuard] },
    { path : 'request-app', component : RequestAppComponent, canActivate: [AuthGuard] },
    { path : 'request', component : RequestComponent, canActivate: [AuthGuard] },
    { path : 'request-m', component : RequestMComponent, canActivate: [AuthGuard] },
    { path : 'request-m-detail', component : RequestMDetailComponent, canActivate: [AuthGuard] },
    { path : 'request-details', component : RequestDetailsComponent, canActivate: [AuthGuard] },
    { path : 'profile', component : ProfileComponent, canActivate: [AuthGuard] },
    { path : 'widget-pie', component : WidgetPieComponent, canActivate: [AuthGuard] },
    { path : 'reviews', component : ReviewsComponent }
  ]},
  { path : 'login', component:LoginComponent, pathMatch: 'full', canActivate: [ReverseAuthGuard]},
  { path : 'sign-up', component:SignUpComponent, pathMatch: 'full', canActivate: [ReverseAuthGuard]},
  { path : '', redirectTo: 'main-nav', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
