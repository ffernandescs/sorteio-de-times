import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './shared/components/form/form.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SelectComponent } from './shared/components/select/select.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { ConfigAppComponent } from './shared/components/config-app/config-app.component';
import { PartidaComponent } from './shared/components/partida/partida.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SelectComponent,
    ButtonComponent,
    ConfigAppComponent,
    PartidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
