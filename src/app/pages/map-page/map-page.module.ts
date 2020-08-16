import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPagePageRoutingModule } from './map-page-routing.module';

import { MapPagePage } from './map-page.page';

import { ComponentsModule } from './../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MapPagePage]
})
export class MapPagePageModule {}
