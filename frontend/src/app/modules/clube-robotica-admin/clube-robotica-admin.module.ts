import { CommonModule,registerLocaleData } from '@angular/common';
import { NgModule,LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegisterComponent } from './components/register/register.component';
import { ClubeRoboticaRoutingAdminModule } from './clube-robotica-admin-routing.module';
import { ClubeRoboticaAdminComponent } from './clube-robotica-admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { authInterceptorProviders } from './services/http-interceptor.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GestaoAdminsService } from './services/gestao-admins.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MenuModule} from 'primeng/menu';

import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import localePt from '@angular/common/locales/pt-PT';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CaptchaModule } from 'primeng/captcha';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecaptchaModule } from 'ng-recaptcha';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { CarouselModule } from 'primeng/carousel';
import { ClubeRoboticaModule } from '../clube-robotica/clube-robotica.module';
// import { BrowserModule } from '@angular/platform-browser';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';
import { Impressao3dComponent } from './components/impressao3d/impressao3d.component';



registerLocaleData(localePt);
export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'D/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  }
};

@NgModule({
  declarations: [
    InicioComponent,
    RegisterComponent,
    LoginComponent,
    ClubeRoboticaAdminComponent,
    PerfilComponent,
    SidebarComponent,
    ManageAdminsComponent,
    Impressao3dComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ClubeRoboticaRoutingAdminModule,
    MatFormFieldModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    SelectButtonModule,
    MatInputModule,
    DialogModule,
    InputTextModule,
    MatMenuModule,
    MenuModule,
    ConfirmDialogModule,
    CaptchaModule,
    MatNativeDateModule,  
    CarouselModule,
    TimelineModule,
    CardModule,
    FileUploadModule,
    ToastModule,
    MatCheckboxModule,
    RecaptchaModule,
    ClubeRoboticaModule
  ],
  providers: [
    AuthGuardService,
    authInterceptorProviders,
    MessageService,
    GestaoAdminsService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ],
  exports: []
})
export class ClubeRoboticaAdminModule { }
