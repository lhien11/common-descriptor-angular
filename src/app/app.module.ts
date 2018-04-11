import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatToolbarModule } from '@angular/material';

import { JsonSchemaFormModule, MaterialDesignFrameworkModule } from 'angular2-json-schema-form';

import { AppComponent } from './app.component';
import { DescriptorsComponent } from './descriptors/descriptors.component';


import { DataService } from './data.service';


@NgModule({
  declarations: [ AppComponent, DescriptorsComponent ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatCardModule, 
    HttpClientModule,
    MatToolbarModule,
    MaterialDesignFrameworkModule, JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule)
  ],
  providers: [DataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
