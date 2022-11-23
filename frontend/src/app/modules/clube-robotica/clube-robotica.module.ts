import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LandingPageComponent } from './components/landing-page/landingpage.component';
import { ClubeRoboticaRoutingModule } from './clube-robotica-routing.module';
import { ClubeRoboticaComponent } from './clube-robotica.component';
import { CarouselModule } from 'primeng/carousel';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PoliticaPrivacidadeAsModalComponent } from './components/politica-privacidade/politica-privacidade-as-modal/politica-privacidade-as-modal.component';
import { ToastModule } from 'primeng/toast';


import { CaptchaModule } from 'primeng/captcha';
import { RecaptchaModule } from 'ng-recaptcha';

import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from './components/layout/footer/footer.component';
import { Pedidoimpressao3dModalComponent } from './components/pedidoimpressao3d-modal/pedidoimpressao3d-modal.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LandingPageComponent,
    ClubeRoboticaComponent,
    FooterComponent,
    PoliticaPrivacidadeAsModalComponent,
    Pedidoimpressao3dModalComponent

  ],
  imports: [
    ClubeRoboticaRoutingModule,
    CommonModule,
    CarouselModule,
    TimelineModule,
    CardModule,
    FileUploadModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    CaptchaModule,
    RecaptchaModule,
    DialogModule,
    DropdownModule
  ],
  providers: [],
  exports: [Pedidoimpressao3dModalComponent]
})
export class ClubeRoboticaModule { }
