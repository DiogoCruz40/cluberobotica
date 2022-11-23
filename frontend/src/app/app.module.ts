import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APIClientService } from './services/apiclient.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClubeRoboticaAdminModule } from './modules/clube-robotica-admin/clube-robotica-admin.module';
import { ClubeRoboticaModule } from './modules/clube-robotica/clube-robotica.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClubeRoboticaAdminModule,
    ClubeRoboticaModule,
  ],
  providers: [APIClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
